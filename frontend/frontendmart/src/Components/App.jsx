import React, { useState, useEffect } from 'react'
import SignIn from './SignIn'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import { Theme } from '@radix-ui/themes'
import Signup from './Signup'
import Home from "./Home";
import Profile from './Profile'
import Additem from './Additem'
import Myproducts from './Myproducts'
import Products from "./Products"
import ProductInfo from './ProductInfo'
import Messenger from './Messenger'
import Footer from './Footer'
import MyMessages from './MyMessages'
import ErrorPage from './ErrorPage'
import Referral from './Referral'
import PurchasedProducts from './PurchasedProducts'
import MyReferrals from './MyReferrals'

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    // const [user, setUser] = useState({});
    return (
        <>
            <Theme>
                <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

                <Routes>
                    <Route path='/' Component={Home} />
                    <Route path='/signup' Component={Signup} />
                    <Route path='/signin' Component={() => <SignIn setIsAuth={setIsAuth} />} />
                    <Route path='/profile' Component={Profile} />
                    <Route path='/additem' Component={Additem} />
                    <Route path='/myproducts' Component={Myproducts} />
                    <Route path='/products' Component={Products} />
                    <Route path='/productinfo' Component={ProductInfo} />
                    <Route path='/messenger' element={isAuth ? <Messenger /> : <SignIn />} />
                    <Route path='/mymessages' element={isAuth ? <MyMessages /> : <SignIn />} />
                    <Route path='/referral' Component={Referral} />
                    <Route path='/mypurchases' Component={PurchasedProducts} />
                    <Route path='/myreferrals' Component={MyReferrals} />
                    <Route path='*' Component={ErrorPage} />
                </Routes>
                <Footer />
            </Theme>
        </>
    )
}

export default App
