import React, { useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginState } from './Structure';
import { useNavigate } from 'react-router-dom';
import { app } from '../Firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { getDatabase, ref, set, get } from 'firebase/database';
import User from './Context';
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


export default function Login() {
    const [user, setUser] = useContext(User);  
    const [error, setError] = useState("")
    const navigate = useNavigate();



    const isValidCloudBurstUsername = (username) => {
        if (username.length < 3) {
            return "Username must be at least 3 characters long.";
        }
        const validCharactersRegex = /^[a-zA-Z0-9_]+$/;
        if (!validCharactersRegex.test(username)) {
            return "Username can only contain letters, numbers, and underscores.";
        }
        return "";
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === "username") {
            const error = isValidCloudBurstUsername(value);
            setError(error);
        }
        setUser(prevUser => ({
            ...prevUser,
            [id]: value
        }));
    };

    const handleSignUp = () => {
        const dbRef = ref(getDatabase(), 'users/userNames');
        get(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // If the node exists, concatenate the new username to the existing string
                    const existingUsernames = snapshot.val();
                    const updatedUsernames = existingUsernames ? existingUsernames + ', ' + user.username : user.username;

                    // Update the database with the updated string
                    set(dbRef, updatedUsernames)
                        .then(() => {

                        })
                        .catch((error) => {

                        });
                } else {
                    // If the node does not exist, set it to the new username
                    set(dbRef, user.username)
                        .then(() => {

                        })
                        .catch((error) => {
                            toast.error('Error storing username: ' + error.message);
                        });
                }
            })
            .catch((error) => {
                toast.error('Error fetching existing usernames: ' + error.message);
            });
    };
    const handleCreateUser = async (navigate) => {
        const time = new Date();
        const name = user.name;
        const username= user.username;
        const result = await isValidData(user.username);
        if (!user.name && !user.username) {
            toast.warn("Please fill all fields!")
        }
        if (result) {
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    const user = result.user;
                    const userId = user.uid + "&" + username + "%" + name + "@" + time.getTime();
                    const userRef = ref(getDatabase(), `users/${userId.toLowerCase().replace(/\s+/g, '')}/profiledata`);
                    get(userRef)
                        .then((snapshot) => {
                            if (snapshot.val() == null) {
                               

                                    const userData = {
                                        name,
                                        username
                                    };
                                    handleSignUp(user.username)
                                    set(ref(getDatabase(), `users/${userId.toLowerCase().replace(/\s+/g, '')}/profiledata`), userData)
                                        .then(() => {
                                            toast.success('User data stored in the database.');
                                            
                                            setUser({login:true})
                                            navigate("/")
                                            return true
                                            

                                        })
                                        .catch((error) => {
                                            toast.error('Error storing user data.');
                                            return false
                                        });


                              
                            }
                            else {
                                toast.error('Already exists,Continue to login');
                            }
                        })
                        .catch((error) => {
                            toast.error('Error checking user data: ' + error.message);
                        });
                })
                .catch((error) => {
                    toast.error('Google Sign In Error: ' + error.message);

                });
        }

    };

    const isValidData = async (username) => {
        try {
            const dbRef = ref(getDatabase(), 'users/userNames');
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const existingUsernames = snapshot.val();
                if (existingUsernames.includes(username)) {
                    toast.warn('Username already exists!');
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } catch (error) {
            toast.error('Error fetching existing usernames: ' + error.message);
            return false;
        }
    };
    const login = (navigate) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const userId = user.uid;

                const usersRef = ref(getDatabase(), 'users');

                get(usersRef)
                    .then((snapshot) => {

                        let userFound = false;
                        snapshot.forEach((childSnapshot) => {
                            const nodeName = childSnapshot.key;
                            const uid = nodeName.split('&')[0];

                            if (uid === userId.toLowerCase()) {
                                userFound = true;

                            }
                        });

                        if (userFound) {
                          
                            setUser({login:true})
                            navigate("/")
                            return true
                        } else {
                            toast.warn("User not found!!");
                            return false
                        }
                    })
                    .catch((error) => {
                        toast.error('Error fetching users: ' + error.message);
                    });
            })
            .catch((error) => {
                // Error occurred while signing in
                toast.error('Error signing in: ' + error.message);
            });

    };



    return (
        <main className="w-full flex">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">

                <video className=' w-full h-screen object-cover' autoPlay loop muted src='images/WhatsApp Video 2024-02-16 at 4.41.41 PM.mp4' />

            </div>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-[#28B889] text-2xl font-bold sm:text-3xl">Sign up</h3>
                            <p className="">Already have an account? <a onClick={() => login(navigate)} className="font-medium text-[#28B889] hover:text-slate-950 cursor-pointer">Log in</a></p>
                        </div>
                    </div>

                    <style>
                        {`.btn-login{
                            background: linear-gradient(90deg, #1AB69D 0%, #31B978 100%);
                            box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.05);
                        }`}
                    </style>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-5"
                    >
                        <div>
                            <label className="font-medium">
                                Username
                            </label>
                            <input
                                value={user.username}
                                onChange={handleChange}
                                id='username'
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-slate-950 shadow-sm rounded-lg"
                            />
                            <h1 className=' text-red-600 text-sm font-medium'>{error}</h1>
                        </div>
                        <div>
                            <label className="font-medium">
                                Name
                            </label>
                            <input
                                value={user.name}
                                onChange={handleChange}
                                id='name'
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-slate-950 shadow-sm rounded-lg"
                            />
                        </div>

                        <button onClick={() => handleCreateUser(navigate)}
                            className="w-full px-4 py-2 btn-login text-white font-medium  bg-green hover:border-green-600 rounded-lg duration-150"
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>

        </main>
    )
}

