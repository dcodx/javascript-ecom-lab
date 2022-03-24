import { createContext, useContext, useEffect, useState } from "react";
import axios from '../axios'

const ProductsContext = createContext(null)



export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [searched, setSearched] = useState('')


    const getProducts = async () => {
        const { data } = await axios('/products')
        setProducts(data)
    }



    const searchProducts = async (query) => {
        if (!query) return getProducts()

        const { data } = await axios.post('/search', { query })
        setProducts(data)
        setSearched(query)
    }


    useEffect(() => {


        getProducts()

    }, [])


    return (
        <ProductsContext.Provider
            value={{
                products, setProducts,
                searchProducts, searched
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => {
    return useContext(ProductsContext)
}