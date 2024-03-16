import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { BookmarkIcon, ButtonIcon, Cross1Icon, HeartFilledIcon, HeartIcon, Pencil2Icon, UpdateIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import ShowMessages from "./ShowMessages"

const ProductInfo = (props) => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [isWishList, setWishList] = useState(false);
    const location = useLocation();
    const [isChatOpen, setChatOpen] = useState(false);
    const [firstImgSrc, setFirstImgSrc] = useState(0);
    const [referralId, setReferralId] = useSearchParams();
    const refId = referralId.get("id");
    var owner, userId, productState;
    if (location.state) {
        owner = location.state.owner
        userId = location.state.userId
        productState = location.state.productState
    }
    else {
        owner = props.owner;
        userId = props.userId;
        productState = props.productState
    }
    // console.log(productState);
    const id = productState.productId ? productState.productId : productState._id
    const [updateCourse, setupdateCourse] = useState({
        pname: productState.pname,
        pdesc: productState.pdesc,
        pcateg: productState.pcateg,
        pprice: productState.pprice,
        _id: id
    });
    const [product, setProduct] = useState({
        ...productState
    })
    const textFieldRef = useRef(null);
    const [copyState, setCopyState] = useState("Copy")

    useEffect(() => {
        setChatOpen(isChatOpen);
    }, [setChatOpen])
    useEffect(() => {
        const p = () => {
            axios.get("https://investment-compass.onrender.com/api/product/addwishlist", {
                params: {
                    param1: userId,
                    param2: product
                }
            }).then((res) => {
                if (res.data.inwishList) {
                    setWishList(true);
                }
                else {
                    setWishList(false);
                }
            })
        }
        p();
    }, [])

    axios.defaults.withCredentials = true;
    const addWhishlist = () => {
        if (localStorage.getItem("user")) {
            if (!isWishList) {
                axios.post("https://investment-compass.onrender.com/api/product/addwishlist", { userId, product })
                    .then((res) => {
                        if (res.data.added) {
                            setWishList(true);
                        }
                    })
            }
            else {
                axios.delete("https://investment-compass.onrender.com/api/product/addwishlist", {
                    data: {
                        userId: userId,
                        product: product
                    }

                }).then((res) => {
                    if (res.data.deleted) {
                        setWishList(false);
                    }
                })
            }
        }
        else {
            alert("Login First");
        }

    }
    const deleteCourse = () => {
        try {
            axios.delete("https://investment-compass.onrender.com/api/product/delete", {
                data: {
                    userId: userId,
                    product: product
                }

            }).then((res) => {
                if (res.data.deleted) {
                    navigate("/myproducts");
                }
            })
        }
        catch (error) {
            console.log(error);
        }

    }

    const updateCourseAction = () => {
        setProduct({
            pimage: product.pimage,
            ...updateCourse,
        })
        axios.post("https://investment-compass.onrender.com/api/product/updateCourse", {
            userId, product: updateCourse

        }).then((res) => {
            if (res.data.updated) {
                navigate("/myproducts");
            }
        })
    }
    const inputEvent = (event) => {
        const { name, value } = event.target;

        setupdateCourse({
            ...updateCourse,
            [name]: value
        })
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText("https://investment-compass.onrender.com/referral?id=" + JSON.parse(localStorage.getItem("user"))._id + id);
        setCopyState("Copied");
    }

    const saveBuyData = async () => {
        const { data } = await axios.post("https://investment-compass.onrender.com/api/payment/save",
            {
                userId: JSON.parse(localStorage.getItem("user"))._id,
                id: id,
                pname: product.pname,
                pprice: product.pprice
            })
        if (data.added) {
            console.log("added");
        }
    }


    var d = product.pimage[0].replace(" ", "%20");
    const initPayment = (data) => {
        const options = {
            key: "rzp_test_QK9uiloGmKztDv",
            amount: data.amount,
            currency: data.currency,
            name: product.pname,
            description: product.pdesc,
            image: `https://investment-compass.onrender.com/uploads/${d}`,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const whoBought = `${JSON.parse(localStorage.getItem("user")).fname} ${JSON.parse(localStorage.getItem("user")).lname}`
                    const { data } = await axios.post("https://investment-compass.onrender.com/api/payment/verify", { response, refId, whoBought, userId });
                    if (data.message == "Payment Verified Successfully") {
                        saveBuyData();
                        navigate("/mypurchases")
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc"
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();

    }
    const handlePayment = async (req, res) => {
        try {
            const { data } = await axios.post("https://investment-compass.onrender.com/api/payment/orders", {
                amount: product.pprice
            })
            // console.log(data);
            initPayment(data.data)

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='productTab'>

            <div className="imageTab">
                <div className='firstImageTab'>
                    {
                        product && product.pimage && product.pimage.length ? <img style={{ borderRadius: "20px" }} src={"https://investment-compass.onrender.com/uploads/" + product.pimage[firstImgSrc]} alt="" /> : null
                    }
                </div>
                <div className='remainingImageTab'>
                    {
                        product && product.pimage && product.pimage.length > 1 ? product.pimage.map((val, index) => {
                            return (
                                <img key={index} style={{ borderRadius: "10px", cursor: "pointer", border: index === firstImgSrc ? "2px solid black" : null }} src={"https://investment-compass.onrender.com/uploads/" + val} alt="Photo" onClick={() => setFirstImgSrc(index)} />
                            )
                        }) : null
                    }
                </div>

            </div>

            <div className='infoTab'>
                <div>
                    {userId && localStorage.getItem("user") && userId == JSON.parse(localStorage.getItem("user"))._id ?
                        <>
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button style={{ marginRight: "1rem", cursor: "pointer" }}>
                                        <Pencil2Icon />Update
                                    </Button>
                                </Dialog.Trigger>

                                <Dialog.Content style={{ maxWidth: 450 }}>
                                    <Dialog.Title>Edit Course</Dialog.Title>
                                    <Dialog.Description size="2" mb="4">
                                        Make changes to your course.
                                    </Dialog.Description>

                                    <Flex direction="column" gap="3">
                                        <label>
                                            <Text as="div" size="2" mb="1" weight="bold">
                                                Name
                                            </Text>
                                            <TextField.Input
                                                onChange={inputEvent}
                                                defaultValue={product.pname}
                                                name='pname'
                                                placeholder="Enter your full name"
                                            />
                                        </label>
                                        <label>
                                            <Text as="div" size="2" mb="1" weight="bold">
                                                Description
                                            </Text>
                                            <TextField.Input
                                                name='pdesc'
                                                onChange={inputEvent}
                                                defaultValue={product.pdesc}
                                                placeholder="Enter your email"
                                            />
                                        </label>
                                        <label>
                                            <Text as="div" size="2" mb="1" weight="bold">
                                                Category
                                            </Text>
                                            <select name="pcateg" id="pcateg" onChange={inputEvent} required defaultValue={product.pcateg}>
                                                <option value="" disabled selected>Select your Category</option>
                                                <option value="academics">Academics</option>
                                                <option value="technology">Technology</option>
                                                <option value="investments">Investments</option>
                                                <option value="trading">Trading</option>
                                                <option value="miscellaneous">Miscellaneous</option>
                                            </select>
                                        </label>
                                        <label>
                                            <Text as="div" size="2" mb="1" weight="bold">
                                                Price
                                            </Text>
                                            <TextField.Input
                                                name='pprice'
                                                onChange={inputEvent}
                                                defaultValue={product.pprice}
                                                placeholder="Enter your email"
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
                                            <Button onClick={updateCourseAction}>Save</Button>
                                        </Dialog.Close>
                                    </Flex>
                                </Dialog.Content>

                            </Dialog.Root>
                            <Button style={{ cursor: "pointer" }} onClick={deleteCourse}>
                                <Cross1Icon />Delete
                            </Button>
                        </>
                        : null}
                </div>

                {owner ? <p style={{ fontSize: "2rem", fontWeight: "bolder", backgroundColor: "#3772ff", padding: "0.2rem", borderRadius: "10px", color: "white" }}>Owner : {owner}</p> : null}
                <p style={{ fontSize: "2rem", fontWeight: "bolder" }}>Course : {product && product.pname}</p>
                <p>Desc : {product && product.pdesc}</p>
                <p>Category : {product && product.pcateg}</p>
                <p>Price : {product && product.pprice}</p>
                <Button color='red' onClick={addWhishlist} style={{ cursor: "pointer" }} size={"3"}>
                    {isWishList ? <HeartFilledIcon /> : <HeartIcon />} WishList
                </Button>
                {userId != JSON.parse(localStorage.getItem("user"))._id ? <Button style={{ cursor: "pointer" }} size={"3"} onClick={handlePayment}>Buy Now</Button> : null}

                {
                    <Button onClick={() => setChatOpen(!isChatOpen)} size={"3"} style={{ cursor: "pointer" }}>Open Chat</Button>
                }
                {isChatOpen ? (localStorage.getItem("user") ?


                    <div className='chatBox'>
                        <button onClick={() => setChatOpen(!isChatOpen)}>X</button>
                        <ShowMessages info={product} rId={userId} sender={JSON.parse(localStorage.getItem("user"))} />

                    </div> : <div>Login First</div>)


                    : null
                }
                {
                    localStorage.getItem("user") && location.state ?
                        <>
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button style={{ cursor: "pointer" }} size={"3"}>Create Referral</Button>
                                </Dialog.Trigger>

                                <Dialog.Content style={{ maxWidth: 450 }}>
                                    <Dialog.Title>Your Referral Link</Dialog.Title>
                                    <Dialog.Description size="2" mb="4">
                                        Share it
                                    </Dialog.Description>

                                    <Flex direction="column" gap="3">
                                        <label>
                                            <TextField.Input disabled
                                                ref={textFieldRef}
                                                defaultValue={"https://investment-compass.onrender.com/referral?id=" + JSON.parse(localStorage.getItem("user"))._id + id}
                                                placeholder="Your referral link"
                                            />
                                            <Button onClick={copyToClipboard}>{copyState}</Button>
                                        </label>

                                    </Flex>

                                    <Flex gap="3" mt="4" justify="end">
                                        <Dialog.Close>
                                            <Button variant="soft" color="gray" onClick={() => setCopyState("Copy")}>
                                                Cancel
                                            </Button>
                                        </Dialog.Close>
                                    </Flex>
                                </Dialog.Content>
                            </Dialog.Root>
                        </> :
                        null
                }

            </div>

        </div>
    )
}

export default ProductInfo