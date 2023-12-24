import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Iprops {}

const LayoutAuth: FC<Iprops> = ({}) => {
  const isLoggedin = false;

  return (
    <>
      {isLoggedin ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col h-screen py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="h-screen w-1/2 hidden xl:block object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default LayoutAuth;
