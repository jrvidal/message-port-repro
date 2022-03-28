const isWorker = globalThis.window == null;

const channel = new BroadcastChannel('message-port-repro');

if (isWorker) {
  channel.onmessage = (event) => console.log('from broadcast', event.data);

  self.addEventListener('message', (event) => {
    const { port, sab } = event.data;

    port.onmessage = (event) => console.log('from port', event.data);

    console.log('from worker', sab);
  });
} else {
  const worker = new Worker('main.js');

  const sab = new SharedArrayBuffer(10);

  const { port1, port2 } = new MessageChannel();

  setTimeout(() => {
    worker.postMessage(
      {
        port: port1,
        sab,
      },
      [port1]
    );

    channel.postMessage(sab);

    port2.postMessage(sab);
  }, 1000);
}
