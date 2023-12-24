import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queryAndMution";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface Iprops {}

const Saved: FC<Iprops> = ({}) => {
  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();

  const saved = currentUser?.save;

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="explore-container">
        <div className="explore-inner_container">
          <h1 className="h3-bold md:h2-bold">Saved Posts</h1>
        </div>

        <div className="flex flex-wrap gap-9 w-full mt-10  max-w-5xl ">
          {/* <GridPostList posts={currentUser?.save} type="saved" /> */}

          <ul className="grid-container">
            {saved?.map((post: any) => {
              post = post.post;
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
      </div>
    </>
  );
};

export default Saved;
