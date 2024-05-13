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

export async function postCoach(server, data) {
    let url = server.concat("/data/coach")
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
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

export async function deleteSportsman(url, coachId, sportsmanId) {
    let api = url.concat("/data/coach_sportsman");
    let data = {
        "sportsmanId": sportsmanId,
        "coachId": coachId
    };
    fetch(api, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function update(url, id, data) {
    let api = url.concat("/data/coach/", id);
    fetch(api, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function getSportsByCoach(url, id) {
    let api = url.concat(`/find/sport/byCoach?id=${id}`);
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function deleteSport(url, coachId, sportId) {
    let api = url.concat("/data/coach_sport");
    let data = {
        "sportId": sportId,
        "coachId": coachId
    };
    fetch(api, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function addSport(url, coachId, sportId) {
    let api = url.concat("/data/coach_sport");
    let data = {
        "sportId": sportId,
        "coachId": coachId
    };
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}

export async function addSportsman(url, coach, sportsman) {
    let api = url.concat("/data/coach_sportsman");
    let data = {
        "sportsmanId": sportsman,
        "coachId": coach
    };
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => console.error('Error:', error));
}