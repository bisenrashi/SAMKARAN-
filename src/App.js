import './App.css';
import { ToastContainer } from 'react-toastify';
import { ScrollToTopOnMount } from './General Components/ScrollToTopOnMount';
import User from "./General Components/Context";
import Login from './General Components/Login'
import { useLoginState } from './General Components/Structure';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Main Components/Home';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Page3 from './General Components/Faq';
import Page2 from './Main Components/Content/Page2';
import Test from './General Components/Test';
function App() {
  const [user, setUser] = useState({
    login: false, name: "", username: "", userId: "", description:{}, isPre_assesment:false,path:{},code:{}
  })
  
const auth = getAuth();




const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((userp) => {
    if (userp ) {
      const userId = userp.uid.toLowerCase(); // Convert user ID to lowercase for consistency

      const usersRef = ref(getDatabase(), 'users');

      get(usersRef)
        .then((snapshot) => {
          let userFound = false; 
          snapshot.forEach((childSnapshot) => {
            const nodeName = childSnapshot.key;
            const uid = nodeName.split('&')[0]; 

            if (uid === userId) {
              userFound = true;
              
              const userRef1 = ref(getDatabase(), `users/${nodeName}/profiledata`);
              get(userRef1)
                .then((snapshot) => {
                  const profileData = snapshot.val();
             
                  if (profileData) {
                    
                    setUser({ login: true, name: profileData.name, username: profileData.username ,userId:nodeName,description:profileData.description,path:profileData.path,code:profileData.code});
                    console.log(profileData)
                  }
                })
                .catch((error) => {
                  console.error('Error fetching user profile data:', error.message);
                });
            }
          });
          if (!userFound) {
            setUser({ login: false });
          
          }
        })
        .catch((error) => {
          console.error('Error fetching users:', error.message);
          // Handle error, such as showing an error message or setting default user state
        });
    } else {
      setUser({ login: false });
    }
  });

  return () => unsubscribe();
}, [auth]);

  return (
    <>
      <User.Provider value={[user, setUser]}>
        <BrowserRouter>
       
          <ScrollToTopOnMount />
          <ToastContainer />
          <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<Page3/>} />
            {user.login ? <Route path="/pre-assesment" element={<Page2/>} />: <Route path="/pre-assesment" element={<Login />} />}
            {user.login ? <Route path="/quiz" element={<Test />} />: <Route path="/quiz" element={<Login />} />}
          </Routes>
        </BrowserRouter>
      </User.Provider>
    </>
  );
}

export default App;
