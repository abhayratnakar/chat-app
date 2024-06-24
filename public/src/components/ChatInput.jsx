import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setshowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setshowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message = message + event.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length > 0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <Container>
            <div className='button-container'>
                <div className='emoji'>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {   showEmojiPicker &&
                                <Picker onEmojiClick={handleEmojiClick} height={330} width={300} />
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e)}>
                <input type='text' placeholder="type your message here" value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className='Submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-col: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        padding: 0 1rem;
        gap: 1rem;
    }
    @media screen and (max-width: 719px) {
        padding: 0.3rem; 
        gap: 0.3rem; 
    }
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            svg{
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact{
                position: absolute;
                top: -350px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9186f3;
                .EmojiScrollWrappper::-webkit-scrollbar{
                    background-color: #080420;
                    width: 5px;
                    &-thumb{
                        background-color: #9186f3;
                    }
                } 
                .epr-header{
                    .epr-search-container{
                        background-color: transparent;
                        input{
                            background-color: transparent;
                            border-color: #9186f3;
                        }
                    }
                }
                .epr-emoji-category{
                    .epr-emoji-category-label{
                        background-color: #080420;
                    }
                }
                .epr-body::-webkit-scrollbar{
                    background-color: #080420;
                    width: 5px;
                    &-thumb{
                        background-color: #9186f3;
                    }
                }
                .epr_-kg0voo {
                    display: none;
                } 
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input{
            width: 90%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left:1rem;
            font-size: 1.2rem;
            &::selection{
                background-color:#09186f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            padding: 0.1rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color:#9a86f3;
            border: none;
            cursor: pointer;
            @media screen and (min-width: 720px) and (max-width: 1080px){
                padding: 0.3rem 1rem;
                svg{
                    font-size: 1rem;
                }
            }
            @media screen and (max-width: 719px){
                padding: 0.2rem 0.5rem; 
                svg {
                    font-size: 0.8rem; 
                }
            }
            svg{
                font-size: 2rem;
                color: white;
            }
        }
    }
`;
