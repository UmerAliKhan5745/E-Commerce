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
import { fetchHoodiesIdSuccess, fetchHoodiesSuccess } from "@/app/features/hoddies/hoodiesSlice";

// Define interface for Hoodie
interface Hoodie {
  _id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// Component function
export default function Hoodies() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState("loading");

  // Fetch hoodies data and authenticate user on component mount
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product/hoodie');
        dispatch(fetchHoodiesSuccess(response.data));
      } catch (err) {
        console.error('Failed to fetch hoodies:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated"); // Fixed state value
    };

    checkAuthentication();
    fetchData();
  }, [dispatch]);

  // Get hoodies from Redux store
  const hoodies = useSelector((state: any) => state.hoodies.hoodie);

  // Function to handle Buy Now button click
  const handleBuyNowClick = (productId: number) => {
    dispatch(fetchHoodiesIdSuccess(productId)); // Dispatching the action with the product ID as payload
    router.push('/pages/ProductDetails/HoddieDetails'); // Navigating to the ProductDetails page
  };

  // Render logic based on authentication state
  if (authenticated === "loading") {
    return <div>Loading...</div>;
  }
  if (authenticated === "accessing") {
    return (
      <>
        <Navbarr />
        <h1 style={{ textAlign: "center", margin: "15px" }}>Hoodies Variety</h1>
        <div className="m-auto row container">
          {hoodies.map((hoodie: Hoodie) => (
            <Card key={hoodie._id} style={{ width: "13rem", margin: "45px auto", height: "55vh", padding: "10px" }} className="shadow">
              <Card.Img variant="top" style={{height:"188px"}} src={hoodie.imageUrl} />
              <Card.Body>
                <Card.Title>{hoodie.name}</Card.Title>
                <Card.Text>{hoodie.description.slice(0,48)}...</Card.Text>
              </Card.Body>
                <Button variant="primary"className="my-1" onClick={() => handleBuyNowClick(hoodie._id)}>Buy Now</Button>
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
