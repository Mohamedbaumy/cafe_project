// routes Components
import { Outlet } from "react-router-dom";

// Page Components
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function App() {
	
	return (
		<div dir="rtl">
			<div className="flex">
				<Sidebar />
				<main className="w-full  ![min-width:50%] ">
					<Navbar />
					<div className="mx-auto min-h-screen bg-gray-100 p-5">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
