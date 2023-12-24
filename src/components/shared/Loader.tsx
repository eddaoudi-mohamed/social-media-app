import { FC } from "react";

interface Iprops {}

const Loader: FC<Iprops> = ({}) => {
  return (
    <>
      <div className="flex-center w-full">
        <img
          src="/assets/icons/loader.svg"
          alt="loader"
          width={24}
          height={24}
        />
      </div>
    </>
  );
};

export default Loader;
