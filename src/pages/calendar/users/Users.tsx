import { UserType } from "src/interface";
import { motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";
import { useUserStore } from "src/stores/userStore";

const Users = () => {
  const users = useUserStore((state) => state.users);
  const changeUser = useUserStore((state) => state.changeUser);

  return (
    <div
      id="users"
      className="flex justify-between items-center h-10 px-4 bg-dark-blue border-y border-[#243043] border-solid"
    >
      <LayoutGroup>
        {users.map((user: UserType) => (
          <motion.div
            layout
            key={user.id}
            className={`flex cursor-pointer text-xs items-center font-semibold ${
              user.selected
                ? "bg-navy px-3 py-[5px] border-y border-[#243043] border-solid"
                : ""
            }`}
            onClick={() => {
              changeUser(user.id);
            }}
          >
            <motion.div className="relative" layout>
              <motion.img src={user.avatar} className="rounded-full h-7 mr-2" />
              {user.counter > 0 && (
                <div className="absolute rounded-full h-4 w-4 flex justify-center items-center bg-dark-blue -bottom-1 right-1 text-[8px] text-gray-200">
                  {user.counter}
                </div>
              )}
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.5 }}
              initial="hidden"
              animate={user.selected ? "visible" : "hidden"}
            >
              {user.selected ? user.name : ""}
            </motion.div>
          </motion.div>
        ))}
      </LayoutGroup>
    </div>
  );
};

export default Users;
