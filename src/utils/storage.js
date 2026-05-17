const setDataIntoStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getDataFromStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export { setDataIntoStorage, getDataFromStorage }