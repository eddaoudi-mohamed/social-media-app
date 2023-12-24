// import { CreateClient, SingInAccount } from "@/appwrite/api";
import Loader from "@/components/shared/Loader";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { FromRegister } from "@/data";
import { IRegisterForm } from "@/interfaces";
import {
  useCreateUserAccounte,
  useSingInAccount,
} from "@/lib/react-query/queryAndMution";
import { ValidationRegister } from "@/validation";
import { FC, Fragment, useState } from "react";
import {
  Form,
  NavLink,
  Navigate,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

interface Iprops {}

const SingUp: FC<Iprops> = ({}) => {
  // con
  const { toast } = useToast();
  const { checkAuthUser, isLoading } = useUserContext();
  const navigate = useNavigate();

  const {
    mutateAsync: CreateClient,
    isPending: isCreatingAcounte,
  } = useCreateUserAccounte();

  const {
    mutateAsync: SingInAccount,
    isPending: isSingInIn,
  } = useSingInAccount();

  const RenderRegisterFrom = FromRegister.map((input) => (
    <Fragment key={input.id}>
      <Input
        label={input.label}
        name={input.name}
        type={input.type}
        id={input.id}
        // onChange={(event) => {
        //   const { name, value } = event.target;
        //   ActionData?[] = ""
        // }}
      />
      {/* {ActionData && ActionData[input.name] ? (
        <p className="text-red text-sm py-1 px-1">{ActionData[input.name]}</p>
      ) : null} */}
    </Fragment>
  ));

  // handler submit form Register

  const handlerSubmitRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const data = new FormData(form);

    // Access form values from formData
    // console.log("Form Data:", Object.fromEntries(formData));

    // const data = await request.formData();
    const RegisterData: IRegisterForm = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      username: data.get("username") as string,
      password: data.get("password") as string,
    };
    console.log(RegisterData);
    const validation = ValidationRegister(RegisterData);

    const errores = Object.values(validation).every((value) => value == "");
    if (!errores) {
      console.log(errores);
      console.log(validation);
      return validation;
    }
    const newUser = await CreateClient(RegisterData);
    if (!newUser) {
      return toast({
        title: "sing up as failed please try again ",
      });
    }
    const session = await SingInAccount({
      email: RegisterData.email,
      password: RegisterData.password,
    });
    if (!session) {
      return toast({
        title: "sing up as failed please try again ",
      });
    }
    const loggedin = await checkAuthUser();
    if (loggedin) {
      console.log("his loggedin");

      navigate("/");
    } else {
      return toast({
        title: "sing up as failed please try again ",
      });
    }

    // console.log("iam here ");
    // return null;
  };

  return (
    <>
      <div className="sm:w-420 flex-center flex-col bg-red-400 px-2">
        <img src="/assets/images/logo.svg" alt="" />
        <h3 className="h3-bold md:h2-bold pt-2 capitalize text-center ">
          create accounte to use snapgram
        </h3>
        <p className="text-light-3 small-medium md:base-regulare pt-2">
          To use Snapgram Enter details
        </p>

        <form
          onSubmit={handlerSubmitRegister}
          method="post"
          className="flex w-full gap-2 flex-col  py-1"
        >
          {RenderRegisterFrom}
          <Button className="shad-button_primary text-light-2 w-full">
            <div className="flex justify-center items-center">
              {isCreatingAcounte || isSingInIn || isLoading ? (
                <Loader />
              ) : (
                "Register"
              )}
            </div>
          </Button>
          <p className="flex-center text-small-regular text-light-2  md:pt-2">
            Already have an Accounte
            <NavLink to="../sing-in" className="text-blue-500 underline px-1 ">
              sing-in
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default SingUp;
