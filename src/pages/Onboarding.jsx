import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function Onboarding() {
  
  const navigate = useNavigate();
  const {user}=useUser();

 const navigateUser=(role)=>{
    navigate(role==="recruiter"?"/post-job":"/jobs");
 }
  const handleRoleSelection= async(role)=>{
      await user
      .update({unsafeMetadata:{role}})
      .then(()=>{
        navigateUser(role)
      })
      .catch((error)=>{
        console.error("Error updating role:", error);
      })
  }

  useEffect(()=>{
     if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  },[user])

  return (
    
    <div className='flex flex-col items-center justify-between mt-15'>
      <h1 className='text-6xl font-extrabold text-slate-800'>
        I am a...
      </h1>
      <div className='mt-15 grid grid-cols-2 gap-6  md:px-40'>
        <Button
          variant="blue"
          className="h-16 w-45 text-2xl cursor-pointer"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-16 w-45 text-2xl cursor-pointer"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>

      </div>
    </div>
  )
}

export default Onboarding