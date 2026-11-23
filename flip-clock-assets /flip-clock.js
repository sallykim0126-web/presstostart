(() => {
'use strict';
// IMPORTANT: All asset paths resolve relative to the HTML page you paste this into.
// Keep the flip-clock-assets folder beside your existing index.html.
const root=document.getElementById('opflip-time-limit');
if(!root) return;
const GLYPHS={"left0": "M491.74,758.65c-31.78,0-56.95-10.27-75.5-30.82-18.56-20.54-27.84-50.75-27.84-90.6v-64.72c0-39.86,9.25-70.09,27.74-90.71,18.49-20.61,43.56-30.92,75.2-30.92s56.36,10.31,74.99,30.92c18.62,20.62,27.94,50.85,27.94,90.71v64.72c0,40-9.25,70.23-27.74,90.71-18.49,20.48-43.42,30.71-74.78,30.71ZM491.74,708.52c12.05,0,21.26-5.2,27.63-15.61,6.37-10.41,9.55-27.33,9.55-50.75v-74.99c0-23.15-3.25-39.92-9.76-50.34-6.51-10.41-15.79-15.61-27.84-15.61s-21.68,5.17-28.04,15.51c-6.37,10.34-9.55,27.16-9.55,50.44v74.99c0,23.56,3.22,40.51,9.66,50.85,6.44,10.34,15.89,15.51,28.35,15.51Z", "left0b": "M503.95,681.04c-31.78,0-56.95-10.27-75.5-30.82-18.56-20.54-27.84-50.75-27.84-90.6v-64.72c0-39.86,9.25-70.09,27.74-90.71,18.49-20.61,43.56-30.92,75.2-30.92s56.36,10.31,74.99,30.92c18.62,20.62,27.94,50.85,27.94,90.71v64.72c0,40-9.25,70.23-27.74,90.71-18.49,20.48-43.42,30.71-74.78,30.71ZM503.95,630.91c12.05,0,21.26-5.2,27.63-15.61,6.37-10.41,9.55-27.33,9.55-50.75v-74.99c0-23.15-3.25-39.93-9.76-50.34-6.51-10.41-15.79-15.61-27.84-15.61s-21.68,5.17-28.04,15.51c-6.37,10.34-9.55,27.16-9.55,50.44v74.99c0,23.56,3.22,40.51,9.66,50.85,6.44,10.34,15.89,15.51,28.35,15.51Z", "left2": "M624.88,754.33v-42.53l96.77-102.93c9.31-10.55,16.64-19.76,21.98-27.63,5.34-7.87,9.17-15.1,11.51-21.67,2.33-6.57,3.49-13.01,3.49-19.31,0-10.68-2.98-19.76-8.94-27.22-5.96-7.46-14.83-11.2-26.61-11.2-12.6,0-22.09,4.25-28.46,12.74-6.37,8.49-9.55,20.13-9.55,34.93h-64.1l-.41-1.23c-.41-18.35,3.53-34.86,11.81-49.51,8.29-14.65,20.24-26.3,35.85-34.93s34.04-12.94,55.27-12.94,39.14,3.7,54.14,11.09,26.57,17.74,34.72,31.02c8.15,13.29,12.22,28.76,12.22,46.43,0,12.05-2.12,23.32-6.37,33.8-4.25,10.48-10.99,21.57-20.24,33.28-9.25,11.71-21.4,25.51-36.47,41.4l-51.98,55.47.41,1.03h68.83l3.08-26.92h50.13v76.84h-207.1Z", "left1": "M649.19,676.73v-38.83l51.77-6.37v-196.21l-52.18-.21v-36.98l117.93-20.54v253.94l51.77,6.37v38.83h-169.29Z", "second0": "M1091.19,758.65c-31.78,0-56.95-10.27-75.5-30.82-18.56-20.54-27.84-50.75-27.84-90.6v-64.72c0-39.86,9.25-70.09,27.74-90.71,18.49-20.61,43.56-30.92,75.2-30.92s56.36,10.31,74.99,30.92c18.62,20.62,27.94,50.85,27.94,90.71v64.72c0,40-9.25,70.23-27.74,90.71-18.49,20.48-43.42,30.71-74.78,30.71ZM1091.19,708.52c12.05,0,21.26-5.2,27.63-15.61,6.37-10.41,9.55-27.33,9.55-50.75v-74.99c0-23.15-3.25-39.92-9.76-50.34-6.51-10.41-15.79-15.61-27.84-15.61s-21.68,5.17-28.04,15.51c-6.37,10.34-9.55,27.16-9.55,50.44v74.99c0,23.56,3.22,40.51,9.66,50.85,6.44,10.34,15.89,15.51,28.35,15.51Z", "right0": "M1091.19,758.65c-31.78,0-56.95-10.27-75.5-30.82-18.56-20.54-27.84-50.75-27.84-90.6v-64.72c0-39.86,9.25-70.09,27.74-90.71,18.49-20.61,43.56-30.92,75.2-30.92s56.36,10.31,74.99,30.92c18.62,20.62,27.94,50.85,27.94,90.71v64.72c0,40-9.25,70.23-27.74,90.71-18.49,20.48-43.42,30.71-74.78,30.71ZM1091.19,708.52c12.05,0,21.26-5.2,27.63-15.61,6.37-10.41,9.55-27.33,9.55-50.75v-74.99c0-23.15-3.25-39.92-9.76-50.34-6.51-10.41-15.79-15.61-27.84-15.61s-21.68,5.17-28.04,15.51c-6.37,10.34-9.55,27.16-9.55,50.44v74.99c0,23.56,3.22,40.51,9.66,50.85,6.44,10.34,15.89,15.51,28.35,15.51Z", "right3": "M1090.11,681.04c-19.31,0-36.98-3.39-53.01-10.17s-28.73-16.64-38.11-29.58c-9.38-12.94-13.87-28.73-13.46-47.36l.21-1.23h63.9c0,7.12,1.64,13.6,4.93,19.42,3.29,5.82,7.98,10.41,14.07,13.77,6.09,3.36,13.25,5.03,21.47,5.03,12.87,0,23.04-3.7,30.51-11.09,7.46-7.4,11.2-17.26,11.2-29.58s-3.87-22.84-11.61-30.3c-7.74-7.46-19.21-11.2-34.41-11.2h-31.64v-48.9h33.28c8.9,0,16.26-1.61,22.09-4.83,5.82-3.22,10.2-7.67,13.15-13.35,2.94-5.68,4.42-12.43,4.42-20.24,0-11.23-3.15-20.34-9.45-27.33-6.3-6.99-15.48-10.48-27.53-10.48-6.99,0-13.22,1.41-18.7,4.21-5.48,2.81-9.76,6.71-12.84,11.71-3.08,5-4.62,10.86-4.62,17.57h-63.9l-.41-1.23c-.55-16.16,3.42-30.47,11.92-42.94,8.49-12.46,20.37-22.19,35.65-29.17,15.27-6.99,32.7-10.48,52.29-10.48,31.23,0,56.26,7.36,75.09,22.09,18.83,14.73,28.25,35.58,28.25,62.56,0,14.38-3.87,27.05-11.61,38.01-7.74,10.96-19.35,20.07-34.82,27.33,16.16,5.89,28.73,14.86,37.7,26.91,8.97,12.05,13.46,26.3,13.46,42.73,0,18.08-4.66,33.73-13.97,46.95-9.32,13.22-22.05,23.39-38.21,30.51-16.16,7.12-34.59,10.68-55.27,10.68Z", "last0": "M1331.57,758.65c-31.78,0-56.95-10.27-75.5-30.82-18.56-20.54-27.84-50.75-27.84-90.6v-64.72c0-39.86,9.25-70.09,27.74-90.71,18.49-20.61,43.56-30.92,75.2-30.92s56.36,10.31,74.99,30.92c18.62,20.62,27.94,50.85,27.94,90.71v64.72c0,40-9.25,70.23-27.74,90.71-18.49,20.48-43.42,30.71-74.78,30.71ZM1331.57,708.52c12.05,0,21.26-5.2,27.63-15.61,6.37-10.41,9.55-27.33,9.55-50.75v-74.99c0-23.15-3.25-39.92-9.76-50.34-6.51-10.41-15.79-15.61-27.84-15.61s-21.68,5.17-28.04,15.51c-6.37,10.34-9.55,27.16-9.55,50.44v74.99c0,23.56,3.22,40.51,9.66,50.85,6.44,10.34,15.89,15.51,28.35,15.51Z", "last0b": "M1325.56,681.04c-31.78,0-56.95-10.27-75.5-30.82-18.56-20.54-27.84-50.75-27.84-90.6v-64.72c0-39.86,9.25-70.09,27.74-90.71,18.49-20.61,43.56-30.92,75.2-30.92s56.36,10.31,74.99,30.92c18.62,20.62,27.94,50.85,27.94,90.71v64.72c0,40-9.25,70.23-27.74,90.71-18.49,20.48-43.42,30.71-74.78,30.71ZM1325.56,630.91c12.05,0,21.26-5.2,27.63-15.61,6.37-10.41,9.55-27.33,9.55-50.75v-74.99c0-23.15-3.25-39.93-9.76-50.34-6.51-10.41-15.79-15.61-27.84-15.61s-21.68,5.17-28.04,15.51c-6.37,10.34-9.55,27.16-9.55,50.44v74.99c0,23.56,3.22,40.51,9.66,50.85,6.44,10.34,15.89,15.51,28.35,15.51Z"};

const FLAP_IMAGE='../flip-clock-assets/12-10.svg';
const BOTTOM_PLATES={minutes:'../flip-clock-assets/flip_bottom_minutes.png',seconds:'../flip-clock-assets/flip_bottom_seconds.png'};
const ns='http://www.w3.org/2000/svg';
const W=1920,H=1080;
const stage=root.querySelector('.opflip-stage');
const viewport=root.querySelector('.opflip-viewport');
const playBtn=root.querySelector('.opflip-play');
const resetBtn=root.querySelector('.opflip-reset');
const label=root.querySelector('.opflip-label');
const PANELS = [
  { name: 'minutes', x: 338.52, y: 405.59, w: 583.81, h: 423.40 },
  { name: 'seconds', x: 942.72, y: 405.59, w: 583.81, h: 423.40 }
];
const TIMES=['02:00','01:30','01:00','00:30','00:00'];
const HALF_FLIP_MS=265;
// At 0.8×, the sound has one tick every 1250 ms.
const HOLD_MS=1250 - 2 * HALF_FLIP_MS;
let timeIndex=0, playing=false, generation=0;
let clockSound;
const cards=[];
function glyphPath(d,dx=0,dy=0){
  return `<path fill="#fbfbfb" d="${d}"${dx||dy?` transform="translate(${dx},${dy})"`:''}/>`;
}
function path(d, dx = 0, dy = 0) {
  const transform = (dx !== 0 || dy !== 0)
    ? ` transform="translate(${dx}, ${dy})"`
    : "";

  return `<path fill="#fbfbfb" d="${d}"${transform}/>`;
}


function numberSVG(t, panelName) {
  const mm = t.slice(0, 2);
  const ss = t.slice(3);

  // 새 SVG 카드 위치에 맞춘 공통 보정
  const DX = 24.89;

  let inner = '';

  if (panelName === 'minutes') {

    // 첫 번째 0은 항상 같은 모양, 같은 좌표
    inner += glyphPath(GLYPHS.left0, DX, 0);

    if (mm === '02') {
      inner += glyphPath(GLYPHS.left2, DX, 0);
    } else if (mm === '01') {
      inner += glyphPath(GLYPHS.left1, DX - 8, 77.61);
    } else {
      inner += glyphPath(GLYPHS.second0, DX - 365, 0);
    }

  } else {

    if (ss === '30') {
      inner += glyphPath(GLYPHS.right3, DX + 1, 77.61);
    } else {
      inner += glyphPath(GLYPHS.right0, DX, 0);
    }

    // 마지막 0도 항상 같은 모양, 같은 좌표
    inner += glyphPath(GLYPHS.last0, DX, 0);
  }

  return `<svg
    xmlns="${ns}"
    class="opflip-digit-svg"
    viewBox="0 0 ${W} ${H}"
    width="${W}"
    height="${H}"
    aria-hidden="true"
  >${inner}</svg>`;
}



function makeHalf(panel, where, t, kind) {
  const el = document.createElement('div');

  el.className = `opflip-half ${where} ${kind}`;

  const y = panel.y + (
    where === 'bottom' ? panel.h / 2 : 0
  );

  el.style.setProperty('--offset-x', `${-panel.x}px`);
  el.style.setProperty('--offset-y', `${-y}px`);

  // 기존 SVG의 실제 어두운 판과 테두리를 사용
  const plate = document.createElement('img');

  plate.className = 'opflip-plate-art';
  plate.alt = '';
  plate.src = '../flip-clock-assets/12-09.svg';

  plate.style.left = `${-panel.x}px`;
  plate.style.top = `${-y}px`;

  el.appendChild(plate);

  // 숫자를 판과 동일한 회전 요소 안에 넣음
  el.insertAdjacentHTML(
    'beforeend',
    numberSVG(t, panel.name)
  );

  return el;
}

function setFlat(card,t){
 card.el.replaceChildren(makeHalf(card.panel,'top',t,'stationary'),makeHalf(card.panel,'bottom',t,'stationary'));
}
for(const panel of PANELS){
 const el=document.createElement('div');
 el.className='opflip-card';
 el.style.left=panel.x+'px';el.style.top=panel.y+'px';
 el.style.width=panel.w+'px';el.style.height=panel.h+'px';
 const card={el,panel};cards.push(card);
 stage.insertBefore(el,stage.querySelector('.opflip-line'));
 setFlat(card,TIMES[0]);
}
function resize(){stage.style.transform=`scale(${viewport.clientWidth/W})`;}
window.addEventListener('resize',resize);resize();
function delay(ms){return new Promise(ok=>setTimeout(ok,ms));}
async function flipCard(card,oldTime,newTime,token){
 const el=card.el;
 const newTop=makeHalf(card.panel,'top',newTime,'stationary');
 const oldBottom=makeHalf(card.panel,'bottom',oldTime,'stationary');
 const oldTop=makeHalf(card.panel,'top',oldTime,'front');
 const newBottom=makeHalf(card.panel,'bottom',newTime,'back');
 el.replaceChildren(newTop,oldBottom,oldTop,newBottom);
 oldTop.style.animation=`opflipOut ${HALF_FLIP_MS}ms cubic-bezier(.47,.1,.85,.5) both`;
 await delay(HALF_FLIP_MS); if(token!==generation)return;
 oldTop.remove();newBottom.style.visibility='visible';
 newBottom.style.animation=`opflipIn ${HALF_FLIP_MS}ms cubic-bezier(.2,.65,.6,1) both`;
 await delay(HALF_FLIP_MS); if(token!==generation)return;
 setFlat(card,newTime);
}

async function next(token) {
  if (timeIndex >= TIMES.length - 1) return;

  const oldTime = TIMES[timeIndex];
  const newTime = TIMES[timeIndex + 1];

  timeIndex += 1;
  label.textContent = newTime;

  // 실제로 숫자가 바뀌는 카드만 선택
  const changedCards = cards.filter(card => {
    if (card.panel.name === 'minutes') {
      return oldTime.slice(0, 2) !== newTime.slice(0, 2);
    }

    return oldTime.slice(3) !== newTime.slice(3);
  });

  // 바뀌는 카드만 플립 애니메이션 실행
  await Promise.all(
    changedCards.map(card =>
      flipCard(card, oldTime, newTime, token)
    )
  );
}

function stopClockSound() {
 clockSound?.abort();
 clockSound = undefined;
}

window.addEventListener('pagehide', stopClockSound);

function reset(){
 stopClockSound();
 generation++;playing=false;timeIndex=0;
 cards.forEach(c=>setFlat(c,TIMES[0]));
 label.textContent=TIMES[0];
 playBtn.disabled=false;playBtn.textContent='▶ PLAY';
}
async function play(){
 if(playing)return;
 if(timeIndex>=TIMES.length-1)reset();
 const token=++generation;
 playing=true;playBtn.disabled=true;playBtn.textContent='FLIPPING…';
 clockSound = new AbortController();
 window.projectSounds?.play('clock', { signal: clockSound.signal });
 while(timeIndex<TIMES.length-1){
   await next(token);if(token!==generation)return;
   if(timeIndex<TIMES.length-1){
     await delay(HOLD_MS);if(token!==generation)return;
   }
 }
 if(token!==generation)return;
 stopClockSound();
 playing=false;playBtn.disabled=false;playBtn.textContent='↻ REPLAY';
}
playBtn.addEventListener('click',play);
resetBtn.addEventListener('click',reset);
// Existing website can call these at any point, e.g. after another animation.
window.flipClockPlay=play;
window.flipClockReset=reset;
window.flipClockSetTime=(t)=>{
 const idx=TIMES.indexOf(t);if(idx===-1)return;
 reset();timeIndex=idx;cards.forEach(c=>setFlat(c,TIMES[idx]));label.textContent=TIMES[idx];
};
// In the story, wait for the parent eyelid transition to finish.
const AUTO_START_DELAY_MS = 1000;
if(window.parent !== window){
 const onSceneVisible = event => {
  if(event.source !== window.parent || event.origin !== location.origin ||
     event.data?.type !== 'CLOCK_SCENE_VISIBLE') return;
  window.removeEventListener('message', onSceneVisible);
  setTimeout(play, AUTO_START_DELAY_MS);
 };
 window.addEventListener('message', onSceneVisible);
}else if('IntersectionObserver' in window){
 const observer=new IntersectionObserver((entries)=>{
  if(entries.some(e=>e.isIntersecting)){
   observer.disconnect();
   setTimeout(play, AUTO_START_DELAY_MS);
  }
 },{threshold:.25});
 observer.observe(viewport);
}else{
 setTimeout(play, AUTO_START_DELAY_MS);
}
})();
