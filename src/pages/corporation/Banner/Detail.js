import React, { useState } from "react";
import "../../../assets/css/corporation/banner/detail.css";
import GNB from "../GNB/GNB";
import LNB from "../LNB/LNB";
import { bannerDetail, storage } from "../../../scripts/firebase";
import { listAll, uploadBytes, ref as refs, getDownloadURL } from "firebase/storage";

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
    const [bannerName, setBannerName] = useState([]);
    
    const CheckDB = () => {
      const listRef = refs(storage, 'gs://image-betting.appspot.com/');

      listAll(listRef)
      .then((res) => {
      res.prefixes.forEach((folderRef) => {
  
      });
      res.items.forEach((itemRef) => {
        getDownloadURL(refs(storage, 'gs://image-betting.appspot.com/' + itemRef.name))
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
          const img = document.querySelector('img');
          img.setAttribute('src', url);
        })
        .catch((error) => {
          console.log(error)
            });
      
      });
    }).catch((error) => {
      console.log(error)
    });
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
              <img ></img>
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