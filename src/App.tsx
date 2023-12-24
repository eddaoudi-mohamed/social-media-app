import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import { Toaster } from "./components/ui/toaster";
import ComponentRouter from "./router";
// import router from "./router";

function App() {
  return (
    <>
      <div className="h-screen flex">
        <ComponentRouter />
        <Toaster />
      </div>
    </>
  );
}

export default App;
