import Cookies from "js-cookie";
import firebase from "../firebase";
import {FacebookAuthProvider} from "firebase/auth";

function SignInWithFacebook() {
    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            Cookies.set('loggedin', 'true');
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div
            onClick={signInWithFacebook}
            className="inline-block text-white w-48 rounded py-4 px-4 bg-blue-600 shadow whitespace-nowrap hover:cursor-pointer"
        >
            <span>Sign in with Facebook</span>
        </div>
    )
}

export default SignInWithFacebook;
