import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import setting from "../setting.json";
import {addRestaurantsList} from "../store/restaurantsReducer";
import {setCoordinates} from "../store/userReducer";
import {initState} from "../untils";

function Restaurant({ mapProps, setMapsProps }) {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const restaurants = useSelector(state => state.restaurants.list)

    if (restaurants.length === 0) {
        const dataForInit = {
            setting,
            mapProps,
            setMapsProps,
            user,
            dispatch,
            addRestaurantsList,
            setCoordinates
        }
        initState(dataForInit);
    }

    const restaurant = restaurants.find(element => {
        const elementCoordinates = [...element.geometry.coordinates].reverse();
        return params.coordinates === `${elementCoordinates[0]}-${elementCoordinates[1]}`
    });

    if (restaurant === undefined) {
        navigate('/404');
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "64px"
        }}>
            <div>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginBottom: "12px",
                        cursor: "pointer"
                    }}
                >
                    Назад
                </button>
                {
                    restaurant &&
                    <div className={"restaurant-info"}>
                        <h1>{restaurant.properties.CompanyMetaData.name}</h1>
                        <div className="restaurant-info__row">
                            Время работы: {restaurant.properties.CompanyMetaData.Hours.text}
                        </div>
                        <div className="restaurant-info__row">
                            Адрес: {restaurant.properties.CompanyMetaData.address}
                        </div>
                        <div className="restaurant-info__row">
                            Сайт:
                            <a
                                target={"_blank"}
                                href={restaurant.properties.CompanyMetaData.url}
                            >
                                {restaurant.properties.CompanyMetaData.url}
                            </a>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Restaurant;