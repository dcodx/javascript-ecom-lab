import axios from 'axios'


const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken || ''

const PORT = process.env.REACT_APP_PORT || 5000

const instance = axios.create({
    baseURL: `http://0.0.0.0:${PORT}/user`,
    headers: {
        token: `Bearer ${accessToken}`
    }
})


export default instance