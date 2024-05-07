import React, { useState } from "react";

export const Component1 = ({ setCount, ...rest }) => {
	const { type } = rest;
	const x = type === "button" ? "button" : "submit";
	/*
        props = {setCount, className, type}
    */
	return (
		<button
			onClick={() =>
				setCount((prev) => {
					return {
						...prev,
						count: prev.count + 1,
					};
				})
			}
			{...rest}
		>
			Increment {x}
		</button>
	);
};

export const Component2 = (props) => {
	return (
		<div className="flex justify-between">
			{props.state.count} /{props.state.value}
		</div>
	);
};

const Component = () => {
	const [state, setCount] = useState({
		count: 0,
		value: 10,
	});

	return (
		<>
			<Component1
				setCount={setCount}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="button"
			/>
			<Component2 state={state} />
		</>
	);
};

export default Component;
