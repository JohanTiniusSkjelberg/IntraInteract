import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";


import firebase from "../firebase";
import Cookies from "js-cookie";

function Navbar() {
  const  { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleSignOut() {
    firebase.auth().signOut().then(() => {
      Cookies.remove('loggedin');
      navigate('/')
    })
  }
  return (
    <div className="flex items-center p-4 bg-[#2f2d52] h-14 justify-between text-[#ddddf7]">
      <a href="/" >
        <span className="font-bold">Intrainteract</span>
      </a>
        <div className="flex gap-2 items-center">
        <img className="object-cover bg-[#ddddf7] h-8 w-8 rounded-full" src={authUser?.photoURL} alt=""></img>
            <span>{authUser?.displayName}</span>
        <button onClick={handleSignOut} className="bg-[#5d5b8d] text-[#ddddf7] text-xs p-1">logout</button>
        </div>
    </div>
  )
}

export default Navbar;