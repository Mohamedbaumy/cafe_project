import SidebarList from "./SidebarList";

function MobileSideBar({ active, setActive }) {
	const closeMenu = () => {
		setActive(false);
	};
	return (
		<>
			{active && (
				<div className="navbar-menu relative z-50 ">
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25 "
						onClick={closeMenu}
					/>
					<nav className="fixed  bottom-0 right-0 top-0 flex w-4/6 max-w-xs  flex-col overflow-y-auto border-r bg-white px-6 py-6">
						<div className="mt-3 flex items-center justify-center ">Logo</div>

						<SidebarList />

						<div className="mt-5 text-center ">User</div>
						<hr className="my-5" />
					</nav>
				</div>
			)}
		</>
	);
}

export default MobileSideBar;
