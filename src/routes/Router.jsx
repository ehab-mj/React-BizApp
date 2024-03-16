import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import EditCardPage from "../Pages/EditCardPage";
import CreateCardPage from "../Pages/CreateCardPage";
import MyCardsPage from "../Pages/MyCardsPage";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import IsAdmin from "../guard/isAdmin";
import ProfilePage from "../Pages/ProfilePage";
import EditUserPage from "../Pages/EditUserPage";
import AboutUsPage from "../Pages/AboutPage/AboutUsPage";
import FavPage from "../Pages/Favorite/favoritePage";
import Error404 from "../Pages/404/Error404";
import UserInfo from "../sandbox/UserInfo";
import Forgetpassword from "../Pages/ForgetPass/Forgetpassword";
import ResetPassword from "../Pages/ForgetPass/ResetPassword";




const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={ROUTES.FORGETPASS} element={<Forgetpassword />} />
      <Route path={ROUTES.RESETPASSWORD} element={<ResetPassword />} />
      <Route path={`${ROUTES.DETAILS}/:id`} element={<DetailsPage />} />
      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.CREATECARD}
        element={
          <BizGuard>
            <CreateCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.FAV}
        element={
          <AuthGuard>
            <FavPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITUSER}/:id`}
        element={
          <AuthGuard>
            <EditUserPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <BizGuard>
            <MyCardsPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <IsAdmin>
            {/* <SandboxPage /> */}
            <UserInfo />
          </IsAdmin>
        }
      ></Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
