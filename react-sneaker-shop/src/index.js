import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";
import "macro-css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <Router>
			<App />
		</Router> */}
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				{/* <Route path="/favourites" element={<App />}/> */}
			</Routes>
		</Router>
	</React.StrictMode>
);
