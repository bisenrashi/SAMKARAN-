import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { Branch, CGPA, Fields, programmingLanguages } from "../../General Components/Options";
import Quiz from "../../General Components/Quiz";
import Question from "../../General Components/Quiz";
import { toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import User from "../../General Components/Context";
const Page2 = () => {

  const [user, setUser] = useContext(User);
  const [isOpen, setIsOpen] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  useEffect(() => {
    const usersaved = localStorage.getItem('isQuesList');
    if (usersaved !== null) {
      setQuestionList(JSON.parse(usersaved));
    }
  }, []);
  return (
    <div className="">
      {
         !user?.isPre_assesment? (
          <>
            <Question questionList={questionList} />
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} setUser={setUser} user={user} questionList={questionList} setQuestionList={setQuestionList} />
          </>
        ) : (<> <Question questionList={questionList} /></>)
      }

    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen, questionList, setQuestionList, user ,setUser}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const Dropdowns = (props) => {

    const customStyles = {

      control: (provided) => ({
        ...provided,
        backgroundColor: '#f3f4f6', // Background color
        borderColor: '#e5e7eb', // Border color
        maxHeight: '40px',
        display: 'flex', // Use flex layout
        flexWrap: 'nowrap', // Prevent wrapping of items
        overflowX: 'auto', // Enable horizontal scrolling
        // Set a fixed height for the dropdown menu
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
    const selectedArray = Object.entries(selectedOptions).map(([field, selectedOption]) => ({
      field,
      selectedOption: Array.isArray(selectedOption) ? selectedOption.map(option => option.value) : selectedOption.value
    }));

    if (selectedArray.length === 0) {
      toast.warn("Please select atleast one option")
      return
    }
    console.log(selectedArray)
    set(ref(getDatabase(), `users/${user.userId}/profiledata/description`), selectedArray)
      .then(() => {
       setUser(prevState => ({ ...prevState, description: selectedArray}));
        toast.success('User data stored in the database.');
        return true


      })
      .catch((error) => {
        toast.error('Error storing user data.');
        return false
      });

    fetch('http://127.0.0.1:5000/genearte-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedArray)
    })
      .then(response => response.json())
      .then(data => {
        // Assuming data is the response from the server containing question list
        
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
                Education Background
              </h3>
              <div className=" w-full  grid grid-cols-2  pt-5 grid-rows-3">
                <Dropdowns name="Graduation Year" options={[{ value: "1st", label: "1st year" }, { value: "2nd", label: "2nd year" }, { value: "3rd", label: "3rd year" }, { value: "4th", label: "4th year" }]} />
                <Dropdowns name="Branch" options={Branch} />
                <Dropdowns name="CGPA" options={CGPA} />
                <Dropdowns name="Interested Fields" options={Fields} ismulti={true} />
                <Dropdowns name="Programming Language" options={programmingLanguages} ismulti={true} />
                <Dropdowns name="Select your knowledge level" options={[{ value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" },]} />

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

export default Page2;