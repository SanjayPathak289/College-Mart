import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Myproduct from "./Myproduct"
import { useNavigate } from 'react-router-dom';
const Myproducts = () => {
    axios.defaults.withCredentials = true;
    const [myProducts, setMyProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/api/product/myproducts").then((res) => {
        
            if (res.data.message === "Error") {
                navigate("/signin");
            }
            setMyProducts(res.data);
        }).catch(err => console.log(err));
    }, [])
    return (
        <>
            <div className='myProductsContainer'>



                {myProducts && myProducts.productinfo && myProducts.productinfo.length > 0 ? (
                    myProducts.productinfo.map((val) => (
                        (
                            < Myproduct
                                key={myProducts._id}
                                userId={myProducts._id}
                                product={val}
                            />
                        )
                    ))
                ) : (
                    <p>No products</p>
                )}
            </div>
        </>
    )
}

export default Myproducts