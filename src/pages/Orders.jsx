import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
		() => async () => {
			try {
				const { data } = await axios.get(
					"https://630c890c53a833c5342de89a.mockapi.io/orders"
				);
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert("Ошибка при запросе заказа");
				console.log(error);
			}
		},
		[]
	);

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Мои заказы</h1>
			</div>

			<div className="d-flex flex-wrap">
				{(isLoading ? [...Array(10)] : orders).map((item, index) => (
					<Card key={index} loading={isLoading} {...item} />
				))}
			</div>
		</div>
	);
}

export default Orders;
