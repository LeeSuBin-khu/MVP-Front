import React, { useState } from "react";
import "../../../assets/css/corporation/banner/detail.css";
import GNB from "../GNB/GNB";
import LNB from "../LNB/LNB";
import { storage, db, auth } from "../../../scripts/firebase";
import { ref, onValue } from "firebase/database";
import { listAll, ref as refs, getDownloadURL } from "firebase/storage";
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
    const [DATA_URL, setDATA_URL] = useState("");
    
    const CheckDB = () => {
      let DATA_USER = "";
      // let DATA_URL = "";
      

      var userIdRef = ref(db, 'users/' + user.uid);
      onValue(userIdRef, (snapshot) => {
        var data = snapshot.val();
        // console.log(data.url);
        console.log(data.ROLE_CORP.count);
        console.log(data.ROLE_CORP.banner[0]);
        DATA_USER = data.uid;
        // DATA_URL = data.url;
        setDATA_URL(data.url)
        // console.log(DATA_URL)
      })
      
      // const starCountRef = ref(db, 'Banner/Banner1');
      // onValue(starCountRef, (snapshot) => {
      //   const data = snapshot.val();
      //   console.log(data.corp);
      //   data_banner = data.corp;
      // });

    //   const listRef = refs(storage, `gs://image-betting.appspot.com/${DATA_USER}`);
    //   listAll(listRef)
    //   .then((res) => {
    //   res.prefixes.forEach((folderRef) => {
  
    //   });
    //   res.items.forEach((itemRef) => {
    //     getDownloadURL(refs(storage, `gs://image-betting.appspot.com/${DATA_USER}/${itemRef.name}/`))
    //     .then((url) => {
    //       setBannerName(prev => [...prev, url])
    //       // console.log(bannerName)
    //       // console.log(url)
    //       // const xhr = new XMLHttpRequest();
    //       // xhr.responseType = 'blob';
    //       // xhr.onload = (event) => {
    //       //   const blob = xhr.response;
    //       // };
    //       // xhr.open('GET', url);
    //       // xhr.send();
    
    //       // const img = document.querySelector('img');
    //       // const imgs = bannerName.map((name) => (img.setAttribute('src', name)));
    //       // img.setAttribute('src', bannerName[0]);
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //         });
      
    //   });
    // }).catch((error) => {
    //   console.log(error)
    // });
    

  }
  // const banners = bannerName
  // const bannerList = banners.map((banner) => (<li><img className="banner-image" src={banner} /></li>));
    
    return (
      <>
      <GNB />
      <LNB />
      <div className="Banner-Detail">
          <div className="title" onClick={CheckDB}>
              <p>업로드한 배너</p>
          </div>
          <ul className="banner-images">
              {/* {bannerName.map((banner) => ( */}
                <li><img className="banner-image" src={DATA_URL} /></li>
              {/* ))} */}
          </ul>
      </div>
      </>
    );
  }

  const tt = () => {
    return false;
  }

  function BannerPage(props) {
    const isBanner = props.isBanner;
    const ff = () => {
      if(isBanner) {
        return <YesBanner />
      }
    }
    return (
      <>
    {/* <NoBanner / >
      {ff()} */}
      {isBanner?<YesBanner/>:<NoBanner/>}
      </>
      );
    {/* if (isBanner) {
      return <YesBanner />;
    }
    return <NoBanner />; */}
  }

  return(
      <BannerPage isBanner={true} />
  );
}

export default Detail;