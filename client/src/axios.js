import axios from 'axios'


const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken || ''


const instance = axios.create({
    baseURL: 'http://0.0.0.0:5000/user',
    headers: {
        token: `Bearer ${accessToken}`
    }
})


export default instance