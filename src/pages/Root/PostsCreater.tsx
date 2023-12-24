import GridListPostSaved from "@/components/shared/GridListPostSaved";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetPostByUserId } from "@/lib/react-query/queryAndMution";
import { Models } from "appwrite";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface Iprops {}

const PostsCreater: FC<Iprops> = ({}) => {
  const { id: UserId } = useParams();
  const {
    data: PostCreated,
    isPending: LoadingPostCurrentUser,
  } = useGetPostByUserId(UserId || "");
  if (LoadingPostCurrentUser) {
    return <Loader />;
  }
  console.log("posts Creater", PostCreated);
  return (
    <>
      <GridListPostSaved posts={PostCreated} type="posts" />
    </>
  );
};

export default PostsCreater;
