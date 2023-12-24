import { FC, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSingOutAccount } from "@/lib/react-query/queryAndMution";
import { useUserContext } from "@/context/AuthContext";
interface Iprops {}

const TopBar: FC<Iprops> = ({}) => {
  const { mutate: singOutAccount, isSuccess } = useSingOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  function sinoutUser() {
    return singOutAccount();
  }
  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/sing-in");
    }
  }, [isSuccess]);
  return (
    <>
      <section className="topbar">
        <div className="flex-between py-4 px-5">
          <NavLink to="/" className="flex gap-3 items-center">
            <img
              src="/assets/images/logo.svg"
              alt="Logo"
              width={130}
              height={325}
            />
          </NavLink>
          <div className="flex gap-4 ">
            <Button
              variant="ghost"
              className="shad-button_ghost"
              onClick={sinoutUser}
            >
              <img src="/assets/icons/logout.svg" alt="" />
            </Button>
          </div>
          <NavLink to={`profile/${user.id}`}>
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className=" h-8 w-8 rounded-full"
            />
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default TopBar;
