import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import { allUsersRoute, host } from '../utils/APIRoutes';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const socket = useRef();

  //this is for check that user is present or not in local storage
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        } else {
          setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };
    fetchData();
  }, [])

  useEffect(()=>{
      if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          }else{
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className='container'>
        <Contacts 
          contacts={contacts} 
          currentUser={currentUser} 
          changeChat={handleChatChange}
        />
        {
          isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser} />
        ) : (
        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )
         }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container{
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    /*this devides the screen in two section for chat section and contact section*/
    display:grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns: 35% 65%;
    }
    @media screen and (max-width: 719px){
    grid-template-columns: 100%; /* Single column for mobile */
    }
  }
`;
