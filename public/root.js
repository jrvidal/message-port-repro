const iframe = document.querySelector('iframe');

document.querySelector('button').addEventListener('click', () => {
  createAndSendChannel();
});

function createAndSendChannel() {
  const { port1, port2 } = new MessageChannel();

  port2.onmessage = (event) => {
    console.log('[main thread] port received a message', event.data);

    iframe.contentWindow.postMessage(
      { done: true, counter: event.data.counter },
      iframe.src
    );
  };

  iframe.contentWindow.postMessage({ port: port1 }, iframe.src, [port1]);
}
