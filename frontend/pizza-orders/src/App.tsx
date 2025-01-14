import { useEffect } from "react";
import useSocket from "./hooks/useSocket";
import { serverUrl } from "./consts/general";

function App() {
  const { socket, sendEvent, subscribeToEvent, data } = useSocket(serverUrl);

  useEffect(() => {
    if (!socket) return;
    subscribeToEvent("orders");
  }, [socket, sendEvent, subscribeToEvent]);

  return (
    <div>
      <h1>Orders</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
