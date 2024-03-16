import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Flex, Avatar, Box, Text, Card, Button} from "@radix-ui/themes";
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon,} from '@radix-ui/react-icons';
const Profile = () => {

    axios.defaults.withCredentials = true;
    // var profile1 = JSON.parse(localStorage.getItem("user"));
    const [myListings, setMyListings] = useState(false);
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const inputEvent = (event) => {
        const { name, value } = event.target;
        setProfile({
            ...profile,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/user/profile").then((res) => {
            if (res.data.message !== "Error") {
                setProfile(res.data);
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
                                    <Link to={"/productinfo"} state={{ userId: localStorage.getItem("user")._id, product: val }} >
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
                        {/* <Dialog.Root>
                            <Dialog.Trigger>
                                <Button><Pencil2Icon />Update</Button>
                            </Dialog.Trigger>

                            <Dialog.Content style={{ maxWidth: 450 }}>
                                <Dialog.Title>Edit profile</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    Make changes to your profile.
                                </Dialog.Description>

                                <Flex direction="column" gap="3">
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            First Name
                                        </Text>
                                        <TextField.Input
                                            defaultValue={profile.fname}
                                            placeholder="Enter your full name"
                                            onChange={inputEvent}
                                            name='fname'
                                        />
                                    </label>
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Last Name
                                        </Text>
                                        <TextField.Input
                                            defaultValue={profile.lname}
                                            placeholder="Enter your full name"
                                            onChange={inputEvent}
                                            name='lname'
                                        />
                                    </label>
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Email
                                        </Text>
                                        <TextField.Input
                                            defaultValue={profile.email}
                                            placeholder="Enter your email"
                                            onChange={inputEvent}
                                            name='email'
                                        />
                                    </label>
                                </Flex>

                                <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <Button onClick={saveUpdatedProfile}>Save</Button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root> */}





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