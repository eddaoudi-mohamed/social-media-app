import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

interface Iprops {
  children: ReactNode;
}
const queryclient = new QueryClient();
const QueryProvider: FC<Iprops> = ({ children }) => {
  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
