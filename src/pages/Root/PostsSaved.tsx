import GridListPostSaved from "@/components/shared/GridListPostSaved";
import Loader from "@/components/shared/Loader";
import { useGetSavedPost } from "@/lib/react-query/queryAndMution";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface Iprops {}

const PostsSaved: FC<Iprops> = ({}) => {
  const { id: UserId } = useParams();
  const { data: SavedPost, isPending: loadingData } = useGetSavedPost(
    UserId || ""
  );
  if (loadingData) {
    return <Loader />;
  }
  console.log(SavedPost);
  return (
    <>
      <GridListPostSaved posts={SavedPost} />
    </>
  );
};

export default PostsSaved;
