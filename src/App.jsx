import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { resumes, AIResponseFormat, prepareInstructions } from '../constants/index.js'
import './App.css'
import { usePuterStore } from '../lib/puter.js'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ResumeCard from '../components/ResumeCard.jsx'
import { useEffect } from 'react'
export function meta(){
return[
   {title: "Resumind"},
   {name : 'description' , content : "smart feedback for your dream job"}
];
}

function App() {
  const { isLoading, auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated ])

  return (
     <div className ="bg-[url('/images/bg-main.svg')] bg-cover" >

     <Navbar/>

     <section className='main-section'>
    <div className="page-heading py-16">
       <h1>
         Track your applications & Resume Ratings
       </h1>

       <h2>
        Review your submissions and check AI powered feedback
       </h2>

    </div>

     </section>
     {resumes.length > 0 && (
  <div className="resumes-section flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full px-4">
    {resumes.map((resume) => (
      <ResumeCard key={resume.id} resume={resume} />
    ))}
  </div>
)}



     
     </div>
  
  )
}

export default App

