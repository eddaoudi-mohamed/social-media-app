import { Models } from "appwrite";
import { FC } from "react";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

interface Iprops {
  isSearchFetching: boolean;
  searchPost: Models.Document[];
}

const SearchResulta: FC<Iprops> = ({ isSearchFetching, searchPost }) => {
  if (isSearchFetching) return <Loader />;

  if (searchPost && searchPost.documents.length > 0) {
    return <GridPostList posts={searchPost.documents} />;
  }
  return (
    <>
      <p className=" text-light-4 mt-10 text-center w-full">No Results Found</p>
    </>
  );
};

export default SearchResulta;
