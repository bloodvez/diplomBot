export function beautifyDate(date:Date):string{
    //making hours and minutes look nice
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    let day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay()
    let month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    return `${day}.${month} в ${hour}:${minute}`
}