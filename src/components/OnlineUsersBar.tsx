import { TypeUser } from "../types"
import { UserInfo } from "./UserInfo"

export const OnlineUsersBar = ({onlineUsers}: {onlineUsers: TypeUser[]}) => {

    return(
        <div className="online-users p-3">
            <h2>Online users</h2>
            <div className="user-list">
                {
                    onlineUsers.length > 0 && onlineUsers.map(user => <UserInfo key={user.id} user={user} />)
                }
            </div>
        </div>
    )
}