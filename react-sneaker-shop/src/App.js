import { useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import AppContext from "./context";

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [cartOpened, setCartOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	/* Отрендерить один раз содержимое БД */
	useEffect(() => {
		async function fetchData() {
			const itemsResponse = await axios.get(
				"https://630c890c53a833c5342de89a.mockapi.io/items"
			);
			const cartResponse = await axios.get(
				"https://630c890c53a833c5342de89a.mockapi.io/cart"
			);
			const favouritesResponse = await axios.get(
				"https://630c890c53a833c5342de89a.mockapi.io/favourites"
			);

<<<<<<< HEAD
			setIsLoading(false);

			setCartItems(cartResponse.data);
			setFavourites(favouritesResponse.data);
			setItems(itemsResponse.data);
		}

		fetchData();
	}, []);
=======
	/* При клике на плюсик на карточке добавить в корзину */
	const onAddToCart = (obj) => {
		axios.post("https://630c890c53a833c5342de89a.mockapi.io/cart", obj);
		setCartItems((prev) => [...prev, obj]);
	};
>>>>>>> e96d7853acc52ccaec064089fb559fd668ef5d64

	/* При клике на крестик на карточке удалить из корзины */
	const onRemoveItem = id => {
		axios.delete(`https://630c890c53a833c5342de89a.mockapi.io/cart/${id}`);
		setCartItems(prev => prev.filter(item => item.id !== id));
	};

<<<<<<< HEAD
	/* При клике на плюсик на карточке добавить в корзину */
	const onAddToCart = obj => {
		if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
			axios.delete(
				`https://630c890c53a833c5342de89a.mockapi.io/cart/${obj.id}`
			);
			setCartItems(prev =>
				prev.filter(item => Number(item.id) !== Number(obj.id))
			);
		} else {
			axios.post("https://630c890c53a833c5342de89a.mockapi.io/cart", obj);
			setCartItems(prev => [...prev, obj]);
		}
	};

	/* При клике на сердце добавить предмет в закладки / удалить из закладок */
	const onAddToFavourite = async obj => {
		try {
			if (favourites.find(item => item.id === obj.id)) {
				axios.delete(
					`https://630c890c53a833c5342de89a.mockapi.io/favourites/${obj.id}`
				);
				setFavourites(prev => prev.filter(item => item.id !== obj.id));
=======
	/* При клике на сердце добавить предмет в закладки / удалить из закладок */
	const onAddToFavourite = async (obj) => {
		try {
			if (favourites.find((item) => item.id === obj.id)) {
				axios.delete(
					`https://630c890c53a833c5342de89a.mockapi.io/favourites/${obj.id}`
				);
				setFavourites((prev) => prev.filter((item) => item.id !== obj.id));
>>>>>>> e96d7853acc52ccaec064089fb559fd668ef5d64
			} else {
				const { data } = await axios.post(
					"https://630c890c53a833c5342de89a.mockapi.io/favourites",
					obj
				);
<<<<<<< HEAD
				setFavourites(prev => [...prev, data]);
=======
				setFavourites((prev) => [...prev, data]);
>>>>>>> e96d7853acc52ccaec064089fb559fd668ef5d64
			}
		} catch (error) {
			alert("Не удалось добавить в закладки");
		}
	};

	/* Применить поиск при наборе текста в поле поиска */
	const onChangeSearchInput = event => setSearchValue(event.target.value);

	return (
<<<<<<< HEAD
		<AppContext.Provider value={(items, cartItems, favourites)}>
			<div className="wrapper clear">
				{cartOpened && (
					<Drawer
						items={cartItems}
						onClickClose={() => setCartOpened(false)}
						onRemove={onRemoveItem}
					/>
				)}
				<Header onClickCart={() => setCartOpened(true)} />
				<Routes>
					<Route
						path="/"
						element={
							<Home
								items={items}
								cartItems={cartItems}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddToFavourite={onAddToFavourite}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
					/>
					<Route
						path="/favourites"
						element={<Favourites onAddToFavourite={onAddToFavourite} />}
					/>
				</Routes>
			</div>
		</AppContext.Provider>
=======
		<div className="wrapper clear">
			{cartOpened && (
				<Drawer
					items={cartItems}
					onClickClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
				/>
			)}
			<Header onClickCart={() => setCartOpened(true)} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							items={items}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							onChangeSearchInput={onChangeSearchInput}
							onAddToFavourite={onAddToFavourite}
							onAddToCart={onAddToCart}
						/>
					}
				/>
				<Route
					path="/favourites"
					element={
						<Favourites
							items={favourites}
							onAddToFavourite={onAddToFavourite}
						/>
					}
				/>
			</Routes>
		</div>
>>>>>>> e96d7853acc52ccaec064089fb559fd668ef5d64
	);
}

export default App;
