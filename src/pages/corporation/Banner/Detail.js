import React, { useState, useEffect } from "react";
import "../../../assets/css/corporation/banner/detail.css";
import GNB from "../GNB/GNB";
import LNB from "../LNB/LNB";
import { db, auth } from "../../../scripts/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, onValue } from "firebase/database";
import NavMenu from "../../NavMenu";

function Detail() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [bannerUrl, setBannerUrl] = useState([]);
    const [isBanner, setIsBanner] = useState(false);

    function YesBanner(props) {
        if(props.isBanner) {
            return (
            <>
            <div className="Banner-Collection">
                <div className="banner-detail-text">업로드한 배너</div>
                <div className="banner-images">
                    <ul>
                        {bannerUrl.map((banner) => 
                        <li><img className="banner-image" src={banner} /></li> )}
                    </ul>
                </div>
            </div>
            </>
            );
        } else {
            return (
                <></>
            );
        }

    }

    const MoveToBannerUpload = (e) => {
        window.location.replace('/corporation/banner/upload');
    };

    // useEffect(() => {
    //     window.localStorage.setItem('uid', user.uid);
    //   }, []);

    useEffect( async () => {
        if (loading) return;
        try {
            var userIdRef = ref(db, 'users/' + user.uid);
                var num = 0
                onValue(userIdRef, (snapshot) => {
                var data = snapshot.val();
                num = data.ROLE_CORP.count;
                if(num != 0) {
                    setBannerUrl(data.ROLE_CORP.banner);
                    setIsBanner(true);
                    setName(data.name)
                };
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }, [user, loading]);

    return (
        <>
        <div className="Banner-Detail">
            <NavMenu name={name}/>
            <LNB />
            <div className="banner-add-text">배너 업로드</div>
            <div className="banner-add" onClick={ MoveToBannerUpload }>
              <div className="banner-add-icon">
              <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50.5 21.0417V79.9584" stroke="#C4C4C4" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.0416 50.5H79.9583" stroke="#C4C4C4" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </div>
            </div>
            <YesBanner isBanner={isBanner} />
        </div>
        </>
      );
}

export default Detail;








// const CheckBanner = async () => {
    //     try {
    //         var userIdRef = ref(db, 'users/' + user.uid);
    //         var num = 0
    //         onValue(userIdRef, (snapshot) => {
    //           var data = snapshot.val();
    //           num = data.ROLE_CORP.count;
    //           if(num != 0) setBannerUrl(data.ROLE_CORP.banner);
    //         })
    //         if(num != 0) {
    //             setIsBanner(true)
    //             return true;
    //         }
    //           return false;
    //     } catch (err) {
    //       console.error(err);
    //       alert(err.message);
    //     }
    //   };