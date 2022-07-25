import React, { useState, useEffect } from "react";
import firebase from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import Auth from "./auth";

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());
  useEffect(()=>{
    console.log(loading, user);
  },[user])
  if (user) {
    return (
      <div>
        <Sidebar />
        <Header />
      </div>
    );
  }
  return <Auth />;
}
