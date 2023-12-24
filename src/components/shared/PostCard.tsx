import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import PostStats from "./PostStats";

interface Iprops {
  post: Models.Document;
}

const PostCard: FC<Iprops> = ({ post }) => {
  const { user } = useUserContext();
  return (
    <>
      <div className="post-card">
        <div className="flex-between">
          <div className="flex items-center gap-3">
            <NavLink to={`/profile/${post.creater.$id}`}>
              <img
                src={`${
                  post?.creater?.iamgeURL ||
                  "assets/icons/profile-placeholder.svg"
                }`}
                alt="creator"
                className="rounded-full w-12 lg:h-12"
              />
            </NavLink>
            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1">
                {post?.creater?.name}{" "}
              </p>
              <div className="flex-center gap-2 text-light-3 ">
                <p className=" subtle-semibold lg:small-regular">
                  {multiFormatDateString(post?.$createdAt)}{" "}
                </p>
                -
                <p className=" subtle-semibold lg:small-regular">
                  {post?.location}{" "}
                </p>
              </div>
            </div>
          </div>

          {user.id == post?.creater?.$id ? (
            <NavLink to={`update-post/${post.$id}`}>
              <img
                src="/assets/icons/edit.svg"
                alt="EditePost"
                width={20}
                height={20}
              />
            </NavLink>
          ) : null}
        </div>
        <NavLink to={`posts/${post?.$id}`}>
          <div className="small-medium lg:base-medium py-5">
            <p> {post?.caption}</p>
            <ul className="flex gap-1 mt-2">
              {post.tags.map((tag: string) => (
                <li className=" text-light-3" key={tag}>
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <img src={post.imageURL} alt="" className="post-card_img" />
        </NavLink>
        <PostStats post={post} userId={user.id} />
      </div>
    </>
  );
};

export default PostCard;
