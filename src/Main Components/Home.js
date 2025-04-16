import React, { useContext } from 'react'
import HeroSection from './HeroSection'
import Navigation from '../General Components/Navigation'
import Page1 from './Content/Page1'
import { AnimatePresence, motion } from "framer-motion";
import User from '../General Components/Context'
import Footer from '../General Components/Footer';
import Youtube from '../General Components/Youtube';
export default function Home() {
  const[user,setUser]= useContext(User)
  
  return (
    <>
    
      <>
      
      <div className='bg w-full h-screen flex flex-col'>
        <style>
          {`

        .bg{
          background-image: url("images/banner-bg.webp");
          background-repeat: no-repeat;
          background-size: cover;
        }
        `}
        </style>
        <Navigation />
        <HeroSection />

      </div>
      <Page1 />
     
      <Footer/></>

    
   
    </>

  )
}
const variants = {
  initial: {
      scaleY: 0.5,
      opacity: 0,
  },
  animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "circIn",
      },
  },
};

const BarLoader = () => {
  return (
      <motion.div
          transition={{
              staggerChildren: 0.25,
          }}
          initial="initial"
          animate="animate"
          className="flex gap-1"
      >
          <motion.div variants={variants} className="h-16 w-2 bg-[#28B889]" />
          <motion.div variants={variants} className="h-16 w-2 bg-[#28B889]" />
          <motion.div variants={variants} className="h-16 w-2 bg-[#28B889]" />
          <motion.div variants={variants} className="h-16 w-2 bg-[#28B889]" />
          <motion.div variants={variants} className="h-16 w-2 bg-[#28B889]" />
          <motion.div variants={variants} className="h-16 w-2 bg-[#28B889]" />
          <motion.div variants={variants} className="h-16 w-2 bg-[#28B889]" />
      </motion.div>
  );
};