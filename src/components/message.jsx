import { useContext, useEffect, useRef } from "react"
import { ChatContext } from "../context/chatContext"
import { AuthContext } from "../context/authContext"


function Message({ message }) {
    const { authUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const ref = useRef()
    let seconds = message.date.seconds
    let current_timestamp = Math.floor(Date.now() / 1000);
    let difference = current_timestamp - seconds;
    if (difference < 60) {
        difference = "Just now";
    }
    else if (difference < 3600) {
        difference = Math.floor(difference / 60) + " min";
    }
    else if (difference < 86400) {
        difference = Math.floor(difference / 3600) + " hours";
    }
    else {
        let then = new Date(seconds * 1000);
        const options = { day: '2-digit', month: '2-digit' };
        difference = then.toLocaleDateString('nb-NO', options);
    }
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])
    return (
        <div ref={ref} className={"flex gap-2 py-1 " + (message.senderId === authUser.uid ? "flex-row-reverse" : "")}>
            <div className="flex flex-col items-center">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={message.senderId === authUser.uid ? authUser.photoURL : data.user.photoURL}
                ></img>
                <span className="font-light text-md">{difference}</span>
            </div>
            <div style={{ maxWidth: "65%" }} className={"flex flex-col gap-1 " + (message.senderId === authUser.uid ? "items-end" : "")}>
                <p className={"max-w-max py-1.5 pl-2 pr-2 rounded-md " + (message.senderId === authUser.uid ? 'bg-[#4AA4FF] text-white' : 'bg-white text-gray-800')}>{message.text}</p>
                {message.img && <img className="w-1/2 rounded" src={message.img} alt=""></img>}
            </div>
        </div>
    )
}
export default Message;