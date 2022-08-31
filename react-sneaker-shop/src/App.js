import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);

	useEffect(() => {
		fetch("https://630c890c53a833c5342de89a.mockapi.io/items")
			.then((res) => res.json())
			.then((json) => setItems(json));
	}, []);

	return (
		<div className="wrapper clear">
			{cartOpened && (
				<Drawer
					items={cartItems}
					onClickClose={() => setCartOpened(false)}
				/>
			)}
			<Header onClickCart={() => setCartOpened(true)} />
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>Все кроссовки</h1>
					<div className="search-block">
						<img src="/img/search.svg" alt="Search"></img>
						<input placeholder="Поиск..." />
					</div>
				</div>

				<div className="d-flex flex-wrap">
					{items.map((item) => (
						<Card
							title={item.title}
							price={item.price}
							imageUrl={item.imageUrl}
							onClickFavourite={() =>
								console.log("Добавили в закладки")
							}
							onPlus={(obj) =>
								setCartItems((prev) => [...prev, obj])
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
