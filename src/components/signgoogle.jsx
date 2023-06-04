import googleLogo from "../assets/google.png";
import { doc, setDoc } from "firebase/firestore";

import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const db = firebase.firestore();

function SignIn() {
    const Navigate = useNavigate();
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(async (result) => {
            if (result.additionalUserInfo.isNewUser) {
                const user = result.user;

                await setDoc(doc(db, "users", user.uid), {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    uid: user.uid
                });
                await setDoc(doc(db, "userChats", user.uid), {});
                Navigate('/chat');
            }
            else{
                Navigate('/login');
            }
            Cookies.set('loggedin', 'true');
        }).catch((error) => {
            console.log(error);
        }
        );
    }
    return (
        <div onClick={signInWithGoogle}
            className="inline-block text-gray-800 w-48 rounded py-2 px-4 border border-gray-300 shadow whitespace-nowrap hover:cursor-pointer"
        >
            <span style={{ backgroundImage: `url(${googleLogo})` }} className="inline-block align-middle bg-cover bg-center ml-1 w-9 h-9"></span>

            <span className="buttonText inline-block align-middle px-10 text-lg font-bold font-roboto">
                Google
            </span>
        </div>
    )
}

export default SignIn;