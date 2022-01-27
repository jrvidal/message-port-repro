const sab = new Int32Array(new SharedArrayBuffer(4 * 128));

let counter = 0;

function startWorker(port) {
  let id = counter;

  const worker = new Worker('worker.js', { name: `worker #${id}` });

  worker.onmessage = ({ data }) => {
    if (data.done) {
      worker.terminate();
    } else if (data.ready) {
      console.log(`[iframe] start worker #${id}`);
      worker.postMessage({ port: port, sab: sab.buffer, counter: id }, [port]);
    }
  };

  counter += 1;
}

function awakeWorker(counter) {
  console.log(`[iframe] awake worker #${counter}`);

  Atomics.store(sab, counter, 1);
  Atomics.notify(sab, counter, 1);
}

window.addEventListener('message', (event) => {
  const { data } = event;

  if (data.port) {
    startWorker(data.port);
  } else if (data.done) {
    awakeWorker(data.counter);
  }
});
