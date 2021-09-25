let elapsed = 0;
let seconds = 0;
let stopped = true;
let prevStamp;
let client;

let id = 0;

let listeners = [];

const raiseSecondElapsed = (elapsed) => {
  listeners.forEach((l) => l.callback(elapsed));
};

const loop = (timestamp) => {
  if (stopped) return;
  if (prevStamp === undefined) {
    prevStamp = timestamp;
  } else {
    elapsed += timestamp - prevStamp;
    prevStamp = timestamp;
    const temp = Math.floor(elapsed / 1000);
    if (temp !== seconds) {
      seconds = temp;
      raiseSecondElapsed(temp);
    }
  }
  requestAnimationFrame(loop);
};

export const stop = () => {
  stopped = true;
  prevStamp = undefined;
  client = null;
};

export const start = (params) => {
  client = params;
  elapsed = 0;
  seconds = 0;
  stopped = false;
  requestAnimationFrame(loop);
};

export const resume = () => {
  stopped = false;
  requestAnimationFrame(loop);
};

export const subscribe = (callback) => {
  id += 1;
  listeners.push({ id, callback });
  return id;
};

export const unsubscribe = (id) => {
  listeners = listeners.filter((l) => l.id !== id);
};

export const isRunning = () => !stopped;
export const elapsedTime = () => seconds;
export const getClient = () => client;
export const clientCount = () => listeners.length;
