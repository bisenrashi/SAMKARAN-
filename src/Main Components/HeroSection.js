import { AnimatePresence, motion } from "framer-motion";
import { Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, set } from "firebase/database";
import{toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import { Link as Links } from 'react-scroll';
import User from '../General Components/Context';
export default function HeroSection() {
  const [questionList, setQuestionList] = useState([]);
  const[user,setUser]= useContext(User)
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const usersaved = localStorage.getItem('isQuesList');
    if (usersaved !== null) {
      console.log(JSON.parse(usersaved));
      setQuestionList(JSON.parse(usersaved));
    }
  }, []);
  return (
    <div className=' w-full flex flex-col lg:space-y-8 space-y-8 px-4 lg:justify-center py-20 items-center h-screen z-10'>

<p className=' lg:text-5xl text-3xl font-bold '>
<span className='text-white'>
    Perfect for </span><span className=' text-[#E84C61]  rounded-full mx-2 border-[#2C2F3C] lg:px-4 lg:py-2 px-2 py-0.5 border-2'>Careers </span><span className='text-[#F8B81F]'>& </span><span className=' text-[#28B889]  rounded-full mx-2 border-[#2C2F3C] lg:px-4 lg:py-2 px-2 py-0.5 border-2'>Jobs </span><span className=' text-white'>Diverse Content</span>
</p>
<p className=' lg:text-5xl text-3xl font-bold text-white'>
Innovative Software
</p>

<p className=' text-lg text-white font-semibold'>AI <span className=' text-[#9A9DA3]'>Learning Path Generation Models</span>, Online Learning Resourses and bunch of notes <span className=' text-[#9A9DA3]'>For All</span></p>
{
  !user.code && <Button onClick={()=>setIsOpen(true)} className=' border-[#28B889] bg-transparent text-white border-2 lg:text-xl text-md mt-4'>Enter Code</Button>
}


<SpringModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
    </div>
  )
}
const SpringModal = ({ isOpen, setIsOpen, questionList, setQuestionList, user ,setUser}) => {


  const handleSubmit = () => {
    const code = document.getElementById('code').value;
const dataSend={
code,
}
set(ref(getDatabase(), `users/${user.userId}/profiledata/code`),dataSend)
.then(() => {
  toast.success('User data stored in the database.');

  setIsOpen(false);

})
.catch((error) => {
  toast.error('Error storing user data.'+error);
 
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
            className="bg-[#28B889] text-white lg:p-6 p-3 rounded-lg lg:w-3/4 w-full  shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative w-full h-full z-10">
              <h3 className="lg:text-3xl text-xl font-bold text-left mb-2">
                Enter Code
              </h3>
              <input id='code' placeholder='Enter unique Code' className=' placeholder-white border-white border-2 my-10 outline-none px-5 py-2 rounded bg-transparent text-white font-medium'/>
         
              <div className="flex justify-end items-end py-5  w-full  ">

                <button
 onClick={()=>setIsOpen(false)}
                  className="bg-transparent px-3 hover:bg-white/10 lg:mr-5 transition-colors flex justify-center items-center text-white font-semibold  py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-white  transition-opacity lg:mr-5 text-[#28B889] font-semibold px-5 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};