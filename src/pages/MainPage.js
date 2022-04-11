import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Map from '../components/map';
import {initState} from "../untils";
import setting from "../setting.json"
import {addRestaurantsList} from "../store/restaurantsReducer";
import {setCoordinates} from "../store/userReducer";
import PreloaderRoller from "../components/preloaders/PreloaderRoller";

function MainPage() {
    const dispatch = useDispatch();
    const [showPreloader, setShowPreloader] = useState(true);
    const restaurants = useSelector(state => state.restaurants);
    const user = useSelector(state => state.user);
    const [mapProps, setMapsProps] = useState(
        {
            center: user.coordinates,
            zoom: setting.map.zoom
        }
    );

    // После загрузки карты скрываем прелоадер
    const onLoadMap = () => setShowPreloader(false);

    // Запускается при монтировании компонента
    // Здесь инициируем состояние компонента
    useEffect(() => {
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
    });

    return (
        <div
            className="App"
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "64px",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <h1>Карта</h1>
            <h2>Выберите ресторан:</h2>
            {
                showPreloader && <PreloaderRoller />
            }
            {
                restaurants.list.length > 0 &&
                    <Map
                        apikey={setting.map.apikey}
                        points={restaurants.list}
                        mapProps={mapProps}
                        onLoadMap={onLoadMap}
                    />
            }
        </div>
    );
}

export default MainPage;
