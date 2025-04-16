import React, { useState, useEffect, useContext } from 'react';
import { CardDefault } from '../../General Components/Card';
import User from '../../General Components/Context';
import { Card } from '@material-tailwind/react';
import Youtube from '../../General Components/Youtube';
import { Link } from 'react-router-dom';

export default function Page1() {

  const [user, setUser] = useContext(User);
  const syllabus = {
    "Number System": {
      "Topics": [
        "Real Numbers",
        "Rational and Irrational Numbers",
        "Laws of Exponents"
      ]
    },
    "Algebra": {
      "Topics": [
        "Polynomials",
        "Linear Equations in Two Variables",
        "Quadratic Equations",
        "Arithmetic Progressions",
        "Logarithms",
        "Matrices and Determinants"
      ]
    },
    "Coordinate Geometry": {
      "Topics": [
        "Cartesian Coordinates",
        "Straight Lines",
        "Circles",
        "Conic Sections (Optional)"
      ]
    },
    "Geometry": {
      "Topics": [
        "Triangles",
        "Circles",
        "Quadrilaterals",
        "Areas and Volumes",
        "Coordinate Geometry in Two Dimensions"
      ]
    },
    "Trigonometry": {
      "Topics": [
        "Trigonometric Ratios and Identities",
        "Heights and Distances",
        "Trigonometric Functions"
      ]
    },
    "Calculus": {
      "Topics": [
        "Functions",
        "Limits and Derivatives",
        "Continuity and Differentiability",
        "Applications of Derivatives",
        "Integration",
        "Applications of Integrals"
      ]
    },
    "Statistics and Probability": {
      "Topics": [
        "Statistics: Mean, Median, Mode, Variance, Standard Deviation",
        "Probability: Basic Concepts, Conditional Probability, Random Variables, Probability Distributions"
      ]
    },
    "Mathematical_Reasoning": {
      "Topics": []
    }
  };
  const Item = (props) => {
    const [courses, setCourses] = useState([]);

    const [login, setLogin] = useState(false);


    useEffect(() => {
      if (user.login) {
        setLogin(true);
      }
    }, [user.login]);

    useEffect(() => {
      const dataSend = {
        interest: props.keyword || 'Computer Science',
      };

      if (login) {
        fetch('http://127.0.0.1:5000/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataSend)
        })
          .then(response => response.json())
          .then(data => {
            if (data) {
              setCourses(data);
            }
          })
          .catch(error => console.error('Error fetching courses:', error));
      }
    }, [login]);

    const truncateDescription = description => {
      const words = description.split(' ');
      const truncated = words.slice(0, 20).join(' ');
      return truncated + (words.length > 50 ? '...' : '');
    };

    return (
      <div className='flex flex-wrap space-y-10 lg:space-y-0 md:space-y-0 '>
        {courses.slice(0, 6).map(course => (
          <CardDefault
            key={course.title}
            img={course.img}
            title={course.title}
            description={truncateDescription(course.description)}
            url={course.url}
          />
        ))}
      </div>
    );
  };
  const StepButton = (props) => {
    return (<>
      <details
        class="group border-s-4 my-5 border-[#28B889] bg-gray-50 p-3 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary class="flex cursor-pointer items-center justify-between gap-1.5">
          <h2 class="text-xl font-semibold text-gray-900">
            {props.title}
          </h2>

          <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <p class="mt-4 leading-relaxed text-gray-700">
          <Item keyword={props.title} />
        </p>
      </details>


    </>)
  }



  return (
    <>
  {Object.entries(syllabus).map(([topic, details]) => (
        <div key={topic} className=' w-full px-32 flex flex-col'>
          <h1 className='lg:text-4xl text-lg font-bold text-black my-10'>{topic}</h1>
          <Youtube title={topic}  /> 
          <Link state={{url:topic}} to={"/quiz"} className='flex justify-center items-center rounded-full px-4 py-1.5 text-lg font-medium w-1/4 text-white bg-[#28B889]'>Test</Link>{/* Pass topics as prop */}
       
        </div>
      ))}





    </>

  );
}


