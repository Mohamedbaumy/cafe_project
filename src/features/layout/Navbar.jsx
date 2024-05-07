import { Icon } from "@iconify/react";

const Navbar = () => {
	return (
		<header className="flex h-20 items-center border-b-[0.050rem] border-[#305dab31] bg-white px-10">
			<nav className=" block w-full lg:hidden  ">
				<div className="flex items-center justify-between">
					Logo
					<div className="itemes-center flex gap-6">
						<Icon icon="system-uicons:bell" className="mt-1 text-3xl" />
					</div>
				</div>
			</nav>
			<nav className="hidden w-full lg:block ">
				<div className="grid grid-flow-col grid-cols-6 md:grid-cols-3 lg:grid-cols-4 justify-between">
					<div className="col-span-6 md:col-span-3 lg:col-span-4">
						<div className="flex items-center justify-end gap-4">
							{/* user icon  from iconify */}
							<Icon icon="carbon:user-avatar-filled" className="text-3xl" />
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
