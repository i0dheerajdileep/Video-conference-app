import React,{createContext,useContext,useMemo} from 'react'
import {io} from 'socket.io-client'
const SocketContext = createContext(null)
function SocketProvider(props) {
    const socket = useMemo(()=> io('localhost:3001'),[])
  return (
    <div>
      <SocketContext.Provider value={socket}>
        {props.children}
      </SocketContext.Provider>
    </div>
  )
}
function useSocket(){
    const socket = useContext(SocketContext)
    return socket
}

export  {SocketProvider,useSocket}
