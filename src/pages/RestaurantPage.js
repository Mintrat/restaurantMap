import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import setting from "../setting.json";
import {addRestaurantsList} from "../store/restaurantsReducer";
import {setCoordinates} from "../store/userReducer";
import {initState} from "../untils";
import PreloaderRoller from "../components/preloaders/PreloaderRoller";

function Restaurant({ }) {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const restaurants = useSelector(state => state.restaurants.list);
    const [mapProps, setMapsProps] = useState(
        {
            center: user.coordinates,
            zoom: setting.map.zoom
        }
    );

    // Если нет ресторанов скорее всего пользователь перешл по прямой ссылке.
    // В этом случае инициализируем состояние
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

    // Поиск подходящего ресторана по координатам из URL
    const restaurant = restaurants.find(element => {
        const coordinates = element.geometry.coordinates;
        const elementCoordinates = [...coordinates].reverse();
        const coordinatesString = `${elementCoordinates[0]}-${elementCoordinates[1]}`;
        const coordinatesInUrl = params.coordinates;

        return coordinatesInUrl === coordinatesString;
    });

    // Получаем мета информацию о ресторане
    const restaurantInfo = restaurant?.properties.CompanyMetaData

    useEffect(() => {
        const redirectNotFound = !restaurant && restaurants.length > 0;
        // Если ресторан не найден редиректим на 404
        if (redirectNotFound) {
            navigate('/404');
        }

    }, [restaurant, restaurants])

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "64px"
        }}>
            <div>
                <div className="button-wrap">
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            marginBottom: "12px",
                            cursor: "pointer"
                        }}
                    >
                        Назад
                    </button>
                </div>
                {
                    restaurant ?
                    (
                        <div className={"restaurant-info"}>
                            <h1>{restaurantInfo.name}</h1>
                            <div className="restaurant-info__row">
                                Время работы: {restaurantInfo.Hours.text}
                            </div>
                            <div className="restaurant-info__row">
                                Адрес: {restaurantInfo.address}
                            </div>
                            <div className="restaurant-info__row">
                                Сайт: <a
                                    target={"_blank"}
                                    href={restaurantInfo.url}
                                >
                                    {restaurantInfo.url}
                                </a>
                            </div>
                        </div>
                    )
                    :
                    (
                        <PreloaderRoller/>
                    )
                }

            </div>

        </div>
    )
}

export default Restaurant;