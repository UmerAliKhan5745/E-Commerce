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

interface Mug {
  name: string;
  description: string;
  imageUrl: string;
  price: number; 
  capacity: string[];
  mugId: number;
}

function MugPage() {
  const [authenticated, setAuthenticated] = useState("loading");
  const mugId: number = useSelector((state: any) => state.mugs.selectedMugId);
  const [mugData, setMugData] = useState<Mug | null>(null);
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const dispatch = useDispatch();

  // Fetch mug data and authenticate user on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/mugdetails/${mugId}`);
        setMugData(response.data);
      } catch (err) {
        console.error('Failed to fetch mug:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated");
    };

    checkAuthentication();
    fetchData();
  }, [mugId]);

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    if (mugData) {
      dispatch(addItem(mugData));
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
        {authenticated === "accessing" && mugData && (
          <>
            <h2>Mug Details</h2>
            <h5 style={{ textAlign: "center", margin: "20px" }}>Name: {mugData.name}</h5>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <img style={{ display: "block", width: '40%', height: 'auto' }} src={mugData.imageUrl} alt={mugData.name} />
              <div style={{ width: '40%' }}>Description: {mugData.description}
                <h4 style={{ lineHeight: "2" }}>Price: ${mugData.price}</h4>
                <h3 >Capacity: {mugData.capacity}</h3>
                <Button onClick={handleAddToCart}>Add To Cart</Button>
              </div>
            </div>
          </>
        )}
        {authenticated !== "accessing" && <div>Please log in to view mug details.</div>}
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

export default MugPage;
