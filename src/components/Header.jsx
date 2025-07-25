import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignInButton,
  SignedIn,
  UserButton,
  SignedOut,
  SignIn
} from "@clerk/clerk-react";
import { PenBox } from "lucide-react";
import { BriefcaseBusiness , Heart } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function Header() {

  const {user,isLoaded}=useUser();
  const [ShowSignIn,setShowSignIn]=useState(false);

   const [search, setSearch] = useSearchParams();

   useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

   const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className=" flex justify-between">
        <Link to={"/"}>
          <img src="logo (2).png" className="h-25 ml-5"></img>
        </Link>
        {/* <Button className="cursor-pointer mt-7 mr-10 bg-blue-500 hover:bg-blue-400">Sign in</Button> */}
        <div className="mr-10 flex gap-6 ">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white cursor-pointer mt-7">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {isLoaded &&  user&& user.unsafeMetadata?.role==="recruiter" && <Link to={"/post-job"}>
              <Button
                variant="destructive"
                className="rounded-full mt-8 hover:cursor-pointer"
              >
                <PenBox size={20} className="m-0.5"></PenBox>
                Post a Job
              </Button>
            </Link>}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    height: "35px",
                    width: "35px",
                  },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-job"
                />
                 <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
         {ShowSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
      </nav>
    </>
  );
}

export default Header;
