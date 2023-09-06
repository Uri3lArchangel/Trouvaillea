"use client";
import React, { useContext, useEffect, useState } from "react";
import topNavL from "../../../styles/Home/NavigtionLayout/topNavL.module.css";
import { ImMenu } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import DrawerLayout from "./antd/DrawerLayout";
import DrawerData from "./antd/DrawerData";
import { Button } from "antd";
import Link from "next/link";
import { UserData } from "@/src/context/Usercontext";
import { signout } from "../functions/signouthelper";



function TopNav() {
  
  const [drawerState, setDrawerState] = useState(false);
  const userData  = useContext(UserData)
  let isAuthenticated=false
if(userData && userData.Email){
  isAuthenticated=true
}
  const openDrawer = () => {
    setDrawerState(true);
  };

  return (
    <nav className={topNavL.NavContainer_0}>
      <ul id="mobile">
        <li>
          <figure>
            <h1 className="text-pink-400 text-xl" >
             <Link href="/">Trouvaillea</Link> 
              </h1>
          </figure>
        </li>
        {isAuthenticated ? (
          <div className="flex w-1/4 justify-between">
            <li>
              <CgProfile
                id="profile_icon"
                className="text-white hover:text-pink-400"
                size={34}
              />
            </li>

            <li>
              <ImMenu
                onClick={openDrawer}
                className="text-white cursor-pointer hover:text-pink-400"
                size={34}
              />
            </li>
          </div>
        ) : (
          <li>
            <ImMenu
              onClick={openDrawer}
              className="text-white cursor-pointer hover:text-pink-400"
              size={34}
            />
          </li>
        )}
      </ul>
      <ul id="lg">
        <li>
          <figure>
          <h1 className="text-pink-400 text-3xl" >
             <Link href="/">Trouvaillea</Link> 
              </h1>
          </figure>
        </li>
        {isAuthenticated ? (
          <div className="flex w-56 justify-between">
             <li>
              <CgProfile
                id="profile_icon"
                className="text-white hover:text-pink-400"
                size={34}
              />
            </li>
            <li>
            <Button danger className='w-full' onClick={signout}>Sign Out</Button>
            </li>
            </div>
        ) : (
          <div className="flex w-1/4 justify-between lg:w-1/6">
            <li>
              <Button className=" w-full bg-green-500">
               <Link href="/auth/signup"> 
               Sign Up
               </Link>
                </Button>
            </li>
            <li>
              <Button className="w-full text-white">
              <Link href="/auth/signin"> 
                Sign In
                </Link>
                </Button>
                
            </li>
          </div>
        )}
      </ul>
      <DrawerLayout
        drawerState={drawerState}
        data={
          <DrawerData
            isAuthenticated={isAuthenticated}
            setDrawerState={setDrawerState}
          />
        }
        stateChangeAct={setDrawerState}
      />
    </nav>
  );
}

export default TopNav;
