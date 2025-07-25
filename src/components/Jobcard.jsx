import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { savedJobs } from "@/API/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";


function Jobcard({
  job,
  isMyjob = false,
  savedinit = false,
  onsavedjob = () => {},
}) {
  const {
    fn: fnsaveJobs,
    data: saveJobs,
    loading: loadingJobs,
  } = useFetch(savedJobs);

  const {user}=useUser();
  const [saved, setSaved] = useState(savedinit);
  const handlesavejobs= async()=>{
    await fnsaveJobs({
        user_id: user.id,
        job_id: job.id
    },saved);
    setSaved(!saved); 
    onsavedjob();
  }
 
   useEffect(()=>{
     if(saveJobs!==undefined) setSaved(saveJobs?.length>0);
   },[saveJobs])


  return (
    <Card className={"bg-neutral-100"}>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          <span className="text-xl  text-slate-700">{job.title}</span>
          {!isMyjob && (
            <Trash2Icon
              size={20}
              className="text-red-300 cursor-pointer"
            ></Trash2Icon>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-5 items-center mb-2">
          {job.company && <img src={job.company.logo_url} className="h-5" />}
          <div className="flex flex-wrap-1 gap-2 items-center">
            <MapPinIcon size={18} />
            {job.location}
          </div>
        </div>
        <hr />
        <div className="line-clamp-2 mt-3">{job.description}</div>
      </CardContent>
      <CardFooter className="flex gap-5">
        <Link to={`/job/:${job.id}`} className="flex-1">
          <Button
            variant="secondary"
            className="w-full bg-sky-400 hover:bg-sky-300 cursor-pointer"
          >
            More details
          </Button>
        </Link>

        {!isMyjob &&(
            <Button variant="outline" className="w-10" onClick={handlesavejobs} disabled={loadingJobs}>
                {saved ? <Heart size={20} stroke="red" fill="red"></Heart> : <Heart size={20} ></Heart>}
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Jobcard;
