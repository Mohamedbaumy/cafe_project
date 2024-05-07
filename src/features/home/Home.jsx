import { Chart } from "react-google-charts";
import { useReducer, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import DropdownTreeSelect from "react-dropdown-tree-select";

// componets
import Component from "./Component";

const selectData = {
	label: "search me",
	value: "searchme",
	children: [
		{
			label: "search me too",
			value: "searchmetoo",
			children: [
				{
					label: "No one can get me",
					value: "anonymous",
				},
			],
		},
	],
};

const initialState = {
	chartType: "LineChart",
	data: [
		["Task", "Hours per Day"],
		["Work", 11],
		["Eat", 2],
		["Commute", 2],
		["Watch TV", 2],
		["Sleep", 7],
	],
	options: {
		title: "My Daily Activities",
	},
};

const reducer = (state, action) => {
	switch (action.type) {
		case "CHANGE_CHART_TYPE":
			return {
				...state,
				chartType: action.payload,
			};
		case "CHANGE_DATA":
			return {
				...state,
				data: action.payload,
			};
		case "CHANGE_OPTIONS":
			return {
				...state,
				options: action.payload,
			};
		default:
			return state;
	}
};

const types = [
	"LineChart",
	"AreaChart",
	"BarChart",
	"ColumnChart",
	"SteppedAreaChart",
	"ScatterChart",
	"ComboChart",
	// "CandlestickChart",
	"Histogram",
	"Line",
	// "Area",
	"Bar",
	// "Column",
	// "SteppedArea",
	"Scatter",
];

const Home = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [value, setValue] = useState({
		startDate: new Date(),
		endDate: new Date().setMonth(11),
	});

	const handleValueChange = (newValue) => {
		console.log("newValue:", newValue);
		setValue(newValue);
	};

	return (
		<>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-9 border p-3">
					<div className="flex flex-wrap gap-2 justify-center mb-6">
						{types.map((type) => (
							<button
								key={type}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() =>
									dispatch({
										type: "CHANGE_CHART_TYPE",
										payload: type,
									})
								}
								type="button"
							>
								{type}
							</button>
						))}
					</div>
					<Chart
						chartType={state.chartType}
						data={state.data}
						options={state.options}
						width={"100%"}
						height={"400px"}
					/>
				</div>
				<div className="col-span-3 border p-3">
					<h1 className="text-center ">Filter</h1>
					<Component />
				</div>
			</div>
		</>
	);
};

export default Home;
