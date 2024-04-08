"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from "@/app/middleware/protectedRoute";
import Button from "react-bootstrap/Button";
import { addItem } from "@/app/features/cart/cartSlice";
import { Alert } from 'react-bootstrap';

interface Hoodie {
  name: string;
  description: string;
  imageUrl: string;
  price: number; 
  size: string[];
  color:string;
  hoodieId: number;
}

function HoodiePage() {
  const [authenticated, setAuthenticated] = useState("loading");
  const hoodieId: number = useSelector((state: any) => state.hoodies.selectedHoodieId);
  const [hoodieData, setHoodieData] = useState<Hoodie | null>(null);
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const dispatch = useDispatch();

  // Fetch hoodie data and authenticate user on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/hoodiedetails/${hoodieId}`);
        setHoodieData(response.data);
      } catch (err) {
        console.error('Failed to fetch hoodie:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated");
    };

    checkAuthentication();
    fetchData();
  }, [hoodieId]);

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    if (hoodieData) {
      dispatch(addItem(hoodieData));
      setShowAlert(true); // Show the alert when item is added to the cart
      // Hide the alert after 1 second
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    }
  };

  if (authenticated === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container">
      <Navbarr />
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Item added to cart successfully!
        </Alert>
      )}
      <div className="content">
        {authenticated === "accessing" && hoodieData && (
          <>
            <h2>Hoodie Details</h2>
            <h5 style={{ textAlign: "center", margin: "20px" }}>Name: {hoodieData.name}</h5>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <img style={{ display: "block", width: '30%', height: 'auto' }} src={hoodieData.imageUrl} alt={hoodieData.name} />
              <div style={{ width: '40%' }}>Description: {hoodieData.description}
                <h4 style={{ lineHeight: "2" }}>Price: ${hoodieData.price}</h4>
                <h3 >Size: {hoodieData.size}</h3>
                <h3 >Color: {hoodieData.color}</h3>
                <Button onClick={handleAddToCart}>Add To Cart</Button>
              </div>
            </div>
          </>
        )}
        {authenticated !== "accessing" && <div>Please log in to view hoodie details.</div>}
      </div>
      
      <hr />
      <Footer />
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .content {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default HoodiePage;
