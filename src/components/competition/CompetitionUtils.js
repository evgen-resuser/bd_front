import {getJson} from "@/components/ExtraUtils.js";

export function getAllCompetitions(url) {
    let api = url.concat("/data/competition")
    return getJson(api);
}

export function getAllOrgs(url) {
    let api = url.concat("/data/organize")
    return getJson(api);
}

export function getCompByOrg(server, org){
    let api = server.concat(`/find/competition/org?org=${org}`)
    return getJson(api)
}

export function getCompByPeriodOrg(server, start, end, org){
    let api = server.concat(`/find/competition/periodOrg?start=${start}&end=${end}&org=${org}`)
    return getJson(api)
}

export function getWinners(server, comp){
    let api = server.concat(`/data/winners/${comp}`)
    return getJson(api)
}

export function postCompetition(server, data) {
    let url = server.concat("/data/competition")
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export function getOrgsPeriod(server, start, end){
    let api = server.concat(`/find/organize/periodCount?start=${start}&end=${end}`)
    return getJson(api)
}
