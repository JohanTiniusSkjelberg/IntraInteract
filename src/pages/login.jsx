import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";
import SignIn from "../components/signgoogle";
import Header from "../components/header";
import Cookies from "js-cookie";

function Login() {
    const [err, setErr] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginEmail = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    Cookies.set('loggedin', 'true');
                    navigate('/chat');
                })
        }
        catch (err) {
            setErr("Wrong email or password");
        }
    }
    return (
        <div className='h-screen flex flex-col bg-gray-bg1'>
            <Header landingPage={false} />
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>
                {err && <p className="text-red-500 mb-4">{err}</p>}
                <form onSubmit={loginEmail}>
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
                        <p className="text-xs pb-2">Demo: Jonas.svendsen@hotmail.com | test1234</p>
                        <span className=""><a className="underline" href="/register">New to the website? Sign up now.</a></span>
                    </div>
                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`bg-green py-2 px-4 text-sm text-black rounded border border-black border-2`}
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="flex flex-col items-center justify-center mt-2 gap-2">
                    <h2>Login with: </h2>
                    <SignIn />
                </div>
            </div>
        </div>
    );
}

export default Login;