import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext"
import { ChatBubble } from "./ChatBubble";
import { useContext } from 'react';

export const ChatDisplay = () => {
    const {chatList} = useContext(ChatContext);
    const {user} = useContext(AuthContext);

    const handleCurrentUser = (chatId: string) => {
        return user?.id === chatId
    }

    return(
        <div className="chat-display flex-grow-1 d-flex flex-column justify-content-end">
            {chatList.map(chat => <ChatBubble key={chat.id} isCurrentUser={handleCurrentUser(chat.userId)} chat={chat} />)}
        </div>
    )
}