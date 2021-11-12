import React from "react";
import NavMenu from "../NavMenu";

import { Button } from 'react-bootstrap';
import "../../assets/css/private/BannerBetting.css";

export default function BannerBetting() {
    return (
        <div>
            <NavMenu name="hi"/>
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div className="banner_pick">
                            A
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="banner_pick">
                            B
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="banner_pick">
                            C
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="banner_pick">
                            D
                        </div>
                    </div>
                <div className="row">
                    <div className="col-md-6"><p>1000pt <Button>획득</Button></p></div>
                    <div className="col-md-6"><p>pt<input value="1000"></input><Button>펀드</Button></p></div>
                </div>
                </div>

            </div>
        </div>
        </div>
    )
}