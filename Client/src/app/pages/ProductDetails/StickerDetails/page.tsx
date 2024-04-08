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

interface Sticker {
  name: string;
  description: string;
  imageUrl: string;
  price: number; 
  dimensions: {
    width: number;
    height: number;
    unit: string;
  };
  stickerId: number;
}

function StickerPage() {
  const [authenticated, setAuthenticated] = useState("loading");
  const stickerId: number = useSelector((state: any) => state.stickers.selectedStickerId);
  const [stickerData, setStickerData] = useState<Sticker | null>(null);
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility

  const dispatch = useDispatch();

  // Fetch sticker data and authenticate user on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/stickerdetails/${stickerId}`);
        setStickerData(response.data);
      } catch (err) {
        console.error('Failed to fetch sticker:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated");
    };

    checkAuthentication();
    fetchData();
  }, [stickerId]);

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    if (stickerData) {
      dispatch(addItem(stickerData)); // Dispatch addItem action with the selected sticker data
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
        {authenticated === "accessing" && stickerData && (
          <>
            <h2>Sticker Details</h2>
            <h5 style={{ textAlign: "center", margin: "20px" }}>Name: {stickerData.name}</h5>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <img style={{ display: "block", width:'20%' , height: 'auto' }} src={stickerData.imageUrl} alt={stickerData.name} />
              <div style={{ width: '40%' }}>Description: {stickerData.description}
                <h4 style={{ lineHeight: "2" }}>Price: ${stickerData.price}</h4>
                <h5 >Dimensions Height: {stickerData.dimensions?.height}</h5>
                <h5 >Dimensions Width: {stickerData.dimensions?.width}</h5>
                <h5 >Dimensions Unit: {stickerData.dimensions?.unit}</h5>
                <Button onClick={handleAddToCart}>Add To Cart</Button>
              </div>
            </div>
          </>
        )}
        {authenticated !== "accessing" && <div>Please log in to view sticker details.</div>}
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

export default StickerPage;
