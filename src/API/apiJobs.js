import supabaseClient from "@/utils/supabase";

export default async function getJobs(token, { location, company_id, searchQuery }) {
  let supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("*, company: companies(name,logo_url), saved: saved_job(id)");
  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;
  if (error) {
    console.log("Error fetching jobs : ", error);
    return null;
  }

  return data;
}

export async function savedJobs(token,saveData, alreadySaved ,) {
  const supabase = await supabaseClient(token);
  
    if (alreadySaved) {
    // If the job is already saved, remove it
    const { data, error: deleteError } = await supabase
      .from("saved_job")
      .delete()
      .eq("job_id", saveData.job_id)
       .eq("user_id", saveData.user_id);

      
      console.log("SAVE OP", { saveData, alreadySaved });


    if (deleteError) {
      console.error("Error removing saved job:", deleteError);
      return data;
    }

    return data;
  } else{
    const { data, error: insertError } = await supabase
      .from("saved_job")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return data;
    }

    return data;
  }
}


