import React, { useEffect, useState } from 'react'
import { Badge, Button, Tooltip } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Myproduct = ({ userId, product }) => {
    const [owner, setOwner] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("http://localhost:3000/api/user/getbyid", {
                params: {
                    user: userId
                }
            });
            if (res.data.message !== "Error") {
                setOwner(res.data.fname + " " + res.data.lname);
            }

        }
        fetchUser();
    })
    
    return (
        <div className='myProductInfo'>
            <div className='myImageProduct'>
                {product.pimage ? <img src={"http://localhost:3000/uploads/" + product.pimage[0]} alt="" />
                    : null}
            </div>
            <div className='myInfoProduct'>
                <Tooltip content="Product Name">
                    <p>{product.pname}</p>
                </Tooltip>
                <Tooltip content="Product Description">
                    <p>{product.pdesc}</p>
                </Tooltip>
                <Tooltip content="Product Category">
                    <p>{product.pcateg}</p>
                </Tooltip>
                <Tooltip content="Product Price">
                    <p>{product.pprice}</p>
                </Tooltip>


                <Link to={"/productinfo"} state={{ owner: owner, userId: userId, productState: product }}><Button style={{ cursor: "pointer" }} >Know More</Button></Link>


            </div>
        </div>
    )
}

export default Myproduct