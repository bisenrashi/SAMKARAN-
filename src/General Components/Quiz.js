
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { act } from "react-dom/test-utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Result from "./Result";
function DefaultPagination(props) {
  const active = props.active;
  const setActive = props.setActive;
  const len = props.len;

  const getItemProps = (index) => ({
    className: active === index ? "bg-[#e3f5ec] text-[#404145] flex justify-center items-center" : "bg-white text-[#404145] flex justify-center items-center",
    color: active === index ? "lightBlue" : "gray",
    onClick: () => {
      if (typeof index === 'number') {
        setActive(index);
      }
    },
  });

  const next = () => {
    if (active === len) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const getPageNumbers = () => {
    const totalPagesToShow = 5; // Adjust the number of pages to show
    const currentPage = active;
    const totalPageCount = len;

    let start = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
    let end = Math.min(totalPageCount, start + totalPagesToShow - 1);

    if (totalPageCount - end <= Math.floor(totalPagesToShow / 2)) {
      start = Math.max(1, totalPageCount - totalPagesToShow + 1);
    }

    const pageNumbers = [];
    if (start > 1) {
      pageNumbers.push(1);
      if (start > 2) {
        pageNumbers.push("...");
      }
    }
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (end < totalPageCount) {
      if (end < totalPageCount - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPageCount);
    }

    return pageNumbers;
  };

  return (
    <div className="flex  items-center gap-2 lg:gap-4">
      <Button
        variant="text"
        className=" items-center gap-2 py-3 hidden lg:flex hover:bg-[#e3f5ec]"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {getPageNumbers().map((pageNumber, index) => (
          <IconButton

            key={index}
            {...getItemProps(pageNumber)}
          >
            {pageNumber}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="hidden lg:flex items-center gap-2 py-3 hover:bg-[#e3f5ec]"
        onClick={next}
        disabled={active === len}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default (props) => {
  const { questionList } = props;
  const [active, setActive] = React.useState(1);
  const initialAnswers = Array.from({ length: questionList.length }, (_, index) => ({
    question: index + 1,
    answerselect: 0
  }));
  const [answers, setAnswers] = useState(initialAnswers);
  const [select, setSelect] = useState(answers[active - 1]?.answerselect || 0);

  return (
    <>
      {active > questionList.length ? (<Result answer={answers} questionList={questionList} />)
        : (
          <>
            <div className="w-full flex  justify-between overflow-hidden p-3 lg:overflow-visible items-center py-5 shadow border-b h-[10vh]">
              <div className=" hidden lg:flex">
                <svg width="39" height="40" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.47819 4.47045C14.1142 1.7151 19.8858 1.7151 24.5218 4.47045V4.47045C28.9862 7.12379 31.7224 11.933 31.7224 17.1264V17.8736C31.7224 23.067 28.9862 27.8762 24.5218 30.5296V30.5296C19.8858 33.2849 14.1142 33.2849 9.47819 30.5296V30.5296C5.01378 27.8762 2.27757 23.067 2.27757 17.8736V17.1264C2.27757 11.933 5.01378 7.12379 9.47819 4.47045V4.47045Z" fill="#146BA1" />
                  <path d="M9.47819 4.47045C14.1142 1.7151 19.8858 1.7151 24.5218 4.47045V4.47045C28.9862 7.12379 31.7224 11.933 31.7224 17.1264V17.8736C31.7224 23.067 28.9862 27.8762 24.5218 30.5296V30.5296C19.8858 33.2849 14.1142 33.2849 9.47819 30.5296V30.5296C5.01378 27.8762 2.27757 23.067 2.27757 17.8736V17.1264C2.27757 11.933 5.01378 7.12379 9.47819 4.47045V4.47045Z" fill="#146BA1" />
                  <path d="M9.47819 4.47045C14.1142 1.7151 19.8858 1.7151 24.5218 4.47045V4.47045C28.9862 7.12379 31.7224 11.933 31.7224 17.1264V17.8736C31.7224 23.067 28.9862 27.8762 24.5218 30.5296V30.5296C19.8858 33.2849 14.1142 33.2849 9.47819 30.5296V30.5296C5.01378 27.8762 2.27757 23.067 2.27757 17.8736V17.1264C2.27757 11.933 5.01378 7.12379 9.47819 4.47045V4.47045Z" fill="#146BA1" />
                  <path d="M9.47819 4.47045C14.1142 1.7151 19.8858 1.7151 24.5218 4.47045V4.47045C28.9862 7.12379 31.7224 11.933 31.7224 17.1264V17.8736C31.7224 23.067 28.9862 27.8762 24.5218 30.5296V30.5296C19.8858 33.2849 14.1142 33.2849 9.47819 30.5296V30.5296C5.01378 27.8762 2.27757 23.067 2.27757 17.8736V17.1264C2.27757 11.933 5.01378 7.12379 9.47819 4.47045V4.47045Z" fill="#28B889" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4709 26.535L15.8292 23.2723L14.3205 18.9488C14.3205 18.9488 17.3078 17.9064 19.0943 17.283C20.8807 16.6596 23.9129 19.512 20.6784 21.8227L16.4611 23.2943C16.0339 23.9586 16.0753 24.5364 16.3086 25.6817L21.9609 23.7094C25.4862 21.655 25.7998 16.8226 21.5172 15.3767C23.2013 11.3005 21.2884 7.84817 16.5267 8.41852L10.3472 10.5748C9.62858 11.0605 9.46457 11.4595 9.44317 12.315L14.4709 26.535ZM13.5662 16.7871L12.0387 12.4096L17.281 10.5803C18.8625 10.0284 21.351 13.6766 18.8085 14.9579C16.266 16.2391 13.5662 16.7871 13.5662 16.7871Z" fill="white" />
                </svg>
              </div>
              <DefaultPagination active={active} setActive={setActive} len={questionList.length} />
              <div>

              </div>
            </div>
            <QuestionPage
              active={active}
              answer={answers}
              setAnswers={setAnswers}
              select={select}
              setSelect={setSelect}
              setActive={setActive}
              questionList={questionList}
            />
          </>
        )}
    </>
  );
};

const QuestionPage = (props) => {
  const { active, answer, setAnswers, setActive, questionList } = props;

  const Submit = (question, answerselect) => {

    if (answer[active - 1]?.answerselect > 0) {
      if (active === questionList.length) {
        setActive(questionList.length + 1);
      }
      else {
        const updatedAnswers = [...answer];
        updatedAnswers[question - 1] = { question, answerselect };
        setAnswers(updatedAnswers);
        setActive(props.active + 1);
      }

    }
    else {
      toast.warn('Please select an answer.');
    }

  };

  return (
    <>
      <div className="flex lg:flex-row flex-col justify-center items-center lg:h-[82vh] w-full">
        <div className=" w-full h-full flex flex-col justify-start items-start p-8 bg-[#e3f5ec]">
          <div className=" w-full flex justify-between py-4 text-lg text-[#28B889] font-semibold">
            <p>Question {props.active}.</p>
            <p>Marks : 1.00</p>
          </div>
          <p className=" text-lg text-[#28B889] font-normal">{questionList[props.active - 1].Question}</p>
        </div>
        <div className=" w-full h-full flex flex-col justify-start items-start p-8">
          <div className=" w-full flex justify-between py-4 text-lg text-[#28B889] font-semibold">
            <p>Answers :</p>

          </div>
          <div className=" flex flex-col w-full">
            {Object.entries(questionList[props.active - 1].Answers).map(([key, value], index) => (
              <li key={index} className="list-none mb-5">
                <label htmlFor={`option-${index + 1}`} className="flex justify-start items-center w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-[#28B889] peer-checked:ring-1 duration-200">
                  <input
                    id={`option-${index + 1}`}
                    type="radio"
                    onChange={() => {
                      setAnswers(prev => {
                        const updatedAnswers = [...prev];
                        updatedAnswers[active - 1] = { question: active, answerselect: index+1 };
                        return updatedAnswers;
                      });
                    }}
                    name="options"
                    checked={index+1 === answer[active - 1]?.answerselect}
                    className="hidden peer"
                  />
                  <div className="border peer-checked:border-[5px] peer-checked:border-[#28B889] w-4 h-4 rounded-full"></div>
                  <div className="ml-3">
                    <h3 className="leading-none text-[#28B889] font-medium">{value}</h3>
                  </div>
                </label>
              </li>
            ))}





          </div>

        </div>
      </div>
      <div className="w-full flex justify-between items-center shadow border-t lg:px-8 px-4 py-3 h-[8vh]">
        <button className="py-2 px-5 rounded bg-red-600 text-white font-semibold">Finish</button>
        <div className="font-bold text-gray-600 hidden lg:block">
          Question ID : {active}
        </div>
        <div>
          <button onClick={() => Submit(active, answer[active - 1]?.answerselect)} className={`py-2 px-5 rounded ${answer[active - 1]?.answerselect > 0 ? "bg-[#28B889]" : "bg-gray-400"} text-white font-semibold`}>Submit</button>
        </div>
      </div>
    </>
  );
};
