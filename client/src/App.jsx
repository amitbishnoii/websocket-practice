import React, { useEffect, useState } from 'react'
import socket from '../config/socket.js';
import "./App.css"

const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    console.log('message sent');
    socket.emit("message", {message, room});
    setMessage("");
  };

  useEffect(() => {
    if (socket.connected) {
      setSocketID(socket.id);
      console.log("already connected", socket.id);
    }
    socket.on("connect", () => {
      setSocketID(socket.id)
      console.log('socket connected!', socket.id);
    })

    socket.on("recieve-message", (info) => {
      console.log('got a message: ', info);
    });
  }, [])

  return (
    <>
    <div className="parent">

      <div className='container'>
        <h5>{socketID}</h5>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message..." className='message-input' />
        <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room ID..." className='message-input' />
        <button onClick={handleSend} className='send-button'>Send</button>
      </div>
      <div className="messages">
        <h5>message window</h5>
        {
          
        }
      </div>
    </div>
    </>
  )
}

export default App