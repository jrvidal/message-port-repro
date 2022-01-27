/**
 * TIMEOUT = -1 is equivalent to "no timeout"
 */
const TIMEOUT = -1;

function postAndWait(data) {
  console.log(`[iframe worker #${data.counter}] posting and sleeping`);
  data.port.postMessage({ counter: data.counter });

  const sab = new Int32Array(data.sab);

  const result = Atomics.wait(sab, data.counter, 0);
  console.log(`[iframe worker #${data.counter}] done waiting:`, result);

  self.onmessage = null;
  self.postMessage({ done: true });
}

self.onmessage = (event) => {
  const { data } = event;

  if (TIMEOUT === -1) {
    postAndWait(data);
  } else {
    setTimeout(() => postAndWait(data), TIMEOUT);
  }
};

self.postMessage({ ready: true });
