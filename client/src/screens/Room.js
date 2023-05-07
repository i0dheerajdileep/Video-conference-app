import React, {useEffect,useCallback,useState}from 'react'
import { useSocket } from '../context/SocketProvider'
import Reactplayer  from 'react-player'
import peer from '../service/Peer'

function Room() {
    const socket = useSocket()
    const [remoteSocketId,setRemoteSocketId] = useState(null)
    const [myStream , setMyStream] = useState(null)

    const handleUserJoined = useCallback(({email,id})=>{
      console.log(`Email ${email} joined`)
      setRemoteSocketId(id)
    },[])
    const handleIncommingCall = useCallback(
      async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMyStream(stream);
        console.log(`Incoming Call`, from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
      },
      [socket]
    );
    const handleCallAccepted = useCallback(
      async ({ from, ans }) => {
        try {
          peer.setLocalDescription(ans);
          console.log("Call Accepted!");
        } catch (error) {
          console.error("Error setting remote description: ", error);
        }
      },[]
    );
    useEffect(()=>{
        socket.on('user:joined',handleUserJoined)
        socket.on('incomming:call',handleIncommingCall)
        socket.on('call:accepted',handleCallAccepted)
        return()=>{
          socket.off('user:joined',handleUserJoined)
          socket.off('incomming:call',handleIncommingCall)
          socket.off('call:accepted',handleCallAccepted)
        }
    },[socket,handleUserJoined,handleIncommingCall,handleCallAccepted])
    const handleCallUser = useCallback(async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
      })
      const offer = await peer.getOffer()
      socket.emit('user:call',{to:remoteSocketId, offer})
      setMyStream(stream)
    },[remoteSocketId,socket])

  return (
    <div>
      <h1>Room page</h1>
      <h3>{remoteSocketId ? 'Connected' : 'No one in the room'}</h3>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
      <>
      <h1>My stream</h1>
      <Reactplayer
       playing
       muted
       url={myStream}
       height='300px'
       width='500px'/>
    </>)}
   </div>
    )}

export default Room
