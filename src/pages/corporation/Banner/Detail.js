import React, { useState, useEffect } from "react";
import "../../../assets/css/corporation/banner/detail.css";
import GNB from "../GNB/GNB";
import LNB from "../LNB/LNB";
import { db, auth } from "../../../scripts/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, onValue } from "firebase/database";
import { async } from "@firebase/util";

function Detail() {
    const [user, loading, error] = useAuthState(auth);
    const [bannerUrl, setBannerUrl] = useState([]);
    const [isBanner, setIsBanner] = useState(false);

    function YesBanner(props) {
        if(props.isBanner) {
            return (
            <>
            <ul>
            {bannerUrl.map((banner) => 
            <li><img className="banner-image" src={banner} /></li> )}
            </ul>
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
                };
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }, [user, loading]);

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
        <YesBanner isBanner={isBanner} />
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