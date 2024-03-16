import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button } from '@radix-ui/themes';
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='homeContainer'>
                <div className='leftHome'>
                    <p style={{ color: "#3772ff" }}>Sell Your Courses</p>
                    <p>Earn Money</p>
                    <Button size={"4"} style={{
                        marginTop: "1rem",
                        cursor: "pointer",
                        backgroundColor: "#3772ff"
                    }} className='getStarted'

                        onClick={() => { JSON.parse(localStorage.getItem("user")) ? navigate("/additem") : navigate("/signin") }}
                    >
                        Get Started


                    </Button>
                </div>
                <div className='rightHome'>
                    <img style={{ maxWidth: "90%" }} alt="" src="/images/mainbg.png" />
                </div>
            </div>
        </>
    )
}
export default Home;