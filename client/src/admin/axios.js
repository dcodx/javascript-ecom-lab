import axios from 'axios'


const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken || ''
console.log('accessToken:', accessToken)
console.log(localStorage.getItem('user'))
const PORT = process.env.REACT_APP_PORT || 5000

const instance = axios.create({
    baseURL: `http://0.0.0.0:${PORT}/admin`,
    headers: {
        token: `Bearer ${accessToken}`
    }
})


export default instance