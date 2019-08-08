const useSocket = url => {
  const [state, dispatch] = useReducer(messageReducer, messages);
  const [socketServer, setSocketServer] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setSocketServer(new WebSocket(url));
    setConnected(true);
  }, [url]);

  useEffect(() => {
    if (connected) {
      socketServer.onopen = event => {
        console.log('Client connected to socket server');
      };
    }
    // return () => (socketServer.onopen = null);
  }, [connected, socketServer]);

  useEffect(() => {
    if (connected) {
      socketServer.onmessage = event => {
        const incomingMessage = JSON.parse(event.data);
        // this.updateMessages(incomingMessage);
      };
    }
    // return () => (socketServer.onmessage = null);
  }, [connected, socketServer]);
