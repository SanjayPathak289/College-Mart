import React, { useEffect, useState } from 'react'
import { TextField, TextArea, Select, Button } from '@radix-ui/themes'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Additem = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    useEffect(() => {
        if (user == undefined) {
            navigate("/signin");
        }
    }, [user])
    const [product, setProduct] = useState({
        pimage: [],
        pname: "",
        pdesc: "",
        pcateg: "",
        pprice: "",
    });
    const [imgSrc, setImgSrc] = useState([]);
    const [imgFile, setImgFile] = useState([]);
    const addProductInDb = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        imgSrc.forEach((file, index) => {
            formData.append("image", file);
        });
        const sendproductData = JSON.stringify(product);
        const header = new Headers();
        header.append('Content-Type', 'multipart/form-data; boundary=' + formData._boundary);
        const fetchOptions = {
            method: 'POST',
            headers: header,
            // body: sendproductData,
            body: formData
        };
        formData.append("json", sendproductData);
        // formData.append("image", imgFile)
        const res = await axios.post("http://localhost:8080/api/product/additem", formData)
        if (res.data.success) {
            setProduct({
                pimage: [],
                pname: "",
                pdesc: "",
                pcateg: "",
                pprice: "",
            })
            navigate("/myproducts");
        }

    }
    const inputEvent = (event) => {
        const { name, value, type, files } = event.target;
        // setProduct()

        if (type === 'file') {
            const imgNameArray = Array.from(files).map((file) => file.name);

            // console.log(files);
            const newFiles = Array.from(files);
            const uniqueFiles = newFiles.filter((newFile) => {
                return !imgSrc.some((existing) => existing.name === newFile.name);
            })
            const uniqueImgFile = newFiles.filter((newFile) => {
                return !imgFile.some((existing) => existing === newFile)
            })
            setImgSrc([...imgSrc, ...uniqueFiles]);
            setImgFile([...imgFile, ...uniqueImgFile])
            // console.log(imgSrc);
            setProduct({
                ...product,
                pimage: imgNameArray
            })
        }
        else {
            setProduct({
                ...product,
                [name]: value
            })
        }
    }
    const removeImg = (i) => {
        var updatedFiles = imgSrc.filter((_, index) => i != index);
        setImgSrc(updatedFiles);
    }
    return (
        <>
            <form onSubmit={addProductInDb} className='addItemBox' encType="multipart/form-data">
                {/* <form> */}
                <div className='leftItemBox'>
                    <div className='productImage'>
                        {/* <img src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" /> */}
                        <label htmlFor="pimage" className='addIcon'>
                            <span>
                                ➕
                            </span>
                        </label>
                        <input type="file" name="pimage" multiple="multiple" accept="image/*" id="pimage" onChange={inputEvent} />
                    </div>
                    <div className="imagePreview">
                        {imgSrc.map((val, index) => {
                            return <>
                                <div className='previewBox'>
                                    <img src={URL.createObjectURL(val)} alt="photo" />
                                    <button style={{ cursor: "pointer" }} onClick={() => removeImg(index)}>❌</button>
                                </div>
                            </>
                        })}
                    </div>
                </div>
                <div className='rightItemBox'>



                    <div className="infoBox">
                        <div className="productNameBox">
                            <TextField.Root>
                                <TextField.Input placeholder="Course Name" size={"3"} onChange={inputEvent} name='pname' type='text' required />
                            </TextField.Root>

                        </div>
                        <div className="producDescBox" size="3">
                            <TextArea placeholder="Course Description" size={"3"} style={{ height: "250%" }} onChange={inputEvent} name='pdesc' required />
                        </div>
                    </div>

                    <div className="selectCateg">
                        <select name="pcateg" id="pcateg" onChange={inputEvent} required>
                            <option value="" disabled selected>Select your Category</option>
                            <option value="academics">Academics</option>
                            <option value="electronics">Technology</option>
                            <option value="sportsequipment">Investments</option>
                            <option value="book">Trading</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </select>


                    </div>

                    <div className="productPrice">
                        <TextField.Root>
                            <TextField.Input placeholder="Course Price" size={"3"} type='number' onChange={inputEvent} name='pprice' />
                        </TextField.Root>
                    </div>




                </div>

                <Button style={{ cursor: "pointer" }} type='submit' className='submitProduct' size={"4"} >Add Course</Button>
            </form>


        </>
    )
}

export default Additem