import React from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';


const SOCKET_URL = 'http://localhost:8080/stomp';
let stompClient = null;

const ChatRoom = () => {

  const[incomingMsg,setIncomingMsg]=React.useState("")
  const[outgoingMsg,setOutgoingMsg]=React.useState("")
  let[connectStatus,setConnectionStatus]=React.useState(false)
  const [userData, setUserData] = React.useState({
    connected: false,
    message:""
  })

  let onConnected = () => {

    setUserData({ ...userData, connected: true })
    stompClient.subscribe('/topic/messages', onMessageRecieved)
    console.log("Connected!!")
  }

  let onError = () => {
    console.log("error!!")
  }
  let onMessageRecieved = (payload) => {
    let payloadData = JSON.parse(payload.body)
    setIncomingMsg(payloadData.message)
  }

  let handleConnect = () => {

    var sock = new SockJS(SOCKET_URL);
    stompClient = over(sock)
    stompClient.connect({}, onConnected, onError)


  }

  let handleDisconnect = () => {

    stompClient.disconnect({})
    setUserData({ ...userData, connected: false ,message:""})
    setIncomingMsg("")
  }
  console.log("sapi", userData)


  React.useEffect(() => {
    setConnectionStatus(userData.connected)
  }, [userData.connected])
  console.log("sapnadip",connectStatus)
  const sendValue=(outgoingMsg)=>{
    if (stompClient) {
      var chatMessage = {
        senderName: "sapii",
        message: outgoingMsg,
        status:"MESSAGE"
      };
      console.log(chatMessage);
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setUserData({...userData,"message": ""});
    }
}

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column"}}>

     {!connectStatus? <button onClick={handleConnect}>connect</button> :<>
     <input placeholder='value here' onChange={(e)=>setOutgoingMsg(e.target.value)}/>
     <div> <button onClick={()=>sendValue(outgoingMsg)}>send</button>
     <button onClick={handleDisconnect}>disconnect</button></div>
    </>}
      
      
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>{incomingMsg}</div>
    </div>
  )
}

export default ChatRoom
