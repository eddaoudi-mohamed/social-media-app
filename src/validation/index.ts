import { IRegisterForm, IloginForm, Iposts, Ipsotnew } from "@/interfaces";

export function ValidationRegister(Data: IRegisterForm) {
  const ErroreRegister: IRegisterForm = {
    name: "",
    email: "",
    password: "",
    username: "",
  };
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (Data.name == "") {
    ErroreRegister.name = "Required feild name";
  }
  if (Data.username == "") {
    ErroreRegister.username = "Required feild username";
  }
  if (Data.email == "" || !emailRegex.test(Data.email)) {
    ErroreRegister.email = "Required feild email";
  }
  if (Data.password == "" || Data.password.length < 6) {
    ErroreRegister.password =
      "Required feild password and least then 6 characters";
  }

  return ErroreRegister;
}

export function ValidationLogin(Data: IloginForm) {
  const ErroreRegister: IloginForm = {
    email: "",
    password: "",
  };
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (Data.email == "" || !emailRegex.test(Data.email)) {
    ErroreRegister.email = "Required feild email";
  }
  if (Data.password == "" || Data.password.length < 6) {
    ErroreRegister.password = "Required feild password";
  }

  return ErroreRegister;
}

export function ValidationCreatePost(Data: Iposts) {
  const ErroreRegister: Ipsotnew = {
    caption: "",
    location: "",
    tags: "",
    fileImage: "",
  };
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (Data.caption == "") {
    ErroreRegister.caption = "Required feild caption";
  }
  if (Data.location == "") {
    ErroreRegister.location = "Required feild location";
  }

  if (Data.tags == "") {
    ErroreRegister.tags = "Required feild tags";
  }
  if (Data.fileImage.length == 0) {
    ErroreRegister.fileImage = "Required feild Image";
  }

  return ErroreRegister;
}

export function ValidationUpdatePost(Data: Iposts) {
  const ErroreRegister: Ipsotnew = {
    caption: "",
    location: "",
    tags: "",
    fileImage: "",
  };
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (Data.caption == "") {
    ErroreRegister.caption = "Required feild caption";
  }
  if (Data.location == "") {
    ErroreRegister.location = "Required feild location";
  }

  if (Data.tags == "") {
    ErroreRegister.tags = "Required feild tags";
  }

  return ErroreRegister;
}
