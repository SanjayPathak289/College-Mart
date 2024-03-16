import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DropdownMenu, Button, Avatar, DropdownMenuItem } from '@radix-ui/themes';
import { ArchiveIcon } from '@radix-ui/react-icons';
const Navbar = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsAuth(true);
    }
  }, [isAuth])

  const handleLogout = () => {
    axios.get("http://localhost:3000/api/user/logout")
      .then(res => {
        if (res.data) {
          // props.setIsAuth(false);

          localStorage.removeItem("user");
          setIsAuth(false);
          navigate("/signin");
        }
        else {
          console.log("ERROR");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='navbar'>
      <div className='logoandLink'>


        <div className="logo">
          <p>Investment Compass
            <ArchiveIcon style={{ marginLeft: "5px" }} />
          </p>


        </div>
        <div className='mainLinks'>
          <ul>
            <Link to={"/"} className='linkli'>Home</Link>
            <Link to={"/additem"} className='linkli'>Add Course</Link>
            <Link to={"/products"} className='linkli'>Courses</Link>
          </ul>
        </div>
      </div>

      <div className='sign'>
        {!isAuth ? <Link to={"/signin"} ><Button
          style={{
            background: "#3772ff",
            cursor: "pointer"
          }}
          variant="solid" size={"3"}>Sign In</Button></Link> : null}
        {!isAuth ? <Link to={"/signup"}><Button style={{
          cursor: "pointer"
        }} size={"3"} variant="outline" >Sign Up</Button></Link> : null}
        {isAuth ?

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" size={"0"} style={{ outline: "none", cursor: "pointer" }}>
                <Avatar variant="soft" fallback={JSON.parse(localStorage.getItem("user")).fname[0] + JSON.parse(localStorage.getItem("user")).lname[0]} size="5" />

              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Link to={"/profile"} style={{ textDecoration: "none", }} className='linkNav'> <DropdownMenu.Item style={{ cursor: "pointer", color: "black" }}>Profile</DropdownMenu.Item></Link>
              <DropdownMenu.Separator />
              <Link to={"/myproducts"} style={{ textDecoration: "none" }} className='linkNav'><DropdownMenu.Item style={{ cursor: "pointer", color: "black", }} >My Listed Courses</DropdownMenu.Item></Link>
              <Link to={"/mypurchases"} style={{ textDecoration: "none" }} className='linkNav'><DropdownMenu.Item style={{ cursor: "pointer", color: "black", }} >My Bought Courses</DropdownMenu.Item></Link>
              <Link to={"/mymessages"} style={{ textDecoration: "none" }} className='linkNav'><DropdownMenu.Item style={{ cursor: "pointer", color: "black" }} >My Messages</DropdownMenu.Item></Link>
              <Link to={"/myreferrals"} style={{ textDecoration: "none" }} className='linkNav'><DropdownMenu.Item style={{ cursor: "pointer", color: "black" }} >My Referrals</DropdownMenu.Item></Link>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={handleLogout} style={{ cursor: "pointer" }}>LogOut</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>





          : null}
      </div>
    </div>
  )
}

export default Navbar