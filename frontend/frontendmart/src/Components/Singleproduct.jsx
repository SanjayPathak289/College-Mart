import { Button } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductInfo from './ProductInfo'
import { Tooltip } from '@radix-ui/themes'
import axios from 'axios'
const Singleproduct = (props) => {
    const [id, setId] = useState("");
    const [owner, setOwner] = useState("");
    useEffect(() => {
        setId(props.id);
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("https://investment-compass.onrender.com/api/user/getuser", {
                params: {
                    user: props.user
                }
            });
            if (res.data.message !== "Error") {
                setOwner(res.data.fname + " " + res.data.lname);
            }

        }
        fetchUser();
    })
    return (
        <>
            <div className='myProductInfo'>
                <div className='myImageProduct'>
                    {props.pimage ? <img src={"https://investment-compass.onrender.com/uploads/" + props.pimage[0]} alt="" />
                        : null}
                </div>
                <div className='myInfoProduct'>
                    <p>Owner : {owner}</p>
                    <Tooltip content="Product Name">
                        <p>Name : {props.pname}</p>
                    </Tooltip>
                    <Tooltip content="Product Description">
                        <p>Desc : {props.pdesc}</p>
                    </Tooltip>
                    <Tooltip content="Product Category">
                        <p>Category : {props.pcateg}</p>
                    </Tooltip>
                    <Tooltip content="Product Price">
                        <p>Price : {props.pprice}</p>
                    </Tooltip>


                    <Link to={"/productinfo"} state={{ owner: owner, userId: id, productState: props }}><Button style={{ cursor: "pointer" }} >Know More</Button></Link>

                </div>
            </div>

        </>
    )
}

export default Singleproduct