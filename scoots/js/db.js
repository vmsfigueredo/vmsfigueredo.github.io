const db = {
    get: () => {
        return fetch('data/db.json').then(response => response.json());
    }
}
