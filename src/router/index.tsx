import {
  Outlet,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SingIn from "../pages/Auth/Sing-in";
import LayoutAuth from "../pages/Auth/Layout";
import LayoutRoot from "../pages/Root/Layout";
import Home from "../pages/Root/Home";
import SingUp from "@/pages/Auth/Sing-up";
import Explore from "@/pages/Root/Explore";
import AllUser from "@/pages/Root/AllUser";
import Saved from "@/pages/Root/Saved";
import CreatePost from "@/pages/Root/CreatePost";
import PostDetail from "@/pages/Root/PostDetail";
import UpdatePost from "@/pages/Root/UpdatePost";
import ProfileDetail from "@/pages/Root/ProfileDetail";
import UpdateProfile from "@/pages/Root/UpdateProfile";
import PostsCreater from "@/pages/Root/PostsCreater";
import PostsSaved from "@/pages/Root/PostsSaved";

const ComponentRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<LayoutAuth />}>
        <Route path="sing-in" element={<SingIn />} />
        <Route path="sing-up" element={<SingUp />} />
      </Route>
      {/* provider router  */}
      <Route path="/" element={<LayoutRoot />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="all-user" element={<AllUser />} />
        <Route path="saved" element={<Saved />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="posts/:id" element={<PostDetail />} />
        <Route path="update-post/:id" element={<UpdatePost />} />
        <Route path="profile/:id" element={<ProfileDetail />}>
          <Route index element={<PostsCreater />} />
          <Route path="saved" element={<PostsSaved />} />
        </Route>

        <Route path="udpate-profile/:id" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
};

export default ComponentRouter;
