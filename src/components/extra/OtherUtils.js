import {getJson} from "@/components/ExtraUtils.js";

export function orgCount(url, start, end) {
    let api = url.concat(`/find/organize/periodCount?start=${start}&end=${end}`)
    return getJson(api);
}

export function clubCount(url, start, end) {
    let api = url.concat(`/find/club/sportsmenCount?start=${start}&end=${end}`)
    return getJson(api);
}

export function addClub(server, name) {
    let data = {
        "name": name
    }
    let url = server.concat("/data/club")
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export function addSport(server, name) {
    let data = {
        "name": name
    }
    let url = server.concat("/data/sport")
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export function addOrg(server, name) {
    let data = {
        "name": name
    }
    let url = server.concat("/data/organize")
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}