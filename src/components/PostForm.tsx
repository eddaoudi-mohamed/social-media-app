import { FC, useState } from "react";
// import Input from "./ui/Input";
import { Button } from "./ui/button";
import FileUploader from "./shared/FileUploader";
import { Iposts, Ipsotnew } from "@/interfaces";
import { ValidationCreatePost, ValidationUpdatePost } from "@/validation";
import {
  useCreatePosts,
  useUpdatePost,
} from "@/lib/react-query/queryAndMution";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./shared/Loader";
import { Models } from "appwrite";

interface Iprops {
  post?: Models.Document;
  action: "create" | "update";
}

// const PostForm: FC<Iprops> = ({}) => {
//   const {
//     mutateAsync: CreatePost,
//     isPending: isLoadingPost,
//   } = useCreatePosts();
//   const navigate = useNavigate();
//   const { user } = useUserContext();
//   const [fileImage, SetFileImae] = useState<File[]>([]);
//   const defaulData: Ipsotnew = {
//     caption: "",
//     location: "",
//     tags: "",
//     fileImage: "",
//   };
//   const { toast } = useToast();
//   const [stateErro, setStateErr] = useState<Ipsotnew>(defaulData);
//   const SubmitCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const form = event.target as HTMLFormElement;

//     const data = new FormData(form);
//     const CreatePostData: Iposts = {
//       caption: data.get("caption") as string,
//       location: data.get("location") as string,
//       tags: data.get("tags") as string,
//       fileImage: fileImage,
//     };

//     const validation = ValidationCreatePost(CreatePostData);

//     const errores = Object.values(validation).every((value) => value == "");
//     if (!errores) {
//       return setStateErr(validation);
//     }
//     const newPost = await CreatePost({ post: CreatePostData, id: user.id });

//     if (!newPost) {
//       return toast({ title: "please try again" });
//     }
//     navigate("/");
//   };
//   return (
//     <>
//       <form
//         method="post"
//         onSubmit={SubmitCreatePost}
//         className="flex flex-col gap-9 w-full max-w-5xl"
//       >
//         <div className="flex flex-col gap-2">
//           <label htmlFor="caption" className="shad-form_label">
//             {" "}
//             caption
//           </label>
//           <textarea
//             name="caption"
//             id="caption"
//             rows={10}
//             className="shad-textarea custom-scrollbar outline-none border focus:border-purple-500 px-2"

//           ></textarea>
//           {stateErro["caption"] && (
//             <p className="small-regular text-red">{stateErro["caption"]}</p>
//           )}
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="addphoto" className="shad-form_label">
//             Add Photo
//           </label>
//           <FileUploader fielChange={SetFileImae} mediaUrl={""} />
//           {stateErro["fileImage"] && (
//             <p className="small-regular text-red">field image is required</p>
//           )}
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="addLocation" className="shad-form_label">
//             Add Location
//           </label>
//           <input
//             type="text"
//             name="location"
//             id="addLocation"
//             className="shad-input rounded-md placeholder:text-light-3 outline-none border focus:border-purple-500 px-2"
//           />
//           {stateErro["location"] && (
//             <p className="small-regular text-red">{stateErro["location"]}</p>
//           )}
//         </div>

//         <div className="flex flex-col gap-2">
//           <label htmlFor="addLocation" className="shad-form_label">
//             Add Tags
//           </label>
//           <input
//             type="text"
//             name="tags"
//             id="addLocation"
//             className="shad-input rounded-md placeholder:text-light-3 outline-none border focus:border-purple-500 px-2"
//             placeholder="Art , Expression , Learn"
//           />
//           {stateErro["tags"] && (
//             <p className="small-regular text-red">{stateErro["tags"]}</p>
//           )}
//         </div>
//         <div className="flex items-center justify-end gap-4">
//           <Button className="shad-button_dark_4" type="reset">
//             Cancel
//           </Button>
//           <Button className="shad-button_primary whitespace-nowrap">
//             {isLoadingPost ? <Loader /> : "Submit"}
//           </Button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default PostForm;

// ... (previous imports)

const PostForm: FC<Iprops> = ({ post, action }) => {
  const {
    mutateAsync: CreatePost,
    isPending: isLoadingPost,
  } = useCreatePosts();

  const {
    mutateAsync: UpdatePost,
    isPending: isLoadingUpdatePost,
  } = useUpdatePost();

  const navigate = useNavigate();
  const { user } = useUserContext();

  // Use useState for each form field
  const [caption, setCaption] = useState(post?.caption ? post.caption : "");
  const [location, setLocation] = useState(post?.location ? post.location : "");
  const [tags, setTags] = useState(post?.tags ? post.tags.join(",") : "");
  const [fileImage, setFileImage] = useState<File[]>([]);
  const [stateErro, setStateErr] = useState<Ipsotnew>({
    caption: "",
    location: "",
    tags: "",
    fileImage: "",
  });

  const { toast } = useToast();

  const SubmitCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Access form fields using state variables
    const postData: Iposts = {
      caption,
      location,
      tags,
      fileImage,
    };

    if (post && action === "update") {
      // update Post in here
      const validation = ValidationUpdatePost(postData);

      const errors = Object.values(validation).every((value) => value === "");
      if (!errors) {
        return setStateErr(validation);
      }
      const updatepost = await UpdatePost({
        ...postData,
        imageId: post?.imageId,
        imageURL: post?.imageURL,
        postId: post.$id,
      });
      if (!updatepost) return toast({ title: "please try again" });
      return navigate(`/posts/${post.$id}`);
    } else {
      // create Post in here
      const validation = ValidationCreatePost(postData);

      const errors = Object.values(validation).every((value) => value === "");
      if (!errors) {
        return setStateErr(validation);
      }

      const newPost = await CreatePost({ post: postData, id: user.id });

      if (!newPost) {
        return toast({ title: "Please try again" });
      }
      navigate("/");
    }
  };

  return (
    <>
      <form
        method="post"
        onSubmit={SubmitCreatePost}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="caption" className="shad-form_label">
            Caption
          </label>
          <textarea
            name="caption"
            id="caption"
            rows={10}
            className="shad-textarea custom-scrollbar outline-none border focus:border-purple-500 px-2"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
          {stateErro["caption"] && (
            <p className="small-regular text-red">{stateErro["caption"]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="addphoto" className="shad-form_label">
            Add Photo
          </label>
          <FileUploader
            fielChange={setFileImage}
            mediaUrl={post?.imageURL ? post.imageURL : ""}
          />
          {stateErro["fileImage"] && (
            <p className="small-regular text-red">Field image is required</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="addLocation" className="shad-form_label">
            Add Location
          </label>
          <input
            type="text"
            name="location"
            id="addLocation"
            className="shad-input rounded-md placeholder:text-light-3 outline-none border focus:border-purple-500 px-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {stateErro["location"] && (
            <p className="small-regular text-red">{stateErro["location"]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="addLocation" className="shad-form_label">
            Add Tags
          </label>
          <input
            type="text"
            name="tags"
            id="addLocation"
            className="shad-input rounded-md placeholder:text-light-3 outline-none border focus:border-purple-500 px-2"
            placeholder="Art , Expression , Learn"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {stateErro["tags"] && (
            <p className="small-regular text-red">{stateErro["tags"]}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button className="shad-button_dark_4" type="reset">
            Cancel
          </Button>
          <Button
            disabled={isLoadingPost || isLoadingUpdatePost}
            className="shad-button_primary whitespace-nowrap"
          >
            {isLoadingPost || isLoadingUpdatePost ? <Loader /> : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
