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
    console.log(api)
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
