import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLoginState } from './Structure';
import { AnimatePresence, motion } from "framer-motion";
import User from './Context';
import { app } from '../Firebase';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
const auth = getAuth();
export default () => {
    const [user, setUser] = useContext(User);
    const [state, setState] = useState(false)
    const [profile, setProfile] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Resourses", path: "resources" },

        { title: "Interaction", path: "interaction" },

        { title: "FAQ", path: "faq" }
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };


    }, [])


    return (<>
        <nav className={` bg-transparent  border-b nav-1  w-full z-40 md:text-sm ${state ? "shadow-lg rounded-xl border  mt-2 md:shadow-none md:border-none  md:mt-0" : ""}`}>


            <div className="lg:gap-x-14 items-center  w-full mx-auto pr-4 pl-4 lg:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <Link className='cursor-pointer text-3xl text-white font-bold' to={"home"}>
                      Samkaran







                    </Link>
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0  md:flex ${state ? 'block' : 'hidden'} `}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="  text-white text-lg cursor-pointer font-semibold  hover:text-[#29B888] px-3 rounded py-1.5">
                                        <Link smooth={true} duration={2000} to={item.path} className="block">
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }

                    </ul>
                    <style>
                        {`.btn-login{
                background: linear-gradient(90deg, #1AB69D 0%, #31B978 100%);
                box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.05);
            }`}
                    </style>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 my-3 lg:my-0 md:flex md:space-y-0 md:mt-0">
                        {!user.login ? (
                            <Link to='login' smooth={true} duration={2000} className="flex btn-login cursor-pointer items-center font-semibold justify-center gap-x-1 py-2.5 px-6  text-white  text-lg   bg-bg-logo   rounded md:inline-flex">
                                Login

                            </Link>) : (<><img src='/images/WhatsApp Image 2024-02-18 at 9.51.19 AM.jpeg' onClick={() => setIsOpen(!isOpen)} className=' cursor-pointer w-10 h-10 rounded-full' />
                            </>)
                        }
                    </div>
                </div>
            </div>
        </nav>
        <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} setUser={setUser} />
    </>

    )
}
const SpringModal = (props) => {

    const { isOpen, setIsOpen, user, setUser } = props;
    const handleLogout = () => {
        auth.signOut().then(() => {

            toast.success('User signed out successfully');
            setUser({ login: false })
            setIsOpen(!isOpen)
            // You can perform additional actions after sign out if needed
        }).catch((error) => {
            toast.error('Error signing out:', error);
        });
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur lg:p-8 p-3 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#28B889] text-white lg:p-6 p-3 rounded-lg lg:w-2/4 w-full  shadow-xl cursor-default relative overflow-hidden"
                    >
                        <div className="relative w-full h-full z-10">
                            <h3 className="lg:text-3xl text-xl font-bold text-left mb-2">
                                Profile
                            </h3>
                            <div className=" w-full  grid grid-cols-2 gap-5  pt-5 grid-rows-3">
                                <div>
                                    <h4 className="text-md font-normal">Name</h4>
                                    <p className="text-gray-100 text-2xl font-semibold">{user.name}</p>
                                </div>
                                <div>
                                    <h4 className="text-md font-normal">User Name</h4>
                                    <p className="text-gray-100 text-2xl font-semibold">{user.username}</p>
                                </div>
                                {user.description && <><div>
                                    <h4 className="text-md font-normal">Graduation Year</h4>
                                    <p className="text-gray-100 text-2xl font-semibold">{user.description[0]?.selectedOption || null}</p>
                                </div>
                                    <div>
                                        <h4 className="text-md font-normal">CGPA</h4>
                                        <p className="text-gray-100 text-2xl font-semibold">{user.description[1]?.selectedOption || null}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-normal">Branch</h4>
                                        <p className="text-gray-100 text-2xl font-semibold">{user.description[2]?.selectedOption || null}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-normal">Interest</h4>
                                        <p className="text-gray-100 text-2xl font-semibold">{user.description[3]?.selectedOption || null}</p>
                                    </div>  </>}
                            </div>
                            <div className="flex justify-end items-end pt-10  w-full  ">

                                <button
                                    onClick={handleLogout}
                                    className="bg-transparent px-3 hover:bg-white/10 lg:mr-5 transition-colors flex justify-center items-center text-white font-semibold  py-2 rounded"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="bg-white  transition-opacity lg:mr-5 text-[#28B889] font-semibold px-5 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};