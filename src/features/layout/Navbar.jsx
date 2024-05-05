import { Icon } from "@iconify/react";

const Navbar = () => {
	return (
		<header className="flex h-20 items-center border-b-[0.050rem] border-[#305dab31] bg-white  md:px-10">
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
					<div className="col-span-2 md:col-span-1 lg:col-span-2">
						<div className="flex items-center justify-start gap-4">
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
