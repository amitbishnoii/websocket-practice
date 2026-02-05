import React, { useEffect, useState } from 'react'
import socket from '../config/socket.js';
import "./App.css"

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSend = () => {
    console.log('message sent');
    setMessages((msg) => [...msg, message]);
    socket.emit("message", { message, room });
    setMessage("");
  };

  const handleRoomEvent = () => {
    console.log('room joined!!');
    socket.emit("join-room", roomName);
    setRoomName("");
  }


  useEffect(() => {
    const handleReceive = (info) => {
      setMessages((msg) => [...msg, info]);
      console.log('got a message: ', info);
    };

    const handleConnect = () => {
      setSocketID(socket.id);
      console.log('socket connected!', socket.id);
    };

    socket.on("connect", handleConnect);
    socket.on("recieve-message", handleReceive);

    return () => socket.off("recieve-message", handleReceive);
  }, [])

  return (
    <>
      <div className="parent">

        <div className='container'>

          <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Room ID..." className='input' />
          <button className="button" onClick={handleRoomEvent}>
            Join
          </button>

          <h5>{socketID}</h5>

          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message..." className='input' />
          <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room..." className='input' />
          <button onClick={handleSend} className='button'>
            Send
          </button>

        </div>

        <div className="messages">
          <h5>message window</h5>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App