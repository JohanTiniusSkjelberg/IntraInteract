import Search from "./search";
import Users from "./users";

function Sidebar() {

  return (
    <div className="flex flex-col w-1/3 bg-[#3e3c61]">
        <Search />
        <Users />
    </div>
  )
}

export default Sidebar;