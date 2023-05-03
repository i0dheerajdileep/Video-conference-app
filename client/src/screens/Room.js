import React, {useEffect,useCallback,useState}from 'react'
import { useSocket } from '../context/SocketProvider'
import Reactplayer  from 'react-player'

function Room() {
    const socket = useSocket()
    const [remoteSocketId,setRemoteSocketId] = useState(null)
    const [myStream , setMyStream] = useState(null)

    const handleUserJoined = useCallback(({email,id})=>{
      console.log(`Email ${email} joined`)
      setRemoteSocketId(id)
    },[])
    useEffect(()=>{
        socket.on('user:joined',handleUserJoined)
        return()=>{
          socket.off('user:joined',handleUserJoined)
        }
    },[socket,handleUserJoined])
    const handleCallUser = useCallback(async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
      })
      setMyStream(stream)
    },[])
  return (
    <div>
      <h1>Room page</h1>
      <h3>{remoteSocketId ? 'Connected' : 'No one in the room'}</h3>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && 
      <Reactplayer
       playing
       muted
       url={myStream}
       height='100px'
       width='200px'/>}
    </div>
  )
}
export default Room
