import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, option = {}) => {
  const [data, setdata] = useState(undefined);
  const [loading, setloading] = useState(null);
  const [error, seterror] = useState(null);

  const {session , isLoaded} = useSession();

  const fn = async (...args) => {
    setloading(true);
    seterror(null);
    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

    //    console.log("Session loaded:", isLoaded, "Session exists:", !!session);
    //    const token = await session?.getToken({ template: 'supabase' });
    //    console.log("Supabase token:", token);

      const response = await cb(supabaseAccessToken, ...args,option);
      setdata(response);
      seterror(null);
    } catch (error) {
      seterror(error);
    } finally {
      setloading(false);
    }
  };
  return { fn, data, loading, error };
};

export default useFetch;