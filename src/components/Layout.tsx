import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <Header />
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};

export default Layout;
