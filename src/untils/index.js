export async function searchByOrganizations({
    apikey = '',
    text = '',
    spn = '',
    results = 10,
    rspn = 0
}) {
    const url = `https://search-maps.yandex.ru/v1/?text=${text}&type=biz&lang=ru_RU&apikey=${apikey}&spn=${spn}&results=${results}&rspn=${rspn}`;
    const response = await fetch(url);
  
    if (response.ok) {
      const json = await response.json();
      return json;
    }

    return {
        error: response.status
    }
}

export async function initState({setting, mapProps, setMapsProps, user, dispatch, addRestaurantsList, setCoordinates}) {
    const knownLocation = user.coordinates.length !== 0;

    if ( !knownLocation ) {
        navigator.geolocation.getCurrentPosition(getGeoHandler, getGeoHandler);
    }

    async function getGeoHandler(geoData) {

        const coordinates = geoData.coords ? [geoData.coords.latitude, geoData.coords.longitude] : setting.user.defaultCoordinates

        const requestData = {
            text: setting.searchByOrganizations.queryText,
            apikey: setting.searchByOrganizations.apikey,
            spn: setting.searchByOrganizations.spn,
            results: setting.searchByOrganizations.results,
            rspn: setting.searchByOrganizations.rspn
        }

        const json = await searchByOrganizations(requestData);

        if (!json.error) {

            dispatch(addRestaurantsList(json.features));
            dispatch(setCoordinates(coordinates));

            setMapsProps({...mapProps, center: coordinates});
            return;
        }

        alert(json.error);
    }
}