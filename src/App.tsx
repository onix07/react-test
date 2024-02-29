import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Display } from "./component/Display";

function App() {
	return (
		<div className="w-[960px] mx-auto p-5">
			<Display />
		</div>
	);
}

export default App;
