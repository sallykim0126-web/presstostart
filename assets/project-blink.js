(() => {
  const asset = new URL("presto-eyelid.png", document.currentScript.src);
  const texture = new Image();
  texture.src = asset.href;
  texture.decode().catch(() => {});
  const layers = new WeakMap();

  window.drawPrestoEyelids = (overlay, progress, curve = 190) => {
    if (!layers.has(overlay)) {
      const top = document.createElement("div");
      const bottom = document.createElement("div");
      const blackout = document.createElement("div");
      const lids = [top, bottom].map(panel => {
        const lid = texture.cloneNode();
        lid.alt = "";
        Object.assign(lid.style, {
          position: "absolute", inset: "0 auto auto 0", width: "100%", height: "200%",
          transformOrigin: "top center", willChange: "transform, opacity"
        });
        Object.assign(panel.style, { position: "absolute", inset: "0" });
        panel.append(lid);
        return lid;
      });
      bottom.style.transform = "scaleY(-1)";
      Object.assign(blackout.style, { position: "absolute", inset: "0", background: "#000" });
      overlay.style.overflow = "hidden";
      overlay.append(top, bottom, blackout);
      layers.set(overlay, { lids, blackout });
    }

    const { lids, blackout } = layers.get(overlay);
    const p = Math.max(0, Math.min(1, progress));
    const scale = Math.max(0.38, Math.sin(Math.PI * p) * curve / 190);
    const offset = p * 25 - 75 * scale;
    blackout.hidden = p < 0.985;
    for (const lid of lids) {
      lid.style.opacity = Math.min(1, p / 0.12);
      lid.style.transform = `translate3d(0, ${offset}%, 0) scaleY(${scale})`;
    }
  };
})();
