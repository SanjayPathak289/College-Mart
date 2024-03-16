import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductInfo from './ProductInfo';
import { Button } from '@radix-ui/themes';

const Referral = () => {

  const [referralId, setReferralId] = useSearchParams();
  const [owner, setOwner] = useState();
  const [course, setCourse] = useState();
  const [userId, setUserId] = useState();
  const refId = referralId.get("id");
  useEffect(() => {
    axios.get("https://investment-compass.onrender.com/referrals", {
      params: {
        id: refId
      }
    }).then((res) => {
      setOwner(`${res.data.fname} ${res.data.lname}`)
      setUserId(res.data._id)
      setCourse(res.data.productinfo[0])
    })
  }, [refId])

  return (
    owner && course && userId &&
    <ProductInfo owner={owner} userId={userId} productState={course} />

  )
}

export default Referral 