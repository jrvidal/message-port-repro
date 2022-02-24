const leader = new Worker('leader.js');
const follower = new Worker('follower.js');

const { port1, port2 } = new MessageChannel();

leader.postMessage(null, [port1]);
follower.postMessage(null, [port2]);
