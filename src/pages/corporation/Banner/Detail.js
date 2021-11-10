import React, { useState } from "react";
import "../../../assets/css/corporation/banner/detail.css";
import GNB from "../GNB/GNB";
import LNB from "../LNB/LNB";
import { bannerDetail } from "../../../scripts/firebase";

function Detail() {
  function NoBanner() {

    function MoveToBannerUpload(e) {
      window.location.replace('/corporation/banner/upload')
    }

    return (
        <>
        <GNB />
        <LNB />
        <div className="Banner-Detail">
            <div className="title">
                <p>업로드한 배너</p>
            </div>
            <div className="banner-add" onClick={ MoveToBannerUpload }>
              <div className="banner-add-text">
                <p>배너추가</p>
              </div>
            </div>
        </div>
        </>
      );
  }
  
  function YesBanner() {

    function CheckDB(e) {
      console.log(bannerDetail());
    }
    
    return (
      <>
      <GNB />
      <LNB />
      <div class="Banner-Detail">
          <div class="title">
              <p>업로드한 배너</p>
          </div>
          <div class="banner-detail" onClick={ CheckDB }>
            <div class="banner-detail-text">
              <p>배너 대표 이미지</p>
            </div>
          </div>
      </div>
      </>
    );
  }

  function BannerPage(props) {
    const isBanner = props.isBanner;
    if (isBanner) {
      return <YesBanner />;
    }
    return <NoBanner />;
  }

  return(
      <BannerPage isBanner={true} />
  );
}

export default Detail;