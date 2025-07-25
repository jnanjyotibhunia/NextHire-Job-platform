import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import getJobs from "@/API/apiJobs";
import { data } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Loader } from "lucide-react";
import Jobcard from "@/components/Jobcard";

function Joblisting() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  console.log(Jobs);

  if (!isLoaded) {
    return <Loader />;
  }

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  return (
    <div>
      <h1 className="text-4xl  font-extrabold text-slate-800 text-center sm:text-5xl pb-5">
        Latest Jobs
      </h1>
      {loadingJobs && (
        <div className="flex justify-center mt-20">
          <Loader className="w-12 h-12" />
        </div>
      )}

      {loadingJobs === false && (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5 mr-5">
          {Jobs.length ? (
            Jobs.map((job, index) => {
              return (
                <Jobcard
                  key={job.id}
                  job={job}
                  savedinit={job.saved.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Joblisting;
