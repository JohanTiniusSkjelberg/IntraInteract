import { useState, useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import firebase from "../firebase";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function Header({ landingPage }) {
    const [openNav, setOpenNav] = useState(false);

    const navigate = useNavigate();

    function logout() {
        firebase.auth().signOut().then(() => {
            Cookies.remove('loggedin');
            navigate('/')
        })
    }
    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/" className="flex items-center">
                    Home
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Account
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/chat" className="flex items-center">
                    Chats
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Docs
                </a>
            </Typography>
        </ul>
    );

    return (
        <Navbar className="mx-auto py-2 px-4 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <a href="/">
                    <div className="text-blue-600 font-bold flex gap-2 pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                            <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                        </svg>
                        IntraInteract
                    </div>
                </a>
                <div className="flex">
                    <div className="hidden pr-4 lg:block">{navList}</div>
                    {(landingPage && (
                        <div>
                            <a href="/register">
                                <Button variant="outlined" size="sm" className="mr-1 hidden lg:inline-block">
                                    <span >Register</span>
                                </Button>
                            </a>
                            <a href="/login">
                                <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                                    <span>Login</span>
                                </Button>
                            </a>
                        </div>

                    ))}
                    {(!landingPage && (
                        <Button onClick={logout} variant="outlined" size="sm" className="mr-1 hidden lg:inline-block">
                            <span>Log Out</span>
                        </Button>
                    ))}
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}
                    {(landingPage && (
                        <div>
                            <a href="/register">
                                <Button variant="outlined" size="sm" fullWidth className="mb-2">
                                    <span >Register</span>
                                </Button>
                            </a>
                            <a href="/login">
                                <Button variant="gradient" size="sm" fullWidth className="mb-2">
                                    <span>Login</span>
                                </Button>
                            </a>
                        </div>

                    ))}
                    {(!landingPage && (
                        <Button onClick={logout} variant="outlined" size="sm" fullWidth className="mb-2">
                            <span>Log Out</span>
                        </Button>
                    ))}
                </div>
            </Collapse>
        </Navbar>
    );
}