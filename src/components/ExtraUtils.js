export async function getSports(server) {
    let api = server.concat("/data/sport");
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function getJson(api) {
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export function placeFinder(entry, id) {
    if (entry.first.id === id) return 1;
    if (entry.second.id === id) return 2;
    if (entry.third.id === id) return 3;
    return -1
}