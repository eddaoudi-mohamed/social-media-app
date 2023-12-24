import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queryAndMution";
import { multiFormatDateString } from "@/lib/utils";
import { FC } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

interface Iprops {}

const PostDetail: FC<Iprops> = ({}) => {
  const { user } = useUserContext();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const navigate = useNavigate();

  const { mutateAsync: DeletePost, isPending: isDeleting } = useDeletePost();
  // if (isPending) return <Loader />;
  const handelDeletPost = async (postId: string, imageId: string) => {
    const postDelete = await DeletePost({ postId, imageId });
    navigate("/");
  };

  return (
    <>
      <div className="post_details-container">
        {isPending ? (
          <Loader />
        ) : (
          <div className="post_details-card">
            <img
              src={post?.imageURL}
              alt="creater"
              className="post_details-img"
            />
            <div className="post_details-info">
              <div className="flex-between w-full">
                <NavLink
                  to={`/profile/${post?.creater.$id}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={`${
                      post?.creater?.iamgeURL ||
                      "assets/icons/profile-placeholder.svg"
                    }`}
                    alt="creator"
                    className="rounded-full w-10 h-10  lg:h-12 lg:w-12"
                  />
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
                </NavLink>
                {post?.creater.$id === user.id ? (
                  <div className="flex-center">
                    <NavLink to={`/update-post/${post?.$id}`}>
                      <img
                        src="/assets/icons/edit.svg"
                        alt="Edit"
                        width={24}
                        height={24}
                      />
                    </NavLink>
                    <Button
                      onClick={() => handelDeletPost(post.$id, post.imageID)}
                      variant="ghost"
                      className="ghost_details_delete_btn"
                    >
                      <img
                        src="/assets/icons/delete.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </Button>
                  </div>
                ) : null}
              </div>

              <hr className="border w-full border-dark-4/80" />

              <div className=" flex flex-col flex-1 w-full small-medium lg:base-medium py-5">
                <p> {post?.caption}</p>
                <ul className="flex gap-1 mt-2">
                  {post?.tags.map((tag: string) => (
                    <li className=" text-light-3" key={tag}>
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <PostStats post={post} userId={user.id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetail;
