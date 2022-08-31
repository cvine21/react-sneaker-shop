import React, { useState } from "react";
import styles from "./Card.module.scss";

function Card({ title, price, imageUrl, onClickFavourite, onPlus }) {
	const [isAdded, setIsAdded] = useState();

	const onClickPlus = () => {
		onPlus({ title, imageUrl, price });
		setIsAdded(!isAdded);
	};

	return (
		<div className={styles.card}>
			<div className={styles.favourite} onClick={onClickFavourite}>
				<img src="/img/unliked.svg" alt="Unliked" />
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
