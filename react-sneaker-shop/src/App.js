import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [cartOpened, setCartOpened] = useState(false);

	useEffect(() => {
		axios
			.get("https://630c890c53a833c5342de89a.mockapi.io/items")
			.then((res) => setItems(res.data));
		axios
			.get("https://630c890c53a833c5342de89a.mockapi.io/cart")
			.then((res) => setCartItems(res.data));
	}, []);

	const onClickAddToCart = (obj) => {
		axios.post("https://630c890c53a833c5342de89a.mockapi.io/cart", obj);
		setCartItems((prev) => [...prev, obj]);
	};

	const onRemoveItem = (id) => {
		axios.delete(`https://630c890c53a833c5342de89a.mockapi.io/cart/${id}`);
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const onAddToFavourite = (obj) => {
		axios.post("https://630c890c53a833c5342de89a.mockapi.io/favourites", obj);
		setFavourites((prev) => [...prev, obj]);
	};

	const onChangeSearchInput = (event) => setSearchValue(event.target.value);

	return (
		<div className="wrapper clear">
			{cartOpened && (
				<Drawer
					items={cartItems}
					onClickClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
				/>
			)}
			<Header onClickCart={() => setCartOpened(true)} />

			<Route path="/" exact>
				<Home
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onChangeSearchInput={onChangeSearchInput}
					items={items}
					onAddToFavourite={onAddToFavourite}
					onClickAddToCart={onClickAddToCart}
				/>
			</Route>
		</div>
	);
}

export default App;
