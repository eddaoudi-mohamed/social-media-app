import { useUserContext } from "@/context/AuthContext";
import { bottombarLinks } from "@/data";
import { useSingOutAccount } from "@/lib/react-query/queryAndMution";
import { FC, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
interface Iprops {}

const LeftBar: FC<Iprops> = ({}) => {
  const location = useLocation();
  const { user } = useUserContext();
  const { mutate: logoutFn, isSuccess } = useSingOutAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/sing-in");
    }
  }, [isSuccess]);

  //Render bottomBarLinks
  const RenderbottombarLinks = bottombarLinks.map((link) => {
    const isActive = location.pathname === link.route;
    return (
      <li
        className={`leftsidebar-link group  ${
          isActive ? "bg-primary-500" : ""
        }`}
        key={link.label}
      >
        <NavLink to={link.route} className="flex gap-4 items-center p-4">
          <img
            src={link.imgURL}
            alt="icon"
            className={`group-hover:invert-white ${
              isActive ? "invert-white" : ""
            }`}
          />
          {link.label}
        </NavLink>
      </li>
    );
  });

  function sinOutUser() {
    return logoutFn();
  }
  return (
    <>
      <nav className="leftsidebar">
        <div className="flex flex-col gap-11">
          <NavLink to="/" className="flex gap-3 items-center">
            <img
              src="/assets/images/logo.svg"
              alt="Logo"
              width={130}
              height={325}
            />
          </NavLink>

          <NavLink
            to={`profile/${user.id}`}
            className="flex items-center gap-3"
          >
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col">
              <p className=" body-bold"> {user.name} </p>
              <p className="small-regular text-light-3 ">@{user.email}</p>
            </div>
          </NavLink>
          <ul className="flex flex-col gap-6">{RenderbottombarLinks}</ul>
        </div>

        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={sinOutUser}
        >
          <img src="/assets/icons/logout.svg" alt="" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </nav>
    </>
  );
};

export default LeftBar;
