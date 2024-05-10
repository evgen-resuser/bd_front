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