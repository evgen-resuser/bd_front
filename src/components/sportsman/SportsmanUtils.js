import axios from "axios";

export function getFormattedCoaches(array) {
    return array.map(item => `${item.coach.name} (${item.coach.id})`);
}

export async function getAllSportsmen(url) {
    let api = url.concat("/data/sportsman")
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}