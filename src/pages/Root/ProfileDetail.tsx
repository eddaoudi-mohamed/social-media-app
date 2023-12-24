import GridListPostSaved from "@/components/shared/GridListPostSaved";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetPostByUserId,
  useGetSavedPost,
  useGetuserById,
} from "@/lib/react-query/queryAndMution";
import { FC, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

interface Iprops {}

const ProfileDetail: FC<Iprops> = ({}) => {
  const { user: currentUser } = useUserContext();
  const { id } = useParams();
  const { data: user, isPending } = useGetuserById(id || "");
  if (isPending) {
    console.log("loader data now ...");
    return <Loader />;
  }
  console.log("user : ", user);
  const { pathname } = useLocation();
  const isActivePost = pathname == `/profile/${id}`;
  const isActiveSaved = pathname == `/profile/${id}/saved`;

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className="flex flex-1">
          <div className="home-container">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex gap-3">
                <img
                  src={
                    user?.iamgeURL || "/assets/icons/profile-placeholder.svg"
                  }
                  alt="profile"
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <p className=" body-bold"> {user?.name} </p>
                  <p className="small-regular text-light-3 ">{user?.email}</p>
                  <ul className="flex w-full gap-2 md:gap-6">
                    <li className="flex items-center  text-sm">
                      <p className=" text-light-4 text-base px-1">
                        {user?.posts.length}
                      </p>
                      Posts
                    </li>
                    <li className="flex items-center text-sm">
                      <p className=" text-light-4 text-base px-1">678 </p>
                      Followers
                    </li>
                    <li className="flex items-center text-sm">
                      <p className=" text-light-4 text-base px-1">390 </p>
                      Following
                    </li>
                  </ul>
                </div>
              </div>

              {/* if current user in the profile detail  */}
              {currentUser.id == id ? (
                <div className="flex gap-2">
                  <Button className=" bg-[#101012] p-2 flex gap-1  items-center  ">
                    <img
                      src="/assets/icons/edit.svg"
                      width={10}
                      height={10}
                      className=" w-[15px] h-[15px] text-[#FFB620]"
                      alt=""
                    />
                    Edit Profile
                  </Button>
                  <Button className=" bg-[#101012] p-2 flex gap-1  items-center  ">
                    <img
                      src="/assets/icons/gallery-add.svg"
                      width={10}
                      height={10}
                      className=" w-[15px] h-[15px] text-[#FFB620]"
                      alt=""
                    />
                    Create
                  </Button>
                </div>
              ) : (
                // {/* else not the current user the porfile detail  */}
                <div className="flex gap-2">
                  <Button className=" bg-[#877EFF] p-2 font-bold flex gap-1 rounded-md items-center  ">
                    Follow
                  </Button>
                  <Button className=" bg-light-2 text-black font-bold p-2 flex gap-1 rounded-md items-center  ">
                    Message
                  </Button>
                </div>
              )}
            </div>

            <div className="flex-between w-full max-w-5xl mt-16 mb-7">
              <div className="flex gap-3 items-center  ">
                <NavLink
                  end
                  to="."
                  className={`${isActivePost ? "bg-primary-500" : "bg-dark-3"}
                  
                  flex p-2 gap-2 items-center   rounded-lg
                
                `}
                >
                  <img
                    src="/assets/icons/posts.svg"
                    className={isActivePost ? "invert-white" : ""}
                    alt=""
                  />
                  Posts
                </NavLink>

                <NavLink
                  to="saved"
                  className={`${isActiveSaved ? "bg-primary-500" : "bg-dark-3"}
                  flex p-2 gap-2 items-center   rounded-lg
                
                `}
                >
                  <img
                    src="/assets/icons/save.svg"
                    alt=""
                    className={isActiveSaved ? "invert-white" : ""}
                  />
                  saved
                </NavLink>
              </div>
              <div className="flex-center gap-3 rounded-xl px-4 py-2 bg-dark-3 cursor-pointer">
                <p className="small-medium md:base-medium text-light-2">All</p>
                <img
                  src="/assets/icons/filter.svg"
                  alt="filter"
                  width={20}
                  height={20}
                />
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetail;
