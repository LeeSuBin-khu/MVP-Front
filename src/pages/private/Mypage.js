import React, { useState } from "react";
import { Table } from 'react-bootstrap';
import NavMenu from "../NavMenu";

function Mypage(){

    return(
        <>
            <NavMenu name="hi"/>
            <div classNam="point">
                <span>My 포인트 내역</span>
                <div className="row">
                    <div className="col-md-4">
                        최고 Pt
                        <h5>20,000</h5> 
                    </div>
                    <div className="col-md-4">
                        잔액 pt
                        <h5>20,000</h5>
                    </div>
                    <div className="col-md-4">
                        전일  수익
                        <h5>20,000</h5>
                    </div>
                </div>
            </div>
            <div className="List">
                <div>
                    카테코리 필터 2021.07.12.2021
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>조사 번호</th>
                        <th>조사 기간</th>
                        <th>조사 날짜</th>
                        <th>분류</th>
                        <th>펀당 원금</th>
                        <th>수익금</th>
                        <th>수익률</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </Table>
            </div>
        </>
    )
}

export default Mypage;