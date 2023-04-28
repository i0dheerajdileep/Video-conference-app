import React,{useState,useCallback,useEffect} from 'react'
import { useSocket } from '../context/SocketProvider'
function Lobby() {
    const [email,setEmail] = useState('')
    const [room,setRoom] = useState('')
    const socket = useSocket()
    const handleSubmitForm = useCallback((e)=>{
        e.preventDefault()
        socket.emit('room:join',{email,room})
    },[email,room,socket])
    useEffect(()=>{
        socket.on('room:join',data=>{console.log(`data from backend ${data}`)})
    },[])
  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor='email'>Email id </label>
        <input type='email' id='email' value={email} onChange={e=> setEmail(e.target.value)}/><br/>
        <label htmlFor='room'> Room </label>
        <input type='text' id='room' value={room} onChange={e=>setRoom(e.target.value)}/><br/>
        <button>Join</button>
      </form>
    </div>
  )
}

export default Lobby
