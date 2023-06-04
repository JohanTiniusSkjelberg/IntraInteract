import { useContext, useState } from "react";
import { collection,query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc, onSnapshot } from "firebase/firestore";
import firebase from "../firebase";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";

const db = firebase.firestore();

function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [lastMessage, setLastMessage] = useState('');

  const { authUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          setUser(doc.data());
      });
      
      onSnapshot(doc(db, "userChats", authUser.uid), (doc) => {
        let userID = Object.keys(doc.data())[0]
        setLastMessage(doc.data()[userID]?.lastMessage?.text)
      });
    }
    catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    const combinedId = authUser.uid > user.uid ? authUser.uid + user.uid : user.uid + authUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId))
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: []  
        });
        await updateDoc(doc(db, "userChats", authUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email
          },
          [combinedId+".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
            email: user.email
          },
          [combinedId+".date"]: serverTimestamp()
        })
      }
    }catch (err) {
      console.log(err);
    }

    dispatch({ type: 'CHANGE_USER', payload: user })
    setUser(null);
    setUsername('');
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }
  return (
    <div className="border-b border-gray-400 mb-1">
        <div className="p-4">
          <input value={username} onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} className="outline-none bg-transparent text-white border-b border-gray-400 w-3/4 h-10" type="text" placeholder="Find a user" />
        </div>
        {err && <span className="text-red-500">No user found</span>}
        {user && <div onClick={handleSelect} className="py-2 px-4 flex items-center gap-2 text-white cursor-pointer hover:bg-[#2f2d52]">
        <img className="object-cover w-12 h-12 rounded-full" alt="bilde" src={user.photoURL}></img>
        <div className="userChatInfo">
          <span className="text-xl font-medium">{user.displayName}</span>
          <p className="text-sm text-gray-300">{lastMessage && lastMessage}</p>
        </div>
      </div>
        }
    </div>
  )
}

export default Search;