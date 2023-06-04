import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { useContext, useEffect, useState } from "react";
import firebase from "../firebase";
import Skeleton from "./skeleton";
const db = firebase.firestore();

function Users() {
    const [chats, setChats] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { authUser } = useContext(AuthContext)
    const { data, dispatch } = useContext(ChatContext)

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u })
    }
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", authUser.uid), (doc) => {
                setChats(doc.data());
                setTimeout(() => setIsLoading(false), 600);
            });
            return () => unsub();
        };
        authUser?.uid && getChats();
    }, [authUser?.uid])

    if (isLoading) {
        return (
            <Skeleton />
        )
    }
    console.log(chats);
    return (
        <div className="flex flex-col justify-between grow">
            <div>
                {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    chat[1]?.userInfo?.uid ?
                        <div key={chat[0]}
                            onClick={() => handleSelect(chat[1].userInfo)}
                            className={"py-2 px-4 flex items-center gap-2 text-white cursor-pointer hover:bg-[#2f2d52] " + (data?.user?.uid === chat[1].userInfo.uid ? "bg-[#2f2d52]" : "")}
                        >
                            <img className="object-cover w-12 h-12 rounded-full" alt="bilde" src={chat[1]?.userInfo.photoURL}></img>
                            <div className="userChatInfo">
                                <span className="text-xl font-medium">{chat[1].userInfo.displayName}</span>
                                <p className="text-sm text-gray-300">{chat[1].lastMessage?.text}</p>
                            </div>
                        </div>
                        :
                        null
                ))}
            </div>
        </div>
    )

}

export default Users;