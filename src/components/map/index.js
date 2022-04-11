import React from 'react';
import {
    YMaps,
    Map as YMap,
    Placemark
} from 'react-yandex-maps';
import { useNavigate, } from 'react-router-dom'

function Map({
    apikey,
    points, // точки которые будут отображены на карте
    mapProps,
    onLoadMap
}) {
    const navigate = useNavigate();
    const onLoad = () => {
        typeof onLoadMap === 'function' && onLoadMap();
    }

    return (
        <>
            <YMaps
                query={{
                    apikey
                }}
            >
                <YMap
                    defaultState={mapProps}
                    width={600}
                    height={600}
                    onLoad={onLoad}
                >
                    {
                        points.length !== 0 && points.map((point, index) => {
                            const label = point.properties.name;
                            const coordinates = [...point.geometry.coordinates]
                            coordinates.reverse();
                            const coordinatesString = `${coordinates[0]}-${coordinates[1]}`

                            return (
                                <Placemark
                                    key={index}
                                    geometry={coordinates}
                                    properties={{
                                        iconCaption: label
                                    }}
                                    onClick={() => navigate(`/restaurant/${coordinatesString}`)}
                                />
                            )
                        })
                    }
                </YMap>
            </YMaps>
        </>

    )
}

export default Map;