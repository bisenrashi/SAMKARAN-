import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import User from './Context';
import { getDatabase, ref, set } from "firebase/database";
export default function Result(props) {
  const navigation = useNavigate();
  const[user,setUser]= useContext(User)

  const { answer ,questionList} = props;
  console.log(answer,questionList)
  const answerCount = answer.filter(answer => answer.answerselect > 0).length;
  const correctAnswer = answer.filter(answer => {
    const correctNumericAnswer = {
      A: 1,
      B: 2,
      C: 3,
      D: 4
    }[questionList[answer.question - 1].Correct_Answer];
  
    // Check if user-selected answer matches the correct answer
    return answer.answerselect === correctNumericAnswer;
  }).length;
  
  const [select, setSelect] = useState(0);
  const options = [
    {
      label: "I really Loved it🥳!",
      value: 1,
    },
    {
      label: "It was nice🙂!",
      value: 2,
    },
    {
      label: "Expected more😐!",
      value: 3,
    },
    {
      label: "Didn't enjoy it☹️!",
      value: 4,
    },
    {
      label: "It was poor😞",
      value: 5,
    },
  ];

  const handleSubmit = () => {
    
     const payload={
      "answers":answer,
      "questions":questionList,
      "fields":user?.description
     }
    fetch('http://127.0.0.1:5000/generate-path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        set(ref(getDatabase(), `users/${user.userId}/profiledata/path`), data.path)
        .then(() => {
         setUser(prevState => ({ ...prevState, path: data.path}));
          toast.success('User data stored in the database.');
          return true
  
  
        })
        .catch((error) => {
          toast.error('Error storing user data.');
          return false
        });
        toast.success("Submitted!")
        navigation('/');
      })
      .catch(error => console.error('Error fetching courses:', error));

 
    
  }

  return (
    <>
      <div className="flex lg:flex-row flex-col justify-center items-center lg:h-[100vh] w-full">
        <div className=" w-full h-full flex flex-col justify-start items-start lg:pl-20 p-8  bg-[#e3f5ec]">
          <div>
            <svg width="39" height="40" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.47819 4.47045C14.1142 1.7151 19.8858 1.7151 24.5218 4.47045V4.47045C28.9862 7.12379 31.7224 11.933 31.7224 17.1264V17.8736C31.7224 23.067 28.9862 27.8762 24.5218 30.5296V30.5296C19.8858 33.2849 14.1142 33.2849 9.47819 30.5296V30.5296C5.01378 27.8762 2.27757 23.067 2.27757 17.8736V17.1264C2.27757 11.933 5.01378 7.12379 9.47819 4.47045V4.47045Z" fill="#146BA1" />
              <path d="M9.47819 4.47045C14.1142 1.7151 19.8858 1.7151 24.5218 4.47045V4.47045C28.9862 7.12379 31.7224 11.933 31.7224 17.1264V17.8736C31.7224 23.067 28.9862 27.8762 24.5218 30.5296V30.5296C19.8858 33.2849 14.1142 33.2849 9.47819 30.5296V30.5296C5.01378 27.8762 2.27757 23.067 2.27757 17.8736V17.1264C2.27757 11.933 5.01378 7.12379 9.47819 4.47045V4.47045Z" fill="#146BA1" />
              <path d="M9.47819 4.47045C14.1142 1.7151 19.8858 1.7151 24.5218 4.47045V4.47045C28.9862 7.12379 31.7224 11.933 31.7224 17.1264V17.8736C31.7224 23.067 28.9862 27.8762 24.5218 30.5296V30.5296C19.8858 33.2849 14.1142 33.2849 9.47819 30.5296V30.5296C5.01378 27.8762 2.27757 23.067 2.27757 17.8736V17.1264C2.27757 11.933 5.01378 7.12379 9.47819 4.47045V4.47045Z" fill="#146BA1" />
              <path d="M9.47819 4.47045C14.1142 1.7151 19.8858 1.7151 24.5218 4.47045V4.47045C28.9862 7.12379 31.7224 11.933 31.7224 17.1264V17.8736C31.7224 23.067 28.9862 27.8762 24.5218 30.5296V30.5296C19.8858 33.2849 14.1142 33.2849 9.47819 30.5296V30.5296C5.01378 27.8762 2.27757 23.067 2.27757 17.8736V17.1264C2.27757 11.933 5.01378 7.12379 9.47819 4.47045V4.47045Z" fill="#28B889" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4709 26.535L15.8292 23.2723L14.3205 18.9488C14.3205 18.9488 17.3078 17.9064 19.0943 17.283C20.8807 16.6596 23.9129 19.512 20.6784 21.8227L16.4611 23.2943C16.0339 23.9586 16.0753 24.5364 16.3086 25.6817L21.9609 23.7094C25.4862 21.655 25.7998 16.8226 21.5172 15.3767C23.2013 11.3005 21.2884 7.84817 16.5267 8.41852L10.3472 10.5748C9.62858 11.0605 9.46457 11.4595 9.44317 12.315L14.4709 26.535ZM13.5662 16.7871L12.0387 12.4096L17.281 10.5803C18.8625 10.0284 21.351 13.6766 18.8085 14.9579C16.266 16.2391 13.5662 16.7871 13.5662 16.7871Z" fill="white" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl mt-12 font-normal text-[#28B889]">Assesment Complete!</h1>
          </div>
          <div>
            <h1 className="text-3xl font-semibold mt-1 text-[#28B889]">You've Reached the Finish Line!</h1>
          </div>
          <div className=' flex justify-start lg:items-center lg:space-x-8 py-5 lg:space-y-0 space-y-5 lg:my-12 w-full  lg:flex-row flex-col border-t border-b text-lg text-[#28B889] border-[#9ef4d7]'>
            <div className=' flex flex-col justify-start items-start'>
              <h1 className=' font-medium'> Questions :</h1>
              <p className=' font-normal'>{answer.length}</p>
            </div>
            <div className=' flex flex-col justify-start items-start'>
              <h1 className=' font-medium'> Attempted :</h1>
              <p className=' font-normal'>{answerCount}</p>
            </div>
            <div className=' flex flex-col justify-start items-start'>
              <h1 className=' font-medium'> Not Attempted :</h1>
              <p className=' font-normal'>{answer.length-answerCount}</p>
            </div>
            <div className=' flex flex-col justify-start items-start'>
              <h1 className=' font-medium'> Correct Answers:</h1>
              <p className=' font-normal'>{correctAnswer}</p>
            </div>
          </div>
          <div className='text-[#28B889] flex justify-start items-start py-5 flex-col space-y-5'>
            <h1 className=' font-medium text-3xl'> Thank You,</h1>
            <p className=' font-normal'>
              We sincerely appreciate your time and effort in completing this assessment. Your valuable input and feedback are crucial in helping us improve and grow.

            </p>
            <p className=' font-normal'>
              If you have any additional comments or suggestions, please feel free to share them with us in the comments section. Your input is highly valued

            </p>
            <p className=' font-normal'>
              Once again, thank you for your participation and support, We look forward to having you again soon.
            </p>
          </div>
        </div>
        <div className=" w-full h-full flex flex-col justify-start items-start ">
          <div className=" w-full flex border-b  px-8  text-2xl h-[12vh]  justify-start items-center shadow text-[#28B889] font-normal">
            <p>Assesment FeedBack</p>

          </div>
          <div className=" flex flex-col w-full p-8">
            {options.map((option, index) => (
              <li key={index} className="list-none mb-3">
                <label htmlFor={`option-${index + 1}`} className="flex justify-start items-center w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-[#28B889] peer-checked:ring-1 duration-200">
                  <input id={`option-${index + 1}`} type="radio" onChange={() => {
                    setSelect(index + 1);
                  }}
                    name="options" checked={index + 1 === select}
                    className="hidden peer" />
                  <div className="border peer-checked:border-[5px] peer-checked:border-[#28B889] w-4 h-4 rounded-full"></div>
                  <div className="ml-3">
                    <h3 className="leading-none text-[#28B889] font-medium">{option.label}</h3>
                  </div>
                </label>
              </li>
            ))}




          </div>
          <div className=' w-full p-8 flex justify-end'>
          <button onClick={handleSubmit} className={`py-2 px-5 rounded ${select>0 ? "bg-[#28B889]" : "bg-gray-400"} text-white font-semibold`}>Submit</button>
        </div>
        </div>
      </div>

    </>
  )
}
