import { createContext, useContext, useState, useEffect } from "react";
import axios from '../axios'

const UserContext = createContext(null)



export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [err, setErr] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('user'))
            setUser(JSON.parse(localStorage.getItem('user')))

        else setUser(null)

    }, [])


    const login = async (values) => {
        const { email, password } = values
        const { data } = await axios.post('/login', { email, password })
        if (data === 'incorrect') return setErr(data)

        setErr(false)
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
    }

    const register = async (values) => {
        const { fullname, email, password } = values

        const { data } = await axios.post('/register', { fullname, email, password })
        if (data === 'exist') return setErr(data)

        setErr(false)
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }


    return (
        <UserContext.Provider
            value={{
                user, setUser,
                login, register, logout,
                err, setErr,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}