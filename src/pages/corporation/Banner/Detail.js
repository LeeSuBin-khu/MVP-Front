import React, { useState } from "react";
import "../../../assets/css/corporation/banner/detail.css";
import GNB from "../GNB/GNB";
import LNB from "../LNB/LNB";
import { bannerDetail, storage, db, auth } from "../../../scripts/firebase";
import { ref, onValue, get } from "firebase/database";
import { listAll, uploadBytes, ref as refs, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

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
    const [user, loading, error] = useAuthState(auth);
    
    const CheckDB = () => {
      var refff = (ref(db, 'users/' + user.uid));
      onValue(refff, (snapshot) => {
        var data = snapshot.val();
        console.log(data.uid);
      })
      

      const starCountRef = ref(db, 'Banner/Banner1');
      onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      });

      const listRef = refs(storage, 'gs://image-betting.appspot.com/');
      listAll(listRef)
      .then((res) => {
      res.prefixes.forEach((folderRef) => {
  
      });
      res.items.forEach((itemRef) => {
        getDownloadURL(refs(storage, 'gs://image-betting.appspot.com/' + itemRef.name))
        .then((url) => {
          // const xhr = new XMLHttpRequest();
          // xhr.responseType = 'blob';
          // xhr.onload = (event) => {
          //   const blob = xhr.response;
          // };
          // xhr.open('GET', url);
          // xhr.send();
          setBannerName(prev => [...prev, url])
          console.log(bannerName)
          console.log(url)
          // const img = document.querySelector('img');
          // const imgs = bannerName.map((name) => (img.setAttribute('src', name)));
          // img.setAttribute('src', bannerName[0]);
        })
        .catch((error) => {
          console.log(error)
            });
      
      });
    }).catch((error) => {
      console.log(error)
    });
    

  }
  const banners = bannerName
  const bannerList = banners.map((banner) => (<li><img src={banner} /></li>));
    
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
              <ul>
              {bannerList}
              </ul>
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