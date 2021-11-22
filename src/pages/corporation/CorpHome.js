import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import {Container, Row, Col, Button} from "react-bootstrap";
import { auth, db, logout } from "../../scripts/firebase";
import { ref, get } from "firebase/database";
import { Link } from "react-router-dom";

import "../../assets/css/corporation/corphome.css";

export default function CorpHome(){
		const [user, loading, error] = useAuthState(auth);
		const [corpname,setCorpname] = useState("");
		const navigate = useNavigate();

		const fetchCorpName = async () =>{
			try{
				var snapshot = await get(ref(db,'users/',+user.uid));
				var data = snapshot.val();
				if (data != null){
					if (data.ROLE_CORP != null){
						setCorpname(data.ROLE_CORP.info.name);
					}
				}
			} catch(err){
				console.error(err);
				alert("An error occured while fetching user data");
			}
		};

		useEffect(()=>{
			if (loading ) return;
			if (!user) return navigate('/', {replace: true});
			fetchCorpName();
		},[user,loading]);


	return(
		<>
            <Container fluid>
                <Row>
                    <h1>기업 회원 MVP</h1>
                </Row>
                <Row className="test">
                    <Col className="menu_name">Dash Board</Col>
                    <Col className="menu_name">Banner Setting</Col>
                    <Col className="menu_name">Prototype Setting</Col>
                    <Col className="menu_name">Statistics</Col>
                </Row>
                <Row className="test">
                    <Col className="test" >
                        <div>
                        <Link to="/corporation/main">
                            <Button variant="secondary">대시보드</Button>
                        </Link>
                        </div>
                    </Col>
                    <Col>
                    <div>
                        <Link to="/corporation/banner/upload">
                            <Button variant="secondary">배너 관리</Button>
                        </Link>
                        </div>
                    </Col>
                    <Col>
                    <div className="menu_button">
                        <Link to="/corporation/prototype/main">
                            <Button variant="secondary">프로토타입 관리</Button>
                        </Link>
                        </div>
                    </Col>
                    <Col>
                    <div className="menu_button">
                        <Button variant="secondary">타제품 통계 자료</Button>
                    </div>
                    </Col>
                </Row>
            </Container>
            <div className="menu_name">
                <div className="menu_button">
                    <div>
                        Statisticssss
                    </div>
                    <div>
                        <Link to="/corporation/dashboard">
                            <Button variant="secondary">대시보드</Button>
                        </Link>
                    </div>
                </div>
                <div className="menu_button">
                    <div>
                        Banner Setting
                    </div>
                    <div>
                        <Link to="/corporation/banner/main">
                            <Button variant="secondary">배너 관리</Button>
                        </Link>
                    </div>
                </div>
                <div className="menu_button">
                    <div>
                        Prototype Setting
                    </div>
                    <div>
                        <Link to="/corporation/prototype/main">
                            <Button variant="secondary">프로토타입 관리</Button>
                        </Link>
                    </div>
                </div>
                <div className="menu_button">
                    <div>
                        Statistics
                    </div>
                    <div>
                        <Button variant="secondary">타제품 통계자료</Button>
                    </div>
                </div>
            </div>
    	</>
	);
}