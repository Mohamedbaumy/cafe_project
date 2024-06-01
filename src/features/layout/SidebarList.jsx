import SidebarItem from "./SidebarItem";
import { Menu } from "antd";

const SidebarList = () => {
	return (
		<Menu mode="inline" theme="light" defaultSelectedKeys={["1"]}>
			<SidebarItem icon="vaadin:home" text={"Home"} to="/" />
			<SidebarItem icon="vaadin:home" text={"page"} to="/page" />
		</Menu>
	);
};

export default SidebarList;
