import { useContext } from "react";
import AppContext from "../context";
import Card from "../components/Card";

function Favourites({ onChangeSearchInput, onAddToFavourite, onAddToCart }) {
	const state = useContext(AppContext);

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Мои закладки</h1>
			</div>

			<div className="d-flex flex-wrap">
				{state.items.map((item, index) => (
					<Card
						key={index}
						favourited={true}
						onFavourite={onAddToFavourite}
						{...item}
					/>
				))}
			</div>
		</div>
	);
}

export default Favourites;
