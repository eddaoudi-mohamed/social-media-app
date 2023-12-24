import {
  CreateClient,
  DeletePost,
  SingInAccount,
  SingOutAccount,
  deleteSavePost,
  getCurrentUser,
  getInfinitePosts,
  getPostBYId,
  getPostByIdUser,
  getRecentPosts,
  getSavedPosts,
  getUserById,
  likedPost,
  savePost,
  searchPosts,
  upatePost,
  useCreatePost,
} from "@/appwrite/api";
import { IRegisterForm, IUpdatePost, Iposts, Ipsotnew } from "@/interfaces";
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKey";

export const useCreateUserAccounte = () => {
  return useMutation({
    mutationFn: (user: IRegisterForm) => CreateClient(user),
  });
};

export const useSingInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      SingInAccount(user),
  });
};

export const useSingOutAccount = () => {
  return useMutation({
    mutationFn: SingOutAccount,
  });
};

export const useCreatePosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: { post: Iposts; id: string }) => useCreatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likedPost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeleteSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ RecodeSaveId }: { RecodeSaveId: string }) =>
      deleteSavePost(RecodeSaveId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_POST_BY_ID, postId],
    queryFn: () => getPostBYId(postId),
    enabled: !!postId,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => upatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      DeletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    getNextPageParam: (lastPage: any) => {
      if (lastPage && lastPage.documents.length == 0) {
        return null;
      }

      const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;

      return lastId;
    },
  });
};

export const useSearchPost = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useGetSavedPost = (idUser: string) => {
  return useQuery({
    queryFn: () => getSavedPosts(idUser),
    queryKey: [QUERY_KEY.GET_SAVED_POSTS, idUser],
    enabled: !!idUser,
  });
};

export const useGetPostByUserId = (userId: string) => {
  return useQuery({
    queryFn: () => getPostByIdUser(userId),
    queryKey: [QUERY_KEY.GET_POST_BY_IDUSER],
    enabled: !!userId,
  });
};

export const useGetuserById = (userId: string) => {
  return useQuery({
    queryFn: () => getUserById(userId),
    queryKey: [QUERY_KEY.GET_USER_BY_ID],
    enabled: !!userId,
  });
};
