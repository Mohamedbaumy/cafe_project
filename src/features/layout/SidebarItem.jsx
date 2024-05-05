import { NavLink, Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const SidebarItem = (props) => {
	return (
		<NavLink
			className="flex items-center gap-5 text-black/70 hover:text-black/90 justify-center"
			to={props.to}
		>
			<Icon icon={props.icon} className="mt-1 text-4xl " />
			<p className={"mt-[5px] text-base  lg:hidden xl:block "}>{props.text}</p>
		</NavLink>
	);
};

export default SidebarItem;
