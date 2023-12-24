import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePosts,
} from "@/lib/react-query/queryAndMution";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { FC, useEffect, useState } from "react";
import Loader from "./Loader";

interface Iprops {
  post?: Models.Document;
  userId: string;
}

const PostStats: FC<Iprops> = ({ post, userId }) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSave, setIsSave] = useState<boolean>();
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePosts();
  const {
    mutate: deleteSavePost,
    isPending: isDeletingSaved,
  } = useDeleteSavePost();
  const { data: currentUser } = useGetCurrentUser();
  const savePostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );
  useEffect(() => {
    setIsSave(savePostRecord ? true : false);
  }, [currentUser]);
  const handelLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newlikes = [...likes];
    const hasliked = newlikes.includes(userId);
    if (hasliked) {
      newlikes = newlikes.filter((id) => id !== userId);
    } else {
      newlikes.push(userId);
    }
    setLikes(newlikes);
    likePost({ postId: post?.$id || "", likesArray: newlikes });
  };
  const handelSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    console.log(savePostRecord);
    if (savePostRecord) {
      console.log("deja save post");
      setIsSave(false);
      deleteSavePost({ RecodeSaveId: savePostRecord.$id });
    } else {
      savePost({ postId: post?.$id || "", userId: userId });
      setIsSave(true);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center z-20 ">
        <div className="flex gap-2 mr-5">
          <img
            src={
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }
            alt=""
            width={20}
            height={20}
            onClick={handelLikePost}
            className="cursor-pointer"
          />
          <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>

        <div className="flex gap-2">
          {isSavingPost || isDeletingSaved ? (
            <Loader />
          ) : (
            <img
              src={
                isSave ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
              }
              alt=""
              width={20}
              height={20}
              onClick={handelSavePost}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PostStats;
