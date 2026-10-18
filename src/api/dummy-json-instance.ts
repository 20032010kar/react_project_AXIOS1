import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 10000,
    headers:{
        'Content-Type':'application/json'
    }
})

// До кожного запиту буде додаватись заголовок з токеном авторизації
// тільки при умові що він є
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization =`Bearer ${token}`
    }
    return config
},(error)=>Promise.reject(error))

export default api;