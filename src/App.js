import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import AppContext from "./context";
import Orders from "./pages/Orders";

import Home from "./pages/Home";
import Favourites from "./pages/Favourites";

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
			try {
				const [itemsResponse, cartResponse, favouritesResponse] =
					await Promise.all([
						axios.get("https://630c890c53a833c5342de89a.mockapi.io/items"),
						axios.get("https://630c890c53a833c5342de89a.mockapi.io/cart"),
						axios.get("https://630c890c53a833c5342de89a.mockapi.io/favourites"),
					]);

				setIsLoading(false);
				setCartItems(cartResponse.data);
				setFavourites(favouritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert("Ошибка при запросе данных ;(");
				console.error(error);
			}
		}
		fetchData();
	}, []);

	/* При клике на крестик на карточке удалить из корзины */
	const onRemoveItem = (id) => {
		try {
			setCartItems((prev) =>
				prev.filter((item) => Number(item.id) !== Number(id))
			);
			axios.delete(`https://630c890c53a833c5342de89a.mockapi.io/cart/${id}`);
		} catch (error) {
			alert("Ошибка при удалении товара из корзины");
			console.error(error);
		}
	};

	/* При клике на плюсик на карточке добавить в корзину */
	const onAddToCart = async (obj) => {
		try {
			const targetItem = cartItems.find(
				(item) => Number(item.parentId) === Number(obj.id)
			);
			if (targetItem) {
				setCartItems((prev) =>
					prev.filter((item) => Number(item.parentId) !== Number(obj.id))
				);
				await axios.delete(
					`https://630c890c53a833c5342de89a.mockapi.io/cart/${targetItem.id}`
				);
			} else {
				setCartItems((prev) => [...prev, obj]);
				const { data } = await axios.post(
					"https://630c890c53a833c5342de89a.mockapi.io/cart",
					obj
				);
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id,
							};
						}
						return item;
					})
				);
			}
		} catch (error) {
			alert("Ошибка добавления товара в корзину");
			console.log(error);
		}
	};

	/* При клике на сердце добавить предмет в закладки / удалить из закладок */
	const onAddToFavourite = async (obj) => {
		try {
			if (favourites.find((item) => Number(item.id) === Number(obj.id))) {
				axios.delete(
					`https://630c890c53a833c5342de89a.mockapi.io/favourites/${obj.id}`
				);
				setFavourites((prev) =>
					prev.filter((item) => Number(item.id) !== Number(obj.id))
				);
			} else {
				const { data } = await axios.post(
					"https://630c890c53a833c5342de89a.mockapi.io/favourites",
					obj
				);
				setFavourites((prev) => [...prev, data]);
			}
		} catch (error) {
			alert("Не удалось добавить в закладки");
			console.error(error);
		}
	};

	/* Применить поиск при наборе текста в поле поиска */
	const onChangeSearchInput = (event) => setSearchValue(event.target.value);

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favourites,
				isItemAdded,
				onAddToFavourite,
				onAddToCart,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className="wrapper clear">
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
					opened={cartOpened}
				/>
				<Header onClickCart={() => setCartOpened(true)} />
				<Routes>
					<Route
						path=""
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
						path="favourites"
						element={<Favourites onAddToFavourite={onAddToFavourite} />}
					/>
					<Route path="orders" element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
