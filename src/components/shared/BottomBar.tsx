import { bottombarLinks } from "@/data";
// import { bottombarLinks } from "@/data";

import { NavLink } from "react-router-dom";
import { FC } from "react";
import { useLocation } from "react-router-dom";

interface Iprops {}

const BottomBar: FC<Iprops> = ({}) => {
  const { pathname } = useLocation();

  const RenderbottombarLinks = bottombarLinks.map((link) => {
    const isActive = pathname === link.route;
    return (
      <NavLink
        to={link.route}
        className={` flex flex-col flex-center ${
          isActive && "bg-primary-500 rounded-[10px]  gap-1 p-2 transition"
        }`}
        key={link.label}
      >
        <img
          src={link.imgURL}
          width={16}
          height={16}
          alt="icon"
          className={`${isActive && "invert-white"}`}
        />
        <p className="tiny-medium text-light-2"> {link.label}</p>
      </NavLink>
    );
  });
  return (
    <>
      <section className="bottom-bar p-3">{RenderbottombarLinks}</section>
    </>
  );
};

export default BottomBar;
