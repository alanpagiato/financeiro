let currentTime = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const hour = String(new Date().getHours()).padStart(2, '0');
    const minute = String(new Date().getMinutes()).padStart(2, '0');
    const second = String(new Date().getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

module.exports = currentTime;