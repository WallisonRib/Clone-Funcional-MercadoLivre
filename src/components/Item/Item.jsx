import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import fetchItem from "../../api/fetchItem";
import "./Item.css"
import Loading from "../Loading/Loading";
import AppContext from '../../context/AppContext';


function Item() {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const { setLoading } = useContext(AppContext);



    useEffect(() => {
        fetchItem(id).then((response) => {
            setItemData(response);
            setLoading(false);
        });
    }, [id]);

    if (itemData === null) {
        return <Loading />
    }

    const { condition, sold_quantity, title, thumbnail, original_price, price } = itemData;
    console.log(itemData);


    return (

        <div className="wrap">
            <div className="container item">

                <div className="imagem">
                    <img src={thumbnail.replace(/\w\.jpg/gi, "W.jpg")} />
                </div>

                <div className="item-description">
                    <div className="priceandsold">
                        {condition === "new" ? <p className="condition">Novo</p> : <p className="condition">Usado</p>} {sold_quantity > 0 && <p className="sold_quantity"> | +{sold_quantity} vendidos</p>}

                    </div>
                    <h2>{title}</h2>
                    <div className="price">
                        <h2><s>{original_price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</s></h2>

                        <h2>{price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h2>
                    </div>

                </div>


            </div>
        </div>

    );
}

export default Item;
