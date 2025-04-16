import React, { useState, useEffect, useContext } from 'react';
import User from './Context';

export default function Youtube(props) {
  const [videos, setVideos] = useState([]);
 const[user,setUser]= useContext(User)

  useEffect(() => {
    const fetchData = async () => {
    const query = props.title;
      try {
        const response = await fetch('http://127.0.0.1:5000/yt-videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideos(data.links);
        console.log(data.links)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if(user.path){
        fetchData();
    }
    
  }, []); // Fetch data whenever the query changes

  const getEmbedLink = (videoLink) => {
    // Replace 'watch?v=' with 'embed/'
    return videoLink.replace('watch?v=', 'embed/');
  };

  return (
    <div className=' justify-center items-center flex flex-col w-full lg:px-28 px-4 py-5 lg:mb-6'>
         <ul className=' flex lg:flex-row flex-col space-y-8 lg:space-y-0 md:space-y-0 lg:space-x-8'>
        {videos.map((video, index) => (
          <li key={index} className='w-96 h-60 '>
            <iframe title={`Video ${index}`} className='rounded-2xl' width="100%" height="100%" src={getEmbedLink(video)} frameborder="0" allowfullscreen></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
}
