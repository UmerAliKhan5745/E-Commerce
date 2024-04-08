"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { isAuthenticated } from "@/app/middleware/protectedRoute";
import axios from "axios";
import { fetchTshirtsIdSuccess, fetchTshirtsSuccess } from "@/app/features/tshirts/tshirtsSlice";
// Component function
export default function Tshirts() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState("loading");

  // Fetch t-shirts data and authenticate user on component mount
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product/tshirts');
        dispatch(fetchTshirtsSuccess(response.data));
      } catch (err) {
        console.error('Failed to fetch tshirts:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated"); // Fixed state value
    };

    checkAuthentication();
    //  return()=> will asked by HS
    fetchData();
  }, [dispatch]);

  // Get tshirts from Redux store
  const tshirts = useSelector((state:any) => state.tshirts.tshirt);
  // Function to handle Buy Now button click
  const handleBuyNowClick = (productId:number) => {
    dispatch(fetchTshirtsIdSuccess(productId)); // Dispatching the action with the product ID as payload
    router.push('/pages/ProductDetails/TshirtsDetails'); // Navigating to the ProductDetails page
  };

  // Render logic based on authentication state
  if (authenticated === "loading") {
    return <div>Loading...</div>;
  }
  if (authenticated === "accessing") {
    return (
      <>
        <Navbarr />
        <h1 style={{ textAlign: "center", margin: "15px" }}>Tshirts Variety</h1>
        <div className="m-auto row container  ">
          {tshirts.map((tshirt:any) => (
            <Card key={tshirt._id} style={{ width: "13rem", margin: "40px auto", height: "55vh", padding: "15px" }} className="shadow">
              <Card.Img variant="top" src={tshirt.imageUrl} />
              <Card.Body>
                <Card.Title>{tshirt.name}</Card.Title>
                <Card.Text>{tshirt.description.slice(0,45)}...</Card.Text>
              </Card.Body>
              <Button variant="primary" className="m-3" onClick={() => handleBuyNowClick(tshirt._id)}>Buy Now</Button>
            </Card>
          ))}
        </div>
        <hr />
        <Footer />
        <style jsx>{`
          .container {
            min-height: calc(100vh - 150px);
            position: relative;
          }
        `}</style>
      </>
    );
  } else {
    return router.push("/pages/auth/login"); // Redirect user to login page if not authenticated
  }
}
