
import React, { useState,useEffect } from "react";
import {auth, db, storage} from "../../../scripts/firebase";
import { Navigate } from "react-router";
import { ref, onValue } from "firebase/database";

import * as fbStorage from "firebase/storage";
import "../../../assets/css/corporation/banner/result.css";
import LNB from "../LNB/LNB";
//import { FirebaseStorage } from "@firebase/storage-types";

function Result() {

  useEffect(() => {
    var url = window.location.href;
    var bid = url.split('/')[6];
    let bannerId = bid.replace('%2F', '/');
    console.log(bannerId)
    
    var userIdRef = ref(db, `BannerCount/${bannerId}`);
    
    onValue(userIdRef, (snapshot) => {
      var data = snapshot.val();
      console.log(data);
    })
    }, []); 


/*
import { jsxMemberExpression } from "@babel/types";

function Result(props) {
  const[Bannername,setBannername] = useState("props.banner")
  const[Resultcount, setResultcount] =useState([
    {
      id : 'job',
      teenager : 0,
      student : 0,
      worker : 0,
      doctor :0
    },
    {
      id : 'category',
      it : 0,
      marketing : 0,
      service : 0,
      finance : 0,
      game : 0,
      culture :0,
      beauty :0,
      sports : 0,
      food : 0,
      trip : 0,
      medical :0,
      fassion : 0,
      environment :0,
      etc :0

    },
    {
      id : 'sex',
      women : 0,
      men :0
    }
    ]);

  const storage = fbStorage.getStorage();

  const Bannerstatic = async() =>{
    try{
      const BannerRef = ref(db,'Bannercount'+Bannername);
      var snapshot = await get(BannerRef);
      var data = snapshot.val();
      if (data !=null){
        for ()
      }
    }catch(err){
      console.error(err);
      alert("error");
    }
  };

  function FetchBannerInfo(){
    fbStorage.getDownloadURL(fbStorage.ref(storage,props.banner))
    .then((url) =>{
      var img = document.getElementById('take');
      img.setAttribute('src',url);
    })
  }

  

  useEffect(()=>{
    // if(loading) return;
    // if(!user) return Navigate('/',{replace: true});
    Bannerstatic();
    fetchBannerInfo();
  })*/
  return (
    <>
    <div class="Banner-Result">
    <LNB />
        <p class="title">펀딩결과</p>
        <div class="line2"></div>
        <div class="banner-favor">
            <p class="banner-favor-text">배너 선호도</p>
            <img class="banner-img"></img>
            <p class="favor-scale"></p>
        </div>
        <div class="line3"></div>
        <div class="banner-statistic">
            <p class="banner-statistic-text">참여자 통계</p>
            <div class="basic-chart">
                <div class="gender-chart"></div>
                <div class="age-chart"></div>
            </div>
            <div class="job-chart"></div>
            <div class="field-chart"></div>
        </div>
    </div>
    </>
  );
}


export default Result;  
