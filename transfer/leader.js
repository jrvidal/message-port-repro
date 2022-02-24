const child = new Worker('follower.js');

child.onmessage = ({ ports }) => {
  ports[0].onmessage = ({ data }) => {
    console.log('[leader] port got', data);
  };
};
