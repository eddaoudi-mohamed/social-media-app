import PostForm from "@/components/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queryAndMution";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface Iprops {}

const UpdatePost: FC<Iprops> = ({}) => {
  const { id: postId } = useParams();

  const { data: post, isPending } = useGetPostById(postId || "");
  if (isPending) return <Loader />;
  console.log(post);
  return (
    <>
      <div className="flex flex-1">
        <div className="common-container">
          <div className=" max-w-5xl flex-start gap-3 justify-start w-full">
            <img
              src="/assets/icons/add-post.svg"
              width={36}
              height={36}
              alt=""
            />
            <h2 className=" h3-bold md:h2-bold text-left w-full ">
              Edite Post
            </h2>
          </div>
          <PostForm action="update" post={post} />
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
