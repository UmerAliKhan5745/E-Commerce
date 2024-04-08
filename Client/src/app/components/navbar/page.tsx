"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { isAuthenticated } from '../../middleware/protectedRoute';
import SideBar from "@/app/pages/cart/cartSidebar/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbarr() {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState('loading');
  
  useEffect(() => {
    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? 'accessing' : 'not Authenticated');
    };
    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    router.push("/pages/auth/login");
    
  }

  return (
    <>
      <div className="centre">
        <Navbar  bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} href="/">CloudStore</Navbar.Brand>
            <Nav>
              <Nav.Link as={Link} href="/pages/page/Tshirts">
                Tshirts
              </Nav.Link>
              <Nav.Link as={Link} href="/pages/page/Mugs">
                Mugs
              </Nav.Link>
              <Nav.Link as={Link} href="/pages/page/Hoddies">
                Hoddies
              </Nav.Link>
              <Nav.Link as={Link} href="/pages/page/Stickers">
                Stickers
              </Nav.Link>
              
            </Nav>
            {authenticated === 'accessing' && (
              <Button style={{ margin: "4px" }} variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            )}
            <div style={{display:"flex"}}>
              <Link href={"/pages/auth/login"}>
                <FontAwesomeIcon icon={faUser} style={{color:"white"}} />
              </Link>
              <div className="Sidebar mx-3 "><SideBar /></div>
            </div>
          </Container>
          <Nav.Link as={Link} href="/payment/stripe">
                Checkout
              </Nav.Link>
        </Navbar>
        
      </div>
    </>
  );

}
export default Navbarr;
