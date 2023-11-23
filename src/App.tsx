import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

function App() {
  return (
    <div className="bg-gray-200 w-full h-screen max-h-screen flex items-center justify-center">
      <div
        id="app"
        className="bg-navy absolute h-5/6 w-80 rounded-3xl	overflow-hidden text-white shadow-2xl"
      >
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
