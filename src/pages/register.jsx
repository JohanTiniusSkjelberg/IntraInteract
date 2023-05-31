import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from 'firebase/firestore';
import SignIn from "../components/signgoogle";
import SignInWithFacebook from "../components/signfacebook";

import firebase from "../firebase";
import Header from "../components/header";
import Cookies from "js-cookie";
const db = firebase.firestore();

function Register() {
    const [err, setErr] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    const navigate = useNavigate();

    const registerEmail = async (e) => {
        e.preventDefault();

        function getInitials(name) {
            let parts = name.split(' ');
            let initials = parts[0][0] + (parts.length > 1 ? parts[1][0] : '');
            return initials.toUpperCase();
        }

        function getAvatarUrl(name, color) {
            let initials = getInitials(name);
            console.log(initials);
            return `https://via.placeholder.com/150/${color}/FFFFFF?text=${initials}`;
        }
        function getRandomColor() {
            let colors = ['C6F6D5', 'BFDBFE', 'C7D2FE', 'FED7E2', 'D8B4FE'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        let displayName = firstname + ' ' + lastname;
        displayName = toTitleCase(displayName);
        const url = getAvatarUrl(displayName,getRandomColor());
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            var user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                displayName: displayName,
                photoURL: url,
                email: email,
                uid: user.uid
            });
            await setDoc(doc(db, "userChats", user.uid), {});

            await user.updateProfile({
                displayName: displayName,
                photoURL: url
            })
            Cookies.set('loggedin', 'true');
            navigate('/chat');
        }
        catch (err) {
            if (err && err.customData && err.customData._tokenResponse && err.customData._tokenResponse.error && err.customData._tokenResponse.error.message === "EMAIL_EXISTS") {
                setErr("Email already exists");
            }
            else if (err && err.code === "auth/weak-password") {
                setErr("Weak Password");
            }
            else {
                console.error(err); // or some other general error handling
            }
        }
    }
    return (
        <div className='h-screen flex flex-col bg-gray-bg1'>
            <Header landingPage={false} />
            <div className='w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Register your account 🔑
                </h1>
                {err && <span className='text-red-600'>{err}</span>}
                <form onSubmit={registerEmail}>
                    <div className='flex justify-between gap-3'>
                        <div className='w-full'>
                            <label htmlFor='firstname'>First Name</label>
                            <input
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                type='text'
                                className={`w-full p-2 text-primary border-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='firstname'
                                placeholder='Your First Name'
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor='lastname'>Last Name</label>
                            <input
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                type='text'
                                className={`w-full p-2 text-primary border-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='lastname'
                                placeholder='Your Last Name'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            value={email}
                            type='email'
                            className={`w-full p-2 text-primary border-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            value={password}
                            type='password'
                            className={`w-full p-2 text-primary border-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <span className=""><a className="underline" href="/login">Already have an account? Login here</a></span>
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`bg-green py-2 px-4 text-sm text-black rounded border border-black border-2`}
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="flex flex-col items-center justify-center mt-2 gap-2">
                    <h2>OR Sign in with: </h2>
                    <div className="flex gap-2 items-center">
                    <SignIn />
                    <SignInWithFacebook />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
