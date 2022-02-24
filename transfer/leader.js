self.addEventListener('message', ({ ports }) => {

  const followerPort = ports[0];

  followerPort.onmessage = ({ ports }) => {
    ports[0].onmessage = ({ data }) => {
      console.log('[leader] port got', data);
    };
  };

});


