import SidebarList from "./SidebarList";

const Sidebar = () => {
	return (
		<nav className={"w-[15%] hidden lg:block"}>
			<div className="flex justify-center h-20 border-b items-center">Logo</div>
			<aside className="hidden  lg:flex">
				<div className="h-8 flex-col border-[#305dab31] bg-white p-3   lg:w-20 xl:w-52">
					<SidebarList />
				</div>
			</aside>
		</nav>
	);
};

export default Sidebar;
