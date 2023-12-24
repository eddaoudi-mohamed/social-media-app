import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queryAndMution";
import { Models } from "appwrite";
import { FC, Fragment } from "react";

interface Iprops {}

const Home: FC<Iprops> = ({}) => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  // const isPostLoading = true;
  // const posts = null;

  return (
    <>
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            {isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {/* Render Posts  */}
                {posts?.documents.map((post: Models.Document) => (
                  <Fragment key={post.$id}>
                    <PostCard post={post} />
                  </Fragment>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
