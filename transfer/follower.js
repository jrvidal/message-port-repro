const DESTROY = false;

let leaderPort;

self.addEventListener('message', ({ ports }) => {
  leaderPort = ports[0];
  setTimeout(start, 200);
})

function start() {
  const { port1, port2 } = new MessageChannel();

  port2.onmessage = (event) => {
    console.log('[follower] port got', event.data);
  };

  port1.postMessage('hello');

  if (DESTROY) {
    port2.onmessage = null;
  }

  leaderPort.postMessage(undefined, [port2]);
}
