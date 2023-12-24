import { IRegisterForm, IUpdatePost, Iposts } from "@/interfaces";
import { account, appwriteConfig, avatars, database, storage } from "./config";
import { ID, Query } from "appwrite";
import { UnlinkIcon } from "lucide-react";
import { useId } from "react";

export async function CreateClient(user: IRegisterForm) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    const avartURL = avatars.getInitials(user.name);

    const newUser = await saveUserDB({
      accountid: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      iamgeURL: avartURL,
    });
    return newUser;
  } catch (error) {
    return error;
  }
}

export async function singInClient(user: { email: string; passwrod: string }) {}

export async function saveUserDB(user: {
  name: string;
  email: string;
  accountid: string;
  iamgeURL: URL;
  username?: string;
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function SingInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log("faild create session", error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      [Query.equal("accountid", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function SingOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

// CREATE POST
export async function useCreatePost(post: { post: Iposts; id: string }) {
  try {
    const uploadefile = await Uploadfile(post.post.fileImage[0]);
    if (!uploadefile) throw Error;
    const fileUrl = await getfilepreview(uploadefile.$id);

    if (!fileUrl) {
      await deleteFile(uploadefile.$id);
      throw Error;
    }
    const tags = post.post.tags?.replace(/ /g, "").split(",") || [];
    const data = {
      creater: post.id,
      caption: post.post.caption,
      imageURL: fileUrl,
      imageID: uploadefile.$id,
      location: post.post.location,
      tags: tags,
    };
    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      ID.unique(),
      data
    );
    // return createPost;
    if (!newPost) {
      await deleteFile(uploadefile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
    // return error;
  }
}
// uploade file

export async function Uploadfile(file: File) {
  try {
    const uplodafile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uplodafile;
  } catch (error) {
    console.log(error);
  }
}

// get file url

export async function getfilepreview(fieldId: string) {
  try {
    const fileUrl = await storage.getFilePreview(
      appwriteConfig.storageId,
      fieldId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
}

// Update post

// ADD LIKES POST

export async function likedPost(postsId: string, likesArray: string[]) {
  try {
    const updatePost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      postsId,
      {
        likes: likesArray,
      }
    );
    if (!updatePost) throw Error;
    return updatePost;
  } catch (error) {
    console.log(error);
  }
}
//  CREATE SAVE POST
export async function savePost(postsId: string, usersId: string) {
  try {
    const createSavePost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesId,
      ID.unique(),
      {
        user: usersId,
        post: postsId,
      }
    );
    if (!createSavePost) throw Error;
    return createSavePost;
  } catch (error) {
    console.log(error);
  }
}
// DELETE SAVE POST
export async function deleteSavePost(RecordeSavePostId: string) {
  try {
    const deleteSavePost = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesId,
      RecordeSavePostId
    );
    if (!deleteSavePost) throw Error;
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// GET POSTS BY ID

export async function getPostBYId(postId: string) {
  try {
    const postDetail = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      postId
    );
    if (!postDetail) throw Error;
    return postDetail;
  } catch (error) {
    console.log(error);
  }
}

// UPDATE POST

export async function upatePost(post: IUpdatePost) {
  const hasFileUploade = post.fileImage.length > 0;

  try {
    let image = {
      imageURL: post.imageURL,
      imageId: post.imageId,
    };
    if (hasFileUploade) {
      const uploadefile = await Uploadfile(post.fileImage[0]);
      if (!uploadefile) throw Error;
      const fileUrl = await getfilepreview(uploadefile.$id);

      if (!fileUrl) {
        await deleteFile(uploadefile.$id);
        throw Error;
      }
      image = {
        ...image,
        imageURL: fileUrl,
        imageId: uploadefile.$id,
      };
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];
    const data = {
      caption: post.caption,
      imageURL: image.imageURL,
      imageID: image.imageId,
      location: post.location,
      tags: tags,
    };
    const upadatepost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      post.postId,
      data
    );
    // return createPost;
    if (!upadatepost) {
      await deleteFile(post.imageId);
      throw Error;
    }

    return upadatepost;
  } catch (error) {
    console.log(error);
    // return error;
  }
}

export async function DeletePost(postId: string, imageId: string) {
  if (!postId || !imageId) throw Error;
  try {
    // const deleteImageFile = await storage.deleteFile(, imageId) ;
    // if(!deleteImageFile) throw Error ;
    const deletePost = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      postId
    );

    if (!deletePost) throw Error;
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParams }: { pageParams: number }) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(5)];
  if (pageParams) {
    queries.push(Query.cursorAfter(pageParams.toString()));
  }

  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getSavedPosts(userId: string) {
  const queries = [Query.equal("user", userId)];
  try {
    const postsSaved = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesId,
      queries
    );
    if (!postsSaved) throw Error;
    return postsSaved;
  } catch (error) {
    console.log(error);
  }
}
export async function getPostByIdUser(userId: string) {
  const queries = [Query.equal("creater", userId)];
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      queries
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: string) {
  try {
    const User = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      userId
    );
    if (!User) throw Error;
    return User;
  } catch (error) {
    console.log(error);
  }
}

// 6584815015485a8a3be0
