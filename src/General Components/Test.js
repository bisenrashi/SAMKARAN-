import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Select from 'react-select';
import { difficultyLevels, interestLevels, knowledgeLevels, learningStyles, practiceTimes, priorExperienceOptions, } from "./Options";
import Question from './Quiz'
import { toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import User from "./Context";
const Test = () => {
    const location = useLocation()
    const data = location.state
    console.log(data)
    const [user, setUser] = useContext(User);
    const [isOpen, setIsOpen] = useState(true);
    const [questionList, setQuestionList] = useState([]);

    return (
        <div className="">
            {
                questionList.length === 0 ? (<div className=" justify-center items-center h-screen z-10 bg-white bg-opacity-45 flex-col space-y-4 flex w-full"><BarLoader />
                    <h1 className=" font-semibold text-sm text-black">Generating questions....</h1></div>) : (<><Question questionList={questionList} /></>)
            }

            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} data={data} questionList={questionList} setQuestionList={setQuestionList} />



        </div>
    );
};

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
const SpringModal = ({ isOpen, setIsOpen, questionList, setQuestionList, user, data }) => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const Dropdowns = (props) => {

        const customStyles = {

            control: (provided) => ({
                ...provided,
                backgroundColor: '#f3f4f6',
                borderColor: '#e5e7eb',
                maxHeight: '40px',
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'auto',
            }),

            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#28B889' : 'white', // Background color when option is selected
                color: state.isSelected ? 'white' : '#28B889', // Text color
            }),
        };
        const handleSelectChange = (selectedOption, name) => {

            setSelectedOptions(prevState => ({
                ...prevState,
                [name]: selectedOption
            }));
        };


        return (
            <div className="lg:mb-4 lg:mr-5 mr-3">
                <h4 className="lg:text-lg text-md font-semibold mb-1">{props.name}</h4>
                <Select
                    isMulti={props.ismulti}
                    options={props.options}
                    value={selectedOptions[props.name] || []}
                    styles={customStyles}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, props.name)}
                />
            </div>);
    }

    const handleSubmit = () => {
        const url = data.url;

    

        const selectedArray = Object.entries(selectedOptions).map(([field, selectedOption]) => ({
            field,
            selectedOption: Array.isArray(selectedOption) ? selectedOption.map(option => option.value) : selectedOption.value
        }));

        if (selectedArray.length === 0) {
            toast.warn("Please select atleast one option")
            return
        }
        const payload = {
            url: url,
            selectedOptions: selectedArray
        }
        fetch('http://127.0.0.1:5000/genearte-questions-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {

                setQuestionList(data?.questions);
            })
            .catch(error => console.error('Error fetching courses:', error));

        setIsOpen(false);
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
                                {data?.title}
                            </h3>
                            <div className=" w-full  grid grid-cols-2  pt-5 grid-rows-3">
                                <Dropdowns name="Knowledge Levels" options={knowledgeLevels} />
                                <Dropdowns name="Interest Levels" options={interestLevels} />
                                <Dropdowns name="Practice Times" options={practiceTimes} />
                                <Dropdowns name="Learning Styles" options={learningStyles} />
                                <Dropdowns name="Difficulty Levels" options={difficultyLevels} />
                                <Dropdowns name="Prior Experience " options={priorExperienceOptions} />


                            </div>
                            <div className="flex justify-end items-end py-5  w-full  ">

                                <Link to={"/"}

                                    className="bg-transparent px-3 hover:bg-white/10 lg:mr-5 transition-colors flex justify-center items-center text-white font-semibold  py-2 rounded"
                                >
                                    Cancel
                                </Link>
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

export default Test;