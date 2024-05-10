export function getFormattedCoaches(array) {
    return array.map(item => `${item.coach.name} (${item.coach.id})`);
}