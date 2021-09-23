let elapsed = 0;
let seconds = 0;
let stopped = true;
let prevStamp;
let client;

let id = 0;

let listeners = [];

const subscribe = (callback) => {
  const temp = id;
  id += 1;
  listeners.push({ id, callback });
  return temp;
};

const unsubscribe = (id) => {
  listeners = listeners.filter((l) => l.id !== id);
};

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

const stop = () => {
  stopped = true;
  prevStamp = undefined;
  client = null;
};

const start = (params) => {
  client = params;
  elapsed = 0;
  seconds = 0;
  stopped = false;
  requestAnimationFrame(loop);
};

const resume = () => {
  stopped = false;
  requestAnimationFrame(loop);
};

export default {
  start,
  stop,
  resume,
  subscribe,
  unsubscribe,
  running: () => !stopped,
  elapsedTime: () => seconds,
  getClient: () => client,
};
