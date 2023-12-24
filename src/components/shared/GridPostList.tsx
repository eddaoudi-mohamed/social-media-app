import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import PostStats from "./PostStats";

interface Iprops {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
  type?: string;
}

const GridPostList: FC<Iprops> = ({
  posts,
  showStats = true,
  showUser = true,
}) => {
  const { user } = useUserContext();
  // posts = type== "saved" ? posts : posts.post
  return (
    <>
      <ul className="grid-container">
        {posts.map((post) => {
          return (
            <li key={post.$id} className=" relative min-w-80 h-80  ">
              <NavLink to={`/posts/${post.$id}`} className="grid-post_link">
                <img
                  src={post.imageURL}
                  alt="postImage"
                  className="w-full h-full object-cover"
                />
              </NavLink>

              <div className="grid-post_user">
                {showUser && (
                  <div className="flex items-center justify-start gap-2 flex-1">
                    <img
                      src={post.creater.iamgeURL}
                      className="h-8 w-8 rounded-full"
                      alt=""
                    />
                    <p className=" line-clamp-1"> {post.creater.name} </p>
                  </div>
                )}
                {showStats && <PostStats post={post} userId={user.id} />}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default GridPostList;
