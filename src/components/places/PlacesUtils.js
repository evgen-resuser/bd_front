export async function getPlacesList(url) {
    let api = url.concat("/data/place");
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function getCompetitionsList(url, id, typeId) {
    let api = url.concat('/find/competition/byPlace?id=',id, '&type=', typeId);
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export function getSportList(url){
    let api = url.concat('/data/sport')
    return getJson(api)
}

export function getPlacesBySport(url, placeId, typeId, sportId){
    let api = url.concat('/find/competition/byPlace1?id=',placeId, '&type=', typeId, '&sport=', sportId);
    return getJson(api)
}

async function getJson(api) {
    console.log(api)
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export function getStadiumsByParams(server, stdSq, stdPl, stdIsCov) {
    let api = server.concat("/find/place/stadium?covered=", stdIsCov, "&pl_mn=", stdPl, "&sq_mn=", stdSq)
    return getJson(api)
}

export function getPoolsByParams(server, lanes, depth, len) {
    let api = server.concat("/find/place/pool?lane_mn=", lanes, "&dep_mn=", depth, "&len_mn=", len)
    return getJson(api)
}

export function getGymsByParams(server, square) {
    let api = server.concat("/find/place/gym?sq_mn=", square)
    return getJson(api)
}

export async function addPlace(url, data, type) {
    let api = url.concat("/data/place/", type);
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function deletePlace(url, id, type) {
    let api = url.concat("/data/place/", type, "/", id);
    console.log(api)
    fetch(api, {
        method: 'DELETE',
    })
        .catch(error => console.error('Error:', error));
}

export function getPlaceCompPeriod(server, start, end) {
    let api = server.concat(`/find/place/period?start=${start}&end=${end}`)
    return getJson(api)
}

export async function addParticipation(url, data) {
    let api = url.concat("/data/participation");
    console.log(data)
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

