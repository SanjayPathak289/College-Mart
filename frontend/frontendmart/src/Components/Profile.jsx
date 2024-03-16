import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Flex, Avatar, Box, Text, Card, Button } from "@radix-ui/themes";
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon, } from '@radix-ui/react-icons';
const Profile = () => {

    axios.defaults.withCredentials = true;
    // var profile1 = JSON.parse(localStorage.getItem("user"));
    const [myListings, setMyListings] = useState(false);
    const [profile, setProfile] = useState({});
    const [owner, setOwner] = useState("");
    const navigate = useNavigate();
    const inputEvent = (event) => {
        const { name, value } = event.target;
        setProfile({
            ...profile,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get("https://investment-compass.onrender.com/api/user/profile").then((res) => {
            if (res.data.message !== "Error") {
                setProfile(res.data);
                setOwner(`${res.data.fname} ${res.data.lname}`)
            }
            else {
                navigate("/");
            }
        }).catch(err => console.log(err));
    }, [])
    return (
        <>
            <div className='profileBox'>
                <div className='leftProfileBox'>
                    <div className='statsBox'>
                        <div >
                            <p>Your Course Listed</p>
                            {profile && profile.productinfo &&
                                <div className='itemListed' >
                                    {profile.productinfo.length}

                                </div>
                            }
                        </div>


                    </div>



                    <div className="listings">

                        <Button style={{
                            width: "100%",
                            backgroundColor: "#3772ff",
                            cursor: "pointer"
                        }} onClick={() => { setMyListings(!myListings) }}>
                            Show Listings
                            {myListings ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </Button>

                        <div className="myAllListing">
                            {myListings && profile && profile.productinfo && profile.productinfo.map((val => {
                                return (
                                    <Link to={"/productinfo"} state={{ userId: profile._id, owner: owner, productState: val }} >
                                        <div className='listObject' style={{ cursor: 'pointer' }}>
                                            {val.pname}

                                        </div>
                                    </Link>
                                )
                            }))}
                        </div>
                    </div>


                </div>
                <div className='rightProfileBox'>
                    <div className='name'>

                        <Card style={{ maxWidth: 280 }}>
                            <Flex gap="3" align="center">
                                {
                                    profile && profile.fname && <Avatar variant="soft" fallback={profile.fname[0] + profile.lname[0]} size="5" />

                                }
                                <Box style={{ textAlign: "center" }}>
                                    <Text as="div" size="7" weight="medium" style={{ textTransform: "capitalize" }}>
                                        {profile.fname} {profile.lname}
                                    </Text>

                                </Box>
                            </Flex>
                        </Card>






                    </div>
                    <Card style={{ maxWidth: 280 }}>
                        <Flex gap="3" align="center">
                            <Box style={{ textAlign: "center" }}>
                                <Text as="div" size="4" >
                                    {profile.email}
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Profile