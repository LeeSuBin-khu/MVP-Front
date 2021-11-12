import React from "react";
import { logout } from "../scripts/firebase";
import {Navbar, Container, Nav, Button} from "react-bootstrap";

export default function NavMenu({name}) {
  return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/home">M.V.P</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/bb">Banner-Betting</Nav.Link>
                <Nav.Link href="/pt">Prototype-Test</Nav.Link>
                <Nav.Link href="/survey">Survey</Nav.Link>
                <Button onClick={logout}>Sign Out</Button>
                <p style={{position: 'absolute', right: '30px', top: '15px'}}>
                    <Nav.Link href="/mypage">{name}님 환영합니다.</Nav.Link></p>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}
