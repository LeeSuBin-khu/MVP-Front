import React, { useState } from "react";

import { Button } from 'react-bootstrap';
<<<<<<< HEAD
=======
import "../../../assets/css/corporation/dashboard/dashboard.css";
>>>>>>> 4271dbd03e5d93c920fa022e24150a993e135fb8
import "../../../assets/css/mvp/Banner/Funding.css";

function Funding(){

    return(
        <>
        <div className="Funding_main">
            <div className="Title">
                <h2>배너 펀딩</h2>
                <h5>Pick Your Best</h5>
            </div>
            <div className="Category">
                <span>
                카테고리 필터 전체
                </span>
                <span>
                    새로고침
                </span>
                <hr></hr>
            </div>
            
            <div className="D_day">
                D-3
            </div>
            <div className="Funding_vote">
                <div className="Funding_MyPick">
                    <p>
                        당신의 최애는?
                    </p>
                    <div className="test">A</div>
                    <div className="test">B</div>
                    <div className="test">C</div>
                    <p>1000pt <Button>획득</Button></p>
                    
                </div>
                <div className="Funding_PeoplePick">
                    <p>
                        대중의 선택은?
                    </p>
                    <div className="test">A</div>
                    <div className="test">B</div>
                    <div className="test">C</div>
                    
                    <p>pt<input value="1000"></input><Button>펀드</Button></p>
                    
                </div>
            </div>
        </div>
        </>
    );
}

<<<<<<< HEAD
// function Balance(){

//     let mybalance = 0;
//     return(
//         <>
//             <div>
                
//             </div>


//         </>
//     );
// }

=======
>>>>>>> 4271dbd03e5d93c920fa022e24150a993e135fb8
export default Funding;