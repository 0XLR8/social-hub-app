import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState, useContext } from 'react';
import { IoSend } from 'react-icons/io5';
import { db } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

export const ChatForm = () => {
    const {user} = useContext(AuthContext);
    const [chatText, setChatText] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Boolean(chatText)){
            setChatText('');
            await addDoc(collection(db, 'chats'), {
                userId: user?.id,
                content: chatText,
                timeStamp: serverTimestamp()
            });
        }
    }

    return(
        <form className="chat-form mt-4" onSubmit={handleSubmit}>
            <textarea className="chat-input" value={chatText} onChange={(e) => setChatText(e.target.value)}></textarea>
            <button className="chat-btn d-flex align-items-center">Send <IoSend className='icon' /></button>
        </form>
    )
}