import React from 'react';
import './Messenger.css'
import Conversation from '../Conversation/Conversation';
import Message from '../Message/Message.jsx';
import ChatOnline from '../ChatOnline/ChatOnline.jsx';
import { useContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext.js'
import axiosInstance from '../../axiosInstance.js' ;
import { io } from "socket.io-client";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [receiverImg, setReceiverImg] = useState(null);
    const socket = useRef();
    const { user } = useAuthContext();
    const scrollRef = useRef();
  
    useEffect(() => {
      socket.current = io("ws://localhost:8000");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, []);
  
    useEffect(() => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
  
    useEffect(() => {
      if (user && user.followings) {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
          setOnlineUsers(
            user.followings.filter((f) => users.some((u) => u.userId === f))
          );
        });
      }
    }, [user]);
    
  
    useEffect(() => {
      const getConversations = async () => {
        try {
          console.log("this is user" , user)
          const res = await axiosInstance.get("api/conversations/" + user._id);
          console.log(res.data)
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    }, [user._id]);
  
    useEffect(() => {
      const getMessages = async () => {
        if (!currentChat) return; // Only proceed if currentChat is defined
        try {
          const res = await axiosInstance.get("api/messages/" + currentChat._id);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }, [currentChat]);
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
  
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
  
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
  
      try {
        const res = await axiosInstance.post("api/messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    return (
      <>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
              <div className="group">
                  <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                  <input placeholder="Search for friends" type="search" className="input" />
              </div>
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    <div className='userinfo'>
                      <Conversation conversation={currentChat} currentUser={user} />
                    </div>
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message   message={m} own={m.sender === user._id} image={user.image} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
          <div className="chatOnline">
            {/* <div className="chatOnlineWrapper">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              />
            </div> */}
          </div>
        </div>
      </>
    );
  }