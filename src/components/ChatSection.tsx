import { ChatDisplay } from "./ChatDisplay"
import { ChatForm } from "./ChatForm"

export const ChatSection = () => {

    return(
        <div className="chat-section flex-grow-1 d-flex flex-column">
            <ChatDisplay />
            <ChatForm />
        </div>
    )
}