import React from "react";
import ReactDOM from "react-dom/client";
import App from "@features/layout/App";

// css
import "react-dropdown-tree-select/dist/styles.css";
import "./index.css";

// pages
import Home from "@features/home/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/page",
				element: <div>Page</div>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
