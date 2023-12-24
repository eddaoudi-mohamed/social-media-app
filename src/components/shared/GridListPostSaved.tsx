import { Models } from "appwrite";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface Iprops {
  posts: Models.Document;
  type?: string;
}

const GridListPostSaved: FC<Iprops> = ({ posts, type }) => {
  return (
    <>
      <div className="flex flex-wrap gap-9 w-full mt-10  max-w-5xl ">
        {/* <GridPostList posts={currentUser?.save} type="saved" /> */}

        <ul className="grid-container">
          {posts?.documents.map((post: any) => {
            post = type == "posts" ? post : post.post;
            return (
              <li key={post.$id} className=" relative min-w-80 h-80  ">
                <NavLink to={`/posts/${post.$id}`} className="grid-post_link">
                  <img
                    src={post.imageURL}
                    alt="postImage"
                    className="w-full h-full object-cover"
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default GridListPostSaved;
