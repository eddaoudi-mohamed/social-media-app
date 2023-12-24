import BottomBar from "@/components/shared/BottomBar";
import LeftBar from "@/components/shared/LeftBar";
import TopBar from "@/components/shared/TopBar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface Iprops {}

const LayoutRoot: FC<Iprops> = ({}) => {
  return (
    <>
      <div className="w-full md:flex">
        <TopBar />
        <LeftBar />

        <section className="flex flex-1 h-full">
          <Outlet />
        </section>

        <BottomBar />
      </div>
    </>
  );
};

export default LayoutRoot;
