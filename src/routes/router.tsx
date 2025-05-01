import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";
import SuspenseLoader from "../components/SuspenseLoader";
import PrivateRoute from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Download } from "@mui/icons-material";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const SidebarLayout = Loader(lazy(() => import("src/layouts/SidebarLayout")));
const BaseLayout = Loader(lazy(() => import("src/layouts/BaseLayout")));
const Status404 = Loader(lazy(() => import("../views/pages/Status/Status404")));
const Login = Loader(lazy(() => import("../views/session-pages/login")));
const ForgotPassword = Loader(
  lazy(() => import("../views/session-pages/forgot-password"))
);
const SentEmail = Loader(
  lazy(() => import("../views/session-pages/sentEmail"))
);
const ResetPassword = Loader(
  lazy(() => import("../views/session-pages/reset-password"))
);
const SuccesStatus = Loader(
  lazy(() => import("../views/session-pages/resetStatus"))
);
const FailStatus = Loader(
  lazy(() => import("../views/session-pages/resetStatus"))
);
const UserManagement = Loader(
  lazy(() => import("../views/pages/User-Management"))
);

const Commands = Loader(lazy(() => import("../views/pages/Commands/index")));
const DownloadData = Loader(
  lazy(() => import("../views/pages/DownloadData/index"))
);
const FieldUserGroups = Loader(
  lazy(() => import("../views/pages/FieldUserGroups/index"))
);
const FieldUsers = Loader(
  lazy(() => import("../views/pages/FieldUsers/index"))
);
const Meters = Loader(lazy(() => import("../views/pages/Meters/index")));
const MyProfile = Loader(lazy(() => import("../views/pages/MyProfile/index")));
// const IndividualNodeScreen = Loader(
//   lazy(() => import('src/views/pages/Nodes/Node Overview/index'))
// );
const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/meters" replace />
      },
      {
        path: "login",
        // element: <Login />
        element: <PublicRoute element={Login} />
      },
      {
        path: "forgot-password",
        // element: <ForgotPassword />
        element: <PublicRoute element={ForgotPassword} />
      },
      {
        path: "sent-email",
        // element: <SentEmail />
        element: <PublicRoute element={SentEmail} />
      },
      {
        path: "reset-password",
        // element: <ResetPassword />
        element: <PublicRoute element={ResetPassword} />
      },
      {
        path: "reset-status/success",
        // element: <SuccesStatus />
        element: <PublicRoute element={SuccesStatus} />
      },
      {
        path: "reset-status/fail",
        // element: <FailStatus />
        element: <PublicRoute element={FailStatus} />
      },
      {
        path: "*",
        element: <Status404 />
      }
    ]
  },
  {
    path: "",
    element: <PrivateRoute element={SidebarLayout} />,
    children: [
      {
        path: "/no-access",
        element: <Status404 />
      },

      {
        path: "/commands",
        element: <PrivateRoute element={Commands} />
      },
      {
        path: "/download_data",
        element: <PrivateRoute element={DownloadData} />
      },
      {
        path: "/field_user_groups",
        element: <PrivateRoute element={FieldUserGroups} />
      },
      {
        path: "/field_users",
        element: <PrivateRoute element={FieldUsers} />
      },
      {
        path: "/meters",
        element: <PrivateRoute element={Meters} />
      },
      {
        path: "/profile",
        element: <PrivateRoute element={MyProfile} />
      }
    ]
  }
];

export default routes;
