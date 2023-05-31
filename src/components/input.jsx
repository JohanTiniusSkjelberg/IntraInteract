import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from 'uuid';


import Img from "../assets/img.png";
import Attach from "../assets/attach.png";

import firebase from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const db = firebase.firestore();

function Input() {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const { authUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async () => {
        setText('');
        if (img) {
            const storageRef = ref(firebase.storage(), uuid());
            const uploadTask = uploadBytesResumable(storageRef, img[0]);

            uploadTask.on('state_changed',
                () => { },
                (err) => {
                    console.log(err);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text: text,
                                senderId: authUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        })
                        setImg(null);
                    });
                }
            );
        }
        else {
            if (text == "") { return; }
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: text,
                    senderId: authUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, "userChats", authUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        })
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        })

    }
    const handleKey = (e) => {
        e.code === "Enter" && handleSend();
    }
    return (
        <div className="bg-white h-16 flex px-4 items-center justify-between">
            <input value={text} 
            onKeyDown={handleKey} 
            onChange={e => setText(e.target.value)} 
            className="h-full grow text-lg outline-none bg-transparent border-b border-black" type="text" placeholder="Type something..."
            ></input>
            <div className="flex gap-4">
                <img className="py-2" src={Attach} alt=""></img>
                <input className="hidden" type="file" id="image" onChange={e => setImg(e.target.files)} />
                <label className="flex items-center cursor-pointer" htmlFor="image">
                    <img className="" src={Img} alt=""></img>
                </label>
                <button onClick={handleSend} className="bg-[#8da4f1] text-white my-1.5 px-3.5">Send</button>
            </div>
        </div>
    )
}
export default Input;