import SidebarItem from "./SidebarItem";

const SidebarList = () => {
	return (
		<ul className="flex flex-col gap-y-6 text-xs text-gray-900">
			<SidebarItem icon="vaadin:home" text={"Home"} to="/" />
			<SidebarItem icon="vaadin:home" text={"page"} to="/page" />
		</ul>
	);
};

export default SidebarList;
