import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { LoginForm } from "@/data";
import { IloginForm } from "@/interfaces";
import { useSingInAccount } from "@/lib/react-query/queryAndMution";
import { ValidationLogin } from "@/validation";
import { Loader } from "lucide-react";
import { FC, Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface Iprops {}

const SingIn: FC<Iprops> = ({}) => {
  const defaulData: IloginForm = {
    email: "",
    password: "",
  };
  const { toast } = useToast();
  const { checkAuthUser, isLoading } = useUserContext();
  const navigate = useNavigate();
  const [stateErro, setStateErr] = useState<IloginForm>(defaulData);
  const [statLogin, setStateLogin] = useState<String>("");
  const {
    mutateAsync: SingInAccount,
    isPending: IsLogind,
  } = useSingInAccount();

  const RenderLoginForm = LoginForm.map((input) => (
    <Fragment key={input.id}>
      <Input
        label={input.label}
        name={input.name}
        type={input.type}
        id={input.id}
        onChange={(event) => {
          const { name, value } = event.target;
          setStateErr((preve) => {
            return {
              ...preve,
              [name]: "",
            };
          });
        }}
      />
      {stateErro && stateErro[input.name] ? (
        <p className="text-red text-sm py-1 px-1">{stateErro[input.name]}</p>
      ) : null}
    </Fragment>
  ));

  const handlerSubmitLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setStateLogin("");
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const data = new FormData(form);

    const loginData: IloginForm = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    console.log(loginData);
    const validation = ValidationLogin(loginData);

    const errores = Object.values(validation).every((value) => value == "");
    if (!errores) {
      console.log(errores);
      console.log(validation);
      return setStateErr(validation);
    }

    const session = await SingInAccount({
      email: loginData.email,
      password: loginData.password,
    });

    if (!session) {
      return setStateLogin("false");
    }

    const loggedin = await checkAuthUser();
    if (!loggedin) {
      return setStateLogin("false");
    }
    setStateLogin("");
    navigate("/");
  };
  return (
    <>
      <div className="sm:w-420 flex-center flex-col bg-red-400 px-2">
        <img src="/assets/images/logo.svg" alt="" />
        <h3 className="h3-bold md:h2-bold pt-2 capitalize text-center ">
          sing in to you accounte in snapgram
        </h3>
        <p className="text-light-3 small-medium md:base-regulare pt-2">
          To use Snapgram Enter details
        </p>

        <form
          onSubmit={handlerSubmitLogin}
          method="post"
          className="flex w-full gap-3 flex-col  py-1"
        >
          {RenderLoginForm}
          {statLogin ? (
            <p className="flex-center text-small-regular text-red  md:pt-2">
              Email Or password not correct
            </p>
          ) : null}

          <Button className="shad-button_primary text-light-2 w-full">
            <div className="flex justify-center items-center">
              {IsLogind || isLoading ? <Loader /> : "Register"}
            </div>
          </Button>
          <p className="flex-center text-small-regular text-light-2  md:pt-2">
            if don't have accounte ?
            <NavLink to="../sing-up" className="text-blue-500 underline px-1 ">
              sing-up
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default SingIn;
