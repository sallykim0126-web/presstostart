(() => {
  let parentSounds;
  try {
    if (window.parent !== window) parentSounds = window.parent.projectSounds;
  } catch {
    // A cross-origin host cannot share its audio player.
  }
  const sounds = parentSounds || createPlayer();
  window.projectSounds = sounds;

  window.addEventListener('pointerdown', unlock, true);
  window.addEventListener('pointerup', unlock, true);
  window.addEventListener('keydown', unlock, true);
  window.addEventListener('click', event => {
    if (!event.isTrusted || document.body?.hasAttribute('data-mute-clicks')) return;
    sounds.unlock();
    const target = event.target.closest?.('[data-click-sound]');
    const effect = target?.dataset.clickSound ?? 'click';
    if (effect !== 'none') sounds.play(effect);
  }, true);

  function unlock(event) {
    if (!event.isTrusted) return;
    sounds.unlock();

    // Warm only the sound that is most likely to be needed next. Previously
    // every effect was fetched and decoded during the initial page load.
    if (event.type === 'pointerdown') sounds.preload('click');
    if (event.type === 'keydown') sounds.preload('accessKey');
  }

  function createPlayer() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audio = AudioContext ? new AudioContext() : null;
    const scriptURL = new URL(document.currentScript.src);
    const assetBase = new URL('.', scriptURL);
    const assetRevision = scriptURL.search;
    const effects = {
      click: { file: 'presto-mouse-click.m4a', volume: 0.45 },
      leftMouse: { file: 'presto-left-mouse.m4a', volume: 0.45 },
      rightMouse: { file: 'presto-right-mouse.m4a', volume: 0.45 },
      blink: { file: 'presto-blink-whoosh-2s.m4a', volume: 0.45, delay: 0.22, offset: 0.2 },
      dice: { file: 'presto-dice.m4a', volume: 0.65, offset: 0.095 },
      accessKey: { file: 'presto-access-key.m4a', volume: 0.55, offset: 0.045, duration: 0.21 },
      gritTyping: { file: 'presto-grit-typing.m4a', volume: 0.8, offset: 0.25, loop: true },
      cardScan: { file: 'presto-card-beep.m4a', volume: 0.55, offset: 0.36 },
      clock: { file: 'presto-clock-ticking.m4a', volume: 0.28, offset: 0.05, duration: 4, playbackRate: 0.8 },
      crayon: { file: 'presto-crayon.mp3', volume: 0.68, loop: true },
      folderDrop: { file: 'presto-folder-drop.mp3', volume: 0.75, offset: 0.525 },
      systemError: { file: 'universfield-error-notification-04-199275.m4a', volume: 0.6 },
      folder: { file: 'presto-folder-flap.m4a', volume: 0.65, duration: 1.5 },
      polaroidPeel: { file: 'freesound_community-masking_tape_2-44104.m4a', volume: 0.8, offset: 0.32, duration: 0.8 },
      tryHarderBoom: { file: 'universfield-cinematic-impact-boom-04-326123.m4a', volume: 0.58, offset: 0.08 },
      notesScroll: { file: 'lenspulse-foley-paper-handling-amp-page-turning-sfx-584919.m4a', volume: 0.75, duration: 0.5 },
      tryHarderImpact: { file: 'universfield-cinematic-impact-hit-352702.m4a', volume: 0.55, offset: 0.09 },
      tryHarderRow: { file: 'universfield-system-notification-02-352442.m4a', volume: 0.48, offset: 0.045 }
    };

    function loadEffect(name) {
      const effect = effects[name];
      if (!audio || !effect) return Promise.resolve(null);
      if (!effect.buffer) {
        const url = new URL(effect.file, assetBase);
        url.search = assetRevision;
        effect.buffer = fetch(url)
          .then(response => {
            if (!response.ok) throw new Error('Sound file unavailable');
            return response.arrayBuffer();
          })
          .then(bytes => audio.decodeAudioData(bytes))
          .catch(() => null);
      }
      return effect.buffer;
    }

    let resuming;
    return {
      preload(name) {
        loadEffect(name);
      },
      unlock() {
        if (audio?.state === 'suspended' && !resuming) {
          resuming = audio.resume().catch(() => {}).finally(() => {
            resuming = undefined;
          });
        }
      },
      async play(name, { signal, fromProgress = 0, toProgress = 1 } = {}) {
        if (!audio || signal?.aborted || (audio.state !== 'running' && !resuming)) return;

        const requestedAt = performance.now();
        const effect = effects[name];
        if (!effect) return;
        const buffer = await loadEffect(name);
        await resuming;
        if (!buffer || signal?.aborted || audio.state !== 'running' || performance.now() - requestedAt > 350) return;

        const source = audio.createBufferSource();
        const gain = audio.createGain();
        const startAt = audio.currentTime + (effect.delay ?? 0);
        const offset = effect.offset ?? 0;
        const rate = effect.playbackRate ?? 1;
        const available = (buffer.duration - offset) / rate;
        const clipDuration = Math.min(effect.duration ?? available, available);
        const duration = clipDuration * (toProgress - fromProgress);
        const sliced = fromProgress > 0 || toProgress < 1;
        source.buffer = buffer;
        source.playbackRate.value = rate;
        source.connect(gain);
        gain.connect(audio.destination);
        const fadeIn = sliced ? Math.min(0.005, duration / 3) : 0;
        gain.gain.setValueAtTime(fadeIn ? 0 : effect.volume, startAt);
        if (fadeIn) gain.gain.linearRampToValueAtTime(effect.volume, startAt + fadeIn);
        if (signal) {
          const stop = () => source.stop();
          signal.addEventListener('abort', stop, { once: true });
          source.addEventListener('ended', () => signal.removeEventListener('abort', stop), { once: true });
        }
        if (effect.loop) {
          source.loop = true;
          source.loopStart = offset;
          source.start(startAt, offset);
        } else {
          if (effect.duration || sliced) {
            const fadeOut = Math.min(sliced ? 0.008 : 0.05, duration / 3);
            gain.gain.setValueAtTime(effect.volume, startAt + duration - fadeOut);
            gain.gain.linearRampToValueAtTime(0, startAt + duration);
          }
          source.start(startAt, offset + clipDuration * fromProgress * rate, duration * rate);
        }
      }
    };
  }
})();
