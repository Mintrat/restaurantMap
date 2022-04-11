export async function searchByOrganizations({
    apikey = '', // ключ для доста к api
    text = '', // текст по которому производится поиск
    spn = '', // размеры области поиска
    results = 10, // количество результатов в ответе
    rspn = 0 // не искать за пределами области поиска
                    //0 — не ограничивать поиск. Используется по умолчанию.
                    // 1 — не искать за пределами заданной области.
}) {
    const url = `https://search-maps.yandex.ru/v1/?` +
        `text=${text}` +
        `&type=biz&lang=ru_RU&` +
        `apikey=${apikey}&` +
        `spn=${spn}` +
        `&results=${results}` +
        `&rspn=${rspn}`;
    const response = await fetch(url);
  
    if (response.ok) {
        return await response.json();
    }

    return {
        error: response.status
    }
}

// Инициализирует состояние сервиса. Делает запросы по api чтоб вытащить список ресторанов
export async function initState({
    setting, // json объект со стандартнами настройками сервиса
    mapProps, // настройки для рендера карты
    setMapsProps, // хук useState для параметра mapProps
    user, // акиуальные данные о пользователи
    dispatch,
    addRestaurantsList, // функция, которая возвращает объект для dispatch
    setCoordinates, // функция, которая возвращает объект для dispatch для установлени координта пользователя
}) {
    const knownLocation = user.coordinates.length !== 0;

    if ( !knownLocation ) {
        navigator.geolocation.getCurrentPosition(getGeoHandler, getGeoHandler);
    }

    // Функция обработчик, инициализирует состояние в зависимости от того для ли пользователь
    // разрешение на доступ к GEO
    // В случае успеха получения данных устанавливает список ресторанов и координаты пользователя
    // В случае ошибки выведет alert с текстом ошибки
    async function getGeoHandler(geoData) {

        const coordinates = geoData.coords ?
            [geoData.coords.latitude, geoData.coords.longitude]
            :
            setting.user.defaultCoordinates;

        const {
            queryText,
            apikey,
            spn,
            results,
            rspn
        } = setting.searchByOrganizations;

        const requestData = {
            text: queryText,
            apikey: apikey,
            spn: spn,
            results: results,
            rspn: rspn
        }

        const json = await searchByOrganizations(requestData);


        if (!json.error) {
            const dispatcherRestaurants = addRestaurantsList(json.features);
            const dispatcherCoordinates = setCoordinates(coordinates);

            dispatch(dispatcherRestaurants);
            dispatch(dispatcherCoordinates);
            setMapsProps({...mapProps, center: coordinates});

            return;
        }

        alert(json.error);
    }
}