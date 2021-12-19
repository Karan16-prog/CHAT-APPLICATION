import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import  {useCollectionData} from 'react-firebase-hooks/firestore';
import React,{ useRef, useState, useEffect } from 'react';
import './chatRoom.css';
import {Link} from 'react-router-dom';
import { MdSend } from "react-icons/md";
import {MdChevronLeft} from "react-icons/md";

//firbase config
firebase.initializeApp({
  apiKey: "AIzaSyDyZxJ_AfQlWL4wDA0yWbUwNiCcpESs9sA",
  authDomain: "react-chat-app-2860f.firebaseapp.com",
  projectId: "react-chat-app-2860f",
  storageBucket: "react-chat-app-2860f.appspot.com",
  messagingSenderId: "706634029041",
  appId: "1:706634029041:web:f32a5f856c83e165f69650",
  measurementId: "G-W1XYYK7V9T"
})


const firestore = firebase.firestore(); //Create firebase store

function ChatRoom(props) {
  const scroll = useRef(); //for scrollbar
  const messagesRef = firestore.collection(props.collection); //get collection(specific chat room) from database
  const query = messagesRef.orderBy('createdAt').limit(25); 
  
  const [messages] = useCollectionData(query, { idField: 'id' });//all the messages + id generated

  
  const [formValue, setFormValue] = useState(''); //send message form state
 

  //send message function
  const sendMessage = async(e) =>{
    //prevent refresh after every message sent
    e.preventDefault();
  
    //asynchronous function sending data to firebase databse with user set as Ram
    //and createdAt with the current time stamp
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user:'Ram', 
    })
    
    //setting value of form to empy after pressing the send button
    setFormValue('');
  }

  //useEffect hook to automatically scroll down to the bottom of the chat
  //everytime a message is sent. 
  useEffect(() => {
   scroll.current.scrollIntoView({behavior:'smooth'});
  }, [formValue])

  return (
  <div className='chatApp'>
    <div style={{margin:'0 auto'}} className='back__button'>
      <Link to='/'>
        <MdChevronLeft style={{transform:'scale(2)', color:'white',marginLeft:'0.5vh'}}/>
      </Link>
      <span style={{margin:'0 auto', color:'white',fontSize:'1.25rem'}}>{props.topic}</span>
    </div>
   
    <main>
      {/*mapping through every message and passing to the component ChatMessage */}
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} user={msg.user}  />)}
      
      {/*ref used here to scroll */}
       <div ref={scroll}></div>
    </main>

    {/*Form to write and send message */}
    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter your message" />
      <button type="submit" disabled={!formValue}><MdSend style={{ transform:'scale(1.25)',position:'relative',top:3,color:'white'}}/></button>
    </form>
  </div>
  )
}


function ChatMessage(props) {
  const { text,user, createdAt } = props.message;

  //if user is Ram then add class 'sent' otherwise 'received' (css styles)
  const messageClass = user === 'Ram' ? 'sent' : 'received';

  //timestamp to be added below every message both for sending message in real time and old messages
  const timeStamp = () =>{
    if(createdAt == null){
      return <span className='time__stamp sent'>{new Date().toLocaleString()}</span> ;
    }
   else{
     return <span className='time__stamp recieved'>{createdAt.toDate().toLocaleString()}</span>;
    }
  }

  return (
  <>
    <div className ={`message ${messageClass}`}>
      
      <p>
        {/* if class is received then add name of sender(Ghanshyam) */}
        {messageClass === 'received' && <div className='reciever__name'>~Ghanshyam</div> }
        {text}  
        {/*invoke timeStamp function */}
        {timeStamp()}
      </p>
    </div>
  </>
  )
}


export default ChatRoom;