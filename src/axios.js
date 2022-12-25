import axios from "axios"


export const makeRequest = axios.create({
    baseURL: "https://crowdhub-api-production.up.railway.app/api/",
    withCredentials: true
})
