import React, { useContext, useEffect, useRef, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { GroupContextType, Message } from '../../models/group';
import { GroupContext } from '../../contexts/group_context';
import getAxiosInstanceCustom from '../../connection/axios_connection';
import SendIcon from '@mui/icons-material/Send';
import { UserContextType } from '../../models/user';
import { UserContext } from '../../contexts/user_context';
import Header from '../header/header';
import './chat.scss';

const Chat: React.FC = () => {
  const { roomId, user } = useParams<{ roomId: string; user: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const {getGroups, setGroups} = useContext<GroupContextType>(GroupContext);
  const [room, setRoom] = useState<any>();
  const [receiver, setReceiver] = useState<string>();
  const {users} = useContext<UserContextType>(UserContext);

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if(!roomId || !user){
    navigate('/');
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGroups();
      setGroups(res);

      const group = res.find((g: any) => g._id === roomId);
      if (group) {
        setRoom((prevRoom: any) => {
          if (prevRoom && prevRoom._id === group._id) {
            // Preserve existing room state if it's the same group
            return prevRoom;
          } else {
            return group;
          }
        });

        setMessages(group.messages);

        const rec = group.participants.find((p: string) => p !== user);
        // Wait for users context to have a value
        if (users && users.length > 0) {
          const receiverName = users.find((u) => u.username === rec)?.name;
          setReceiver(receiverName);
        }
      }
    };

    const fetchDataInterval = setInterval(fetchData, 1000);

  return () => clearInterval(fetchDataInterval);
  }, [getGroups, roomId, setGroups, user, users]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const button = document.getElementById('myButton');
        if (button) {
          button.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const updateRoomMessages = async () => {
      try {
        
          room.messages = messages;
          await getAxiosInstanceCustom().post(`/group/${roomId}`, room);
          console.log('Room updated:', room);
      
      } catch (error) {
        console.error('Error updating room:', error);
      }
    };
  
    updateRoomMessages();
  }, [room, messages, roomId]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message: Message = {
        sender: user as string,
        content: newMessage,
        date: new Date(),
      };
  
      setMessages(prevMessages => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  const getName = (username: string) => {
    if(username === user){
      return (users.find(u => u.username === username))?.name;
    }
    else{
      return receiver;
    }
  }

  return (
    <div className='chat_container'>
      <Header/>
      <div className='chat_main'>
        <div className='chat_main_2' >
          <h2 className='chat_title'>Talk to {receiver}</h2>
          <List className='chat_messages' ref={listRef as React.RefObject<HTMLUListElement>} >
            {messages.map((message, key) => (
              <ListItem key={key} >
                {message.sender === user?
                <ListItemText className='message_sender' primary={getName(message.sender)} secondary={message.content} /> :
                <ListItemText className='message_receiver' primary={getName(message.sender)} secondary={message.content} />
                }
              </ListItem>
            ))}
          </List>
          <div>
            <div className='chat_sender'>
              <TextField
                // label="Type your message"
                className='chat_text_field'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button id='myButton' className='chat_button' variant="contained" onClick={handleSendMessage}>
                <SendIcon/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
