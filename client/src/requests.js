async function getWeatherData(lat, long) {
    const resp = await fetch(`http://localhost:3001/weather?lat=${lat}&long=${long}`);
    const data = await resp.json();
    return data;
}

export {
    getWeatherData
}