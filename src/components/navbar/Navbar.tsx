import { NavLink, useLocation } from "react-router-dom";
import { navigation } from "./Navigation";
import { NavItemType } from "src/interface";
import { motion } from "framer-motion";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div
      id="navbar"
      className="absolute flex inset-x-0 bottom-0 bg-dark-blue h-12 border-t border-[#243043] border-solid"
    >
      <div className="w-full flex">
        {navigation.map((item: NavItemType) => (
          <NavLink
            to={item.path}
            key={item.name}
            className="w-full flex flex-col items-center justify-center text-[9px] "
          >
            <NavbarIcon icon={item.icon} isActive={pathname === item.path} />

            <motion.span
              variants={{
                hidden: { opacity: 0, height: 0 },
                visible: { opacity: 1, height: "auto" },
              }}
              transition={{ duration: 0.25 }}
              initial="hidden"
              animate={pathname === item.path ? "visible" : "hidden"}
              exit="hidden"
              className="relative h-1 mt-1"
            >
              {item.name}
            </motion.span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

type NavbarIconType = {
  icon: React.ReactNode;
  isActive: boolean;
};

const NavbarIcon = ({ icon }: NavbarIconType) => (
  <div className="navbar-icon text-base">{icon}</div>
);

export default Navbar;
