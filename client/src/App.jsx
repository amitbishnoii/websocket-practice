import React, { useEffect, useState } from 'react'
import socket from '../config/socket.js';

const App = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log('message sent');
    socket.emit("message", message);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log('socket connected!', socket.id);
    })

    socket.on("recieve-message", (info) => {
      console.log('got a message: ', info);
    });

    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <>
      <input type="text" value={message} onChange={handleChange} placeholder="Message..."/>
      <button onClick={handleSend}>Send</button>
    </>
  )
}

export default App