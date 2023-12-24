import {
  IRegisterForm,
  IbottombarLinks,
  Iinput,
  Iinputlogin,
} from "@/interfaces";

export const FromRegister: Iinput[] = [
  {
    name: "name",
    label: "Enter your name",
    id: "name",
    type: "text",
  },
  {
    name: "username",
    label: "Enter your Username",
    id: "Username",
    type: "text",
  },
  {
    name: "email",
    label: "Enter your email",
    id: "email",
    type: "email",
  },
  {
    name: "password",
    label: "Enter your password",
    id: "password",
    type: "password",
  },
];

export const LoginForm: Iinputlogin[] = [
  {
    name: "email",
    label: "Enter your email",
    id: "email",
    type: "email",
  },
  {
    name: "password",
    label: "Enter your password",
    id: "password",
    type: "password",
  },
];

export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks: IbottombarLinks[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create",
  },
];
