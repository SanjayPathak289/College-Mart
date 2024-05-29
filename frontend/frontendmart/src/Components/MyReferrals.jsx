import { Button, DropdownMenu, Link, Select } from '@radix-ui/themes';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MyReferrals = () => {
    const [referralsArr, setReferralsArr] = useState([]);
    const [salesArr, setSalesArr] = useState([]);
    useEffect(() => {
        const getR = async () => {

            const { data } = await axios.get("https://investment-compass-urnz.onrender.com/referral/myreferrals", {
                params: {
                    id: JSON.parse(localStorage.getItem("user"))._id
                }
            })
            setReferralsArr(data.referrals);
        }
        getR();
    }, [])
    useEffect(() => {
        const getR = async () => {

            const { data } = await axios.get("https://investment-compass-urnz.onrender.com/api/user/sales", {
                params: {
                    id: JSON.parse(localStorage.getItem("user"))._id
                }
            })
            setSalesArr(data.sales);
        }
        getR();
    }, [])

    const countReferrals = () => {
        var count = 0;
        for (var i = 0; i < referralsArr.length; i++) {
            count += referralsArr[i].whoBought.length;
        }
        return count;
    }
    const countSell = (time) => {
        const s = salesArr.map(date => new Date(date));
        const currDate = new Date();
        var outputArr = []
        var tempDate = new Date(currDate);
        switch (time) {
            case "day":
                tempDate.setDate(currDate.getDate() - 1);
                outputArr = s.filter(date => date > tempDate);
                break;
            case "week":
                tempDate.setDate(currDate.getDate() - 7);
                outputArr = s.filter(date => date > tempDate);
                break;

            case "month":
                tempDate.setMonth(currDate.getMonth() - 1);
                outputArr = s.filter(date => date > tempDate);
                break;

            case "year":
                tempDate.setYear(currDate.getYear() - 1);
                outputArr = s.filter(date => date > tempDate);
                break;

            case "lifetime":
                outputArr = s;
                break;
        }
        return outputArr.length;
    }
    return (

        <div id='myreferralDiv'>
            <div id='parentCountDiv'>
                <div className='countDiv'>
                    <span className='salesHead'>1 Day Sales</span>
                    <span>{countSell("day")}</span>
                </div>
                <div className='countDiv'>
                    <span className='salesHead'>1 Week Sales</span>
                    {countSell("week")}
                </div>
                <div className='countDiv'>
                    <span className='salesHead'>1 Month Sales</span>
                    {countSell("month")}
                </div>
                <div className='countDiv'>
                    <span className='salesHead'>1 Year Sales</span>
                    {countSell("year")}
                </div>
                <div className='countDiv'>
                    <span className='salesHead'>Lifetime Sales</span>
                    {countSell("lifetime")}
                </div>
                <div className='countDiv'>
                    <span className='salesHead'>Referral Sales</span>
                    {countReferrals()}
                </div>
            </div>
            <div>
                <p>Your Referrals</p>
            </div>
            {referralsArr.map((product) => (
                <div className='eachReferralDiv'>

                    <div>
                        <a href={"https://investment-compass-urnz.onrender.com/referral?id=" + product.refId} style={{ textDecoration: "none" }}>{"https://investment-compass-urnz.onrender.com/referral?id=" + product.refId}</a>

                    </div>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft">
                                Persons who bought
                            </Button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content>
                            {product.whoBought.map((user) => (
                                <DropdownMenu.Item>{user.user}</DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>

                    </DropdownMenu.Root>
                </div>
            ))
            }
        </div>
    )
}

export default MyReferrals  