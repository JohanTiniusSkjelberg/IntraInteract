import Img from "../assets/img.png";
import { useContext, useEffect,  useState } from "react";
import { ChatContext } from "../context/chatContext";
import { collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

import Input from "./input";
import Message from "./message";

import firebase from "../firebase";
import { AuthContext } from "../context/authContext";

const db = firebase.firestore();

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext)

  useEffect(() => {
    if (!data.chatId){return;}
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => unSub();
  }, [data.chatId])
  return (
    <div className="bg-[#ddddf7] p-2.5 grow overflow-y-scroll mr-0.5">
      {!data.chatId && <div className="flex justify-center items-center h-full">
        <p>&larr; Select a user</p>
      </div>}
      {messages?.map(m => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}


function Chats() {
  const { data } = useContext(ChatContext)
  const { authUser } = useContext(AuthContext)
  const authUsers = firebase.auth().currentUser;
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // This will be the new dimensions of the image.
        let { width, height } = img;
        canvas.width = 140;  // 64x64 pixels, adjust this to your needs.
        canvas.height = 140*(height/width);

        // Draw the scaled-down image onto the canvas.
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert the canvas back to a Blob.
        canvas.toBlob(resolve, file.type, 0.7);  // Adjust the 3rd argument to change the quality of the image.
      };
      img.onerror = reject;
    });
  };


  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const compressedFile = await compressImage(file);

    const storage = getStorage();
    const storageRef = ref(storage, authUser.displayName);
    const uploadTask = uploadBytesResumable(storageRef, compressedFile);

    uploadTask.on('state_changed',
      () => {
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      async () => {
        // Handle successful uploads on complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Update the authenticated user's profile
        await authUsers.updateProfile({
          photoURL: downloadURL,
        });
        // Update the user's document in Firestore
        const userRef = doc(db, 'users', authUsers.uid);
        await updateDoc(userRef, {
          photoURL: downloadURL,
        });
        const userSnapshot = await getDocs(collection(db, "userChats"))
        userSnapshot.docs.forEach(async (userDoc) => {
          Object.keys(userDoc.data()).forEach(async (user) => {
            let big =  authUsers.uid > userDoc.id ? authUsers.uid + userDoc.id : userDoc.id + authUsers.uid;
            if (big === user) {
              await updateDoc(doc(db, "userChats", userDoc.id), {
                [big + ".userInfo.photoURL"]: downloadURL,
              });
              console.log('jadd');
            }
          });
        });
    }
    )};

  return (
    <div className="w-2/3 flex flex-col bg-[#ddddf7]">
        <div className="h-14 flex bg-[#5d5b8d] items-center justify-between p-5 text-gray-50">
          <span>{data.user?.displayName}</span>
          <div className="flex gap-5">
            <label className="flex items-center cursor-pointer" htmlFor="file">
              <input type="file" id="file" style={{ display: "none" }} onChange={handleUpload} />
              <span>Profile Picture</span>
              <img className="h-6 w-6" src={Img} alt=""></img>
            </label>
            <button className="flex items-center cursor-pointer">Add users</button>
          </div>
        </div>
        <Messages />
        <Input />  
    </div>
  )
}

export default Chats;