import { TypeChats } from "../types"

export const ChatBubble = ({isCurrentUser, chat}: {isCurrentUser: boolean, chat: TypeChats}) => {
    return(
        <div className={`chat-bubble ${isCurrentUser ? 'right' : 'left'}`}>
            <p>{chat.content}</p>
        </div>
    )
}