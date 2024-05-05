import axios from "axios";

export function getFormattedCoaches(array) {
    const result = array.map(item => `${item.coach.name} (${item.coach.id})`);
    return result;
}

export function getSports(url, id, discharge){
    if (isNaN(discharge)) return  null;

}