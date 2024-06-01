import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Menu } from "antd";

const SidebarItem = ({ to, icon, index, text, ...props }) => {
	return (
		<Menu.Item key={to} icon={<Icon icon={icon} />} {...props}>
			<NavLink to={to}>{text}</NavLink>
		</Menu.Item>
	);
};

export default SidebarItem;
