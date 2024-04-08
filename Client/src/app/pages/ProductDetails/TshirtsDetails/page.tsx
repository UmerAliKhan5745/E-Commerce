"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbarr from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from "@/app/middleware/protectedRoute";
import Button from "react-bootstrap/Button";
import { addItem } from "@/app/features/cart/cartSlice";
import Alert from 'react-bootstrap/Alert'; // Import Alert component from react-bootstrap

interface Tshirt {
  name: string;
  description: string;
  imageUrl: string;
  price: number; 
  size: string[];
  tshirtsid: number;
}

function Page() {
  const [authenticated, setAuthenticated] = useState("loading");
  const tshirtsid: number = useSelector((state: any) => state.tshirts.selectedTshirtId);
  const [tshirtData, setTshirtData] = useState<Tshirt | null>(null); // State to store fetched t-shirt data
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility

  // Fetch t-shirts data and authenticate user on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/tshirtsdetails/${tshirtsid}`);
        setTshirtData(response.data);
      } catch (err) {
        console.error('Failed to fetch tshirts:', err);
      }
    };

    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth ? "accessing" : "not authenticated"); // Fixed state value
    };

    checkAuthentication();
    fetchData();
  }, [tshirtsid]);

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    if (tshirtData) {
      dispatch(addItem(tshirtData)); // Dispatch addItem action with the selected T-shirt data
      setShowAlert(true); // Set showAlert to true when item is added to cart
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
        {authenticated === "accessing" && tshirtData && (
          <>
            <h2>T-Shirt Details</h2>
            <h5 style={{ textAlign: "center", margin: "20px" }}>Name: {tshirtData.name}</h5>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <img style={{ display: "block", width: '40%', height: 'auto' }} src={tshirtData.imageUrl} alt={tshirtData.name} />
              <div style={{ width: '40%' }}>Description: {tshirtData.description}
                <h4 style={{ lineHeight: "2" }}>Price: ${tshirtData.price}</h4>
                <h3 >Size: {tshirtData.size}</h3>
                <Button onClick={handleAddToCart}>Add To Cart</Button>
               
              </div>
            </div>
          </>
        )}
        {authenticated !== "accessing" && <div>Please log in to view t-shirt details.</div>}
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

export default Page;
