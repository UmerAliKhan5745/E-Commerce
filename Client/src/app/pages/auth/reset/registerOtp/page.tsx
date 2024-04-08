"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { FormEvent ,useState} from 'react';

import { Button, Alert } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';

export default function EmailOtpInputPage() {
  const router = useRouter();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [formData, setFormData] = useState({
    password: "",
    OTP: "",
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
    
      if (response.ok) {
        setAlertVariant("success");
        setAlertMessage(data.message);
        setTimeout(() => {
          router.push('/pages/auth/login');
        }, 500);
      } else {
        setAlertVariant("danger");
        setAlertMessage(data.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setAlertVariant("danger");
      setAlertMessage("An error occurred during form submission. Please try again later.");
    }
  };

  return (
    <div className="container d-flex flex-column my-5 align-items-center">
      <h2 className="my-5">Enter The OTP</h2>
      {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Enter Email" className="mb-3">
          <Form.Control 
            type="email" 
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="New Password" className="mb-3">
          <Form.Control 
            type="password" 
            placeholder="Enter new password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="OTP">
          <Form.Control 
            type="text" 
            placeholder="Enter OTP"
            name="OTP"
            value={formData.OTP}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button className="my-3" variant="success" type="submit">Verify</Button>
      </Form>
    </div>
  );
};
