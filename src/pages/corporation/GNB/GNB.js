import React, { useState } from "react";
import "../../../assets/css/corporation/gnb.css"

function GNB() {

  return (
    <div class="Top-Menu">
        <div class="logo">
            <img src="https://s3-alpha-sig.figma.com/img/a4b7/2304/22ff2e085a67c44934bdf03cb04b9fe6?Expires=1638144000&Signature=MPjMGXUlptXWlQTI08Rt2F1E2gNdZfkzaxlThqMAP5Vogyv0MM8-j7BcYciOoSPX8l6tVsaU4jaYJ1FenH~Cwz~AVqGvMRNEwrELfknFEf9JYp~L6iTiNCF1bvXzGC8GY2XR0P5XSqyKYYpZCEdyzvkfBmV4qAGtptd-GhJqmkX47hIWndLivstMpLCTbzjamTxSNS~qWavkGLnTsOPtZ2M1SA1PUe1TCB1b1gmxlV0iVY7Vl6CmGtvl6rOu65VxULoHhrj0ehlcXnUMDCHfDHY34CZQrEBMJfcoLMjyWCb8dR3bPbIzhilMz1VI6taaJ5Gg08YY3vFv-0A44dZIiQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" width="50"></img>
        </div>
        <div class="profile-img">
            <svg class="profile-circle" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 51C39.8071 51 51 39.8071 51 26C51 12.1929 39.8071 1 26 1C12.1929 1 1 12.1929 1 26C1 39.8071 12.1929 51 26 51Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <svg class="profile-person" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="person-circle" d="M36.5161 40.5243V36.8953C36.5161 34.9703 35.7514 33.1242 34.3903 31.763C33.0291 30.4019 31.183 29.6372 29.258 29.6372H14.7419C12.817 29.6372 10.9708 30.4019 9.60969 31.763C8.24854 33.1242 7.48386 34.9703 7.48386 36.8953V40.5243" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path class="person-body" d="M22 22.3789C26.0085 22.3789 29.2581 19.1294 29.2581 15.1209C29.2581 11.1123 26.0085 7.86279 22 7.86279C17.9915 7.86279 14.7419 11.1123 14.7419 15.1209C14.7419 19.1294 17.9915 22.3789 22 22.3789Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </svg>
        </div>
        <div class="user">
            <p>프로필</p>
        </div>
        <div class="profile-detail">
        <svg class="down-icon" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
    </div>
  );
}

export default GNB;