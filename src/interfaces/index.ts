import React from "react";

export interface IRegisterForm {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface Iinput {
  name: keyof IRegisterForm;
  label: string;
  id?: string;
  type: string;
}

export interface Iinputlogin {
  name: keyof IloginForm;
  label: string;
  id?: string;
  type: string;
}

export interface IloginForm {
  email: string;
  password: string;
}

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageURL: URL;
  fileImage: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

// export type IContextType = {
//   user: IUser;
//   isLoading: boolean;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: Promise<boolean>;
// };

export interface IbottombarLinks {
  imgURL: string;
  route: string;
  label: string;
}

export interface Iposts {
  caption: string;
  fileImage: File[];
  location: string;
  tags: string;
}

export interface Ipsotnew {
  caption: string;
  fileImage: string;
  location: string;
  tags: string;
}
