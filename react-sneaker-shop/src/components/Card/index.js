import React, { useState } from "react";
import styles from "./Card.module.scss";

function Card({ title, price, imageUrl, onFavourite, onPlus }) {
	const [isAdded, setIsAdded] = useState(false);
	const [isFavourite, setIsFavourite] = useState(false);

	const onClickPlus = () => {
		onPlus({ title, imageUrl, price });
		setIsAdded(!isAdded);
	};

	const onClickFavourite = () => {
		onFavourite({ title, imageUrl, price });
		setIsFavourite(!isFavourite);
	};

	return (
		<div className={styles.card}>
			<div className={styles.favourite} onClick={onClickFavourite}>
				<img
					src={isFavourite ? "/img/liked.svg" : "/img/unliked.svg"}
					alt="Unliked"
				/>
			</div>
			<img width={133} height={112} src={imageUrl} alt="Sneakers" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<img
					className={styles.plus}
					src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
					alt="plus"
					onClick={onClickPlus}
				/>
			</div>
		</div>
	);
}

export default Card;
