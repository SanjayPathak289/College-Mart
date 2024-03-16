import { Button, Table } from '@radix-ui/themes';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PurchasedProducts = () => {
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user"))._id);
    const [purchased, setPurchased] = useState([])
    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await axios.get("https://investment-compass.onrender.com/api/user/purchased", {
                params: {
                    id: userId
                }
            })
            setPurchased(data.bought);
        };

        fetchUserData();
    }, []);

    return (
        <>
            <div id='myPurchasedDiv'>


                <Table.Root variant='surface'>
                    <Table.Header>
                        <Table.Row align={"center"}>
                            <Table.ColumnHeaderCell align='center'>Course</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell align='center'>Price</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell align='center'>Status</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {purchased.map((product) => (

                        <Table.Body>
                            <Table.Row align={"center"}>
                                <Table.RowHeaderCell align='center'>{product.productName}</Table.RowHeaderCell>
                                <Table.Cell align='center'>{product.productPrice}</Table.Cell>
                                <Table.Cell align='center'>
                                    <Button color='green'>Success</Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table.Root>
            </div>
        </>
    )
}

export default PurchasedProducts    