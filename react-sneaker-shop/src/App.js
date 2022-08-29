import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);

    fetch("https://630c890c53a833c5342de89a.mockapi.io/items")
        .then((res) => res.json())
        .then((json) => setItems(json));

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer onClickClose={() => setCartOpened(false)} />}
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
                    {items.map((obj) => (
                        <Card
                            title={obj.title}
                            price={obj.price}
                            imageUrl={obj.imageUrl}
                            onClickFavourite={() =>
                                console.log("Добавили в закладки")
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
