import {getJson} from "@/components/ExtraUtils.js";


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

export async function getSportsOfSportsman(url, id){
    let api = url.concat("/find/sportsman/sports/", id);
    return await getJson(api)
}

export async function showSportsmenBySport(url, sportId){
    let api = url.concat("/find/sportsman/bySport?sport=", sportId)
    let data = await getJson(api)
    console.log(data)
    return data
}

export async function showSportsmenBySportDisch(url, sportId, disch){
    let api = url.concat("/find/sportsman/bySport?sport=", sportId, "&discharge=", disch)
    let data = await getJson(api)
    console.log(data)
    return data
}

export async function getClubs(url) {
    let api = url.concat("/data/club")
    return await getJson(api)
}

export async function addSportToSportsman(url, sportId, sportsmanId) {
    let api = url.concat("/data/sportSportsman");
    let data = {
        "sportId": sportId,
        "sportsmanId": sportsmanId
    }
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function addSportsman(url, data) {
    let api = url.concat("/data/sportsman");
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function deleteSportsman(url, id) {
    let api = url.concat("/data/sportsman/", id);
    fetch(api, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function twoOrMore(url) {
    let api = url.concat("/find/sportsman/twoAndMore")
    return await getJson(api)
}

export async function competitions(url, id) {
    let api = url.concat("/find/competition/bySportsman?id=", id)
    return await getJson(api)
}

export async function nonParticipating(url, start, end) {
    let api = url.concat(`/find/competition/notPartSportsmen?start=${start}&end=${end}`)
    return await getJson(api)
}
