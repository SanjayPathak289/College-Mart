import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import { ThickArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
const ShowMessages = (props) => {
    const [currentChat, setCurrentChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    useEffect(() => {
        const convFunc = async () => {
            const sendReceiveId = {
                members: {
                    senderId: props.sender._id,
                    receiverId: props.rId,
                }
            }
            const conv = await axios.post("http://localhost:3000/api/chats/conversation/", sendReceiveId);
            setCurrentChat(conv.data);
        }
        convFunc();
    }, [])







    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.get("http://localhost:3000/api/message/messages", {
                params: {
                    cid: currentChat._id,
                }
            });
            setMessages(res.data);

        }
        getMessages();
    }
        , [currentChat]);


    const handleMessageSubmit = async (e) => {
        


        const message = {
            conversationId: currentChat._id,
            sender: props.sender._id,
            text: newMessage,
        };
        try {
            const res = await axios.post("http://localhost:3000/api/message/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="allMessages">
            <div className='messageShowingDiv'>
                {props.sender._id !== props.rId ? (
                    messages.map((m) => (
                        <Message message={m} own={m.sender === props.sender._id} key={m._id}/>
                    ))
                ) : 
                    <div style={{color :"black"}}>You Can't Message Yourself</div>
                    

                }

            </div>



            {props.sender._id !== props.rId ?
                <div style={{ position: "relative", width: "100%" }}>
                    <textarea name="messageInputBox" cols="3" rows="3" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='chatTextArea'></textarea>
                    <Button onClick={handleMessageSubmit} style={{
                        position: "absolute",
                        right: "10%",
                        top: "10%",
                        cursor: "pointer"
                    }} ><ThickArrowRightIcon /></Button>

                </div> : null
            }
        </div>
    )
}

export default ShowMessages