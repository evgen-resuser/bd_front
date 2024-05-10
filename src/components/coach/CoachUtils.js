export async function getCoachesList(url) {
    let api = url.concat("/data/coach");
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function addCoachTo(id, coachId, url){
    let api = url.concat("/data/coach_sportsman");
    fetch(api, {
        method: 'POST',
        body: JSON.stringify({
                "sportsmanId": id,
                "coachId": coachId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function getCoachesListBySport(url, sportId) {
    let api = url.concat("/find/coach/bySport?id=", sportId);
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function getSportsmenOfCoach(url, id, discharge) {
    let api
    if (discharge === null) {
        api = url.concat("/find/coach/sportsmen?id=", id)
    } else {
        api = url.concat("/find/coach/sportsmen?id=", id, "&disch=", discharge)
    }
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
