import { createContext } from "react";
import { TypeChatContext } from "../types";

export const ChatContext = createContext<TypeChatContext>({
    chatList: [{
        id: '',
        content: '',
        userId: '',
        timeStamp: {
            seconds: 0,
            nanoseconds: 0
        }
    }] 
})