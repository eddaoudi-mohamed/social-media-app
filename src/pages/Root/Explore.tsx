import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResulta from "@/components/shared/SearchResulta";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPost } from "@/lib/react-query/queryAndMution";
import { FC, Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
interface Iprops {}

const Explore: FC<Iprops> = ({}) => {
  const { ref, inView } = useInView();

  const [search, setSearch] = useState<string>("");
  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const debounceValue = useDebounce(search, 300);
  const { data: searchPost, isPending: isSearchFetching } = useSearchPost(
    debounceValue
  );
  // console.log(searchPost());

  useEffect(() => {
    if (inView && !search) fetchNextPage();
  }, [search, inView]);

  if (!posts) {
    return (
      <div className="fex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  // console.log(posts);
  // const posts = [];
  const shouldShowResultsSearch = search !== "";
  const shouldShowPosts =
    !shouldShowResultsSearch &&
    posts?.pages.every((item) => item?.documents.length === 0);

  return (
    <>
      <div className="explore-container">
        <div className="explore-inner_container">
          <h1 className="h3-bold md:h2-bold">Search Posts</h1>
          <div className="flex gap-1 w-full rounded-lg py-[2px] px-1 bg-dark-4">
            <img
              src="/assets/icons/search.svg"
              alt="search"
              width={24}
              height={24}
            />
            <input
              type="search"
              placeholder="Search"
              className="explore-search outline-none w-full"
              value={search}
              onChange={handlerSearch}
            />
          </div>
        </div>
        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h1 className="body-bold md:h2-bold">Popular today</h1>
          <div className="flex-center gap-3 rounded-xl px-4 py-2 bg-dark-3 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              alt="filter"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-9 w-full  max-w-5xl ">
          {shouldShowResultsSearch ? (
            <SearchResulta
              isSearchFetching={isSearchFetching}
              searchPost={searchPost}
            />
          ) : shouldShowPosts ? (
            <div className=" text-light-4 mt-10 text-center w-full ">
              End of posts
            </div>
          ) : (
            posts?.pages.map((item, index) => (
              <Fragment key={index}>
                <GridPostList posts={item?.documents} />
              </Fragment>
            ))
          )}
        </div>
        {hasNextPage && !search && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
