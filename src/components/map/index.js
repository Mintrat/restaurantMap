import React from 'react';
import {
    YMaps,
    Map as YMap,
    Placemark
} from 'react-yandex-maps';
import { useNavigate, } from 'react-router-dom'

function Map({apikey, points, mapProps}) {
    const navigate = useNavigate();

    return (
        <YMaps
          query={{
            apikey
          }}
        >
        <YMap 
          defaultState={mapProps}  
          width={600}
          height={600}
        >
        { 
          points.length !== 0 && points.map((point, index) => {
            const label = point.properties.name;
            const coordinates = [...point.geometry.coordinates]
            coordinates.reverse();

            return (
                <Placemark
                    key={index}
                    geometry={coordinates}
                    properties={{
                        iconCaption: label
                    }}
                    onClick={() => navigate(`/restaurant/${coordinates[0]}-${coordinates[1]}`)}
                />
            )
          })
        }
        </YMap>
      </YMaps>
    )
}

export default Map;