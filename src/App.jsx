import Applayout from "./Applayout/Applayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Onboarding from "./pages/Onboarding";
import Job from "./pages/Job";
import Joblisting from "./pages/Joblisting";
import Postjob from "./pages/Postjob";
import Savejobs from "./pages/Savejobs";
import Myjobs from "./pages/Myjobs";
import Protectedroute from "./components/Protectedroute";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Landingpage />,
      },
      {
        path: "/onboarding",
        element: (
          <Protectedroute>
            <Onboarding />
          </Protectedroute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <Protectedroute>
            <Joblisting />
          </Protectedroute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <Protectedroute>
            <Job />
          </Protectedroute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <Protectedroute>
            <Postjob />
          </Protectedroute>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <Protectedroute>
            <Savejobs />
          </Protectedroute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <Protectedroute>
            <Myjobs />
          </Protectedroute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
