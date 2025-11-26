import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import {  AIResponseFormat, prepareInstructions } from '../constants/index.js'
import './App.css'
import { usePuterStore } from '../lib/puter.js'
import { useNavigate, useLocation ,Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ResumeCard from '../components/ResumeCard.jsx'

export function meta(){
return[
   {title: "Resumind"},
   {name : 'description' , content : "smart feedback for your dream job"}
];
}

function App() {
  const { isLoading, auth ,kv} = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [resumes , setResumes] = useState([]);
  const [loadingResumes , setLoadingResumes]=useState(false);

  useEffect(() => {
    if (
      !auth.isAuthenticated &&
      location.pathname !== '/auth'
    ) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated, location.pathname, navigate]);

    useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = await kv.list("resume:*", true);

      const parsedResumes = resumes?.map((resume) =>
        JSON.parse(resume.value)
      );
  console.log("parsedResume" , parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
     <main className ="bg-[url('/images/bg-main.svg')] bg-cover rounded-b-full" >

     <Navbar/>

     <section className='main-section'>
    <div className="page-heading py-16">
       <h1>
         Track your applications & Resume Ratings
       </h1>
        {!loadingResumes && resumes?.length === 0 ?(
          <h2>No Resumes found . upload your first resume to get feedback. </h2>
        ):(
       <h2>
        Review your submissions and check AI powered feedback
       </h2>

        )}

    </div>
     {loadingResumes && (
      <div className='flex flex-col items-center justify-center'>
         <img src="/images/resume-scan-2.gif" alt="" className='w-[200px]' />
      </div>
     )}
     { !loadingResumes && resumes.length > 0 && (
  <div className="resumes-section flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full px-4">
    {resumes.map((resume) => (
      <ResumeCard key={resume.id} resume={resume} />
    ))}
  </div>
)}
  {!loadingResumes && resumes?.length ===0 && (
    <div className='flex flex-col items-center justify-center mt-10 gap-4'>
      <Link to="/upload" className="primary-button w-fit text-xl font-semibold ">Upload Resume</Link>
    </div>
  )}
     </section>
     </main>
  
  )
}

export default App

