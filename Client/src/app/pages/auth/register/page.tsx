"use client";
import Alert from 'react-bootstrap/Alert';
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/page";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation'
import { Card } from 'react-bootstrap';
import Link from "next/link";

const registerSchema = yup.object({
  name: yup.string().min(3).max(10).required("Please Enter the name "),
  email: yup.string().email().required("Please Enter the email "),
  password: yup.string().min(3).max(10).required("Please Enter the password "),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
  dateOfBirth: "",
};
const CenteredDivStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const GoogleButtonStyle = {
  backgroundColor: '#ffffff',
  color: 'grey',
  padding: '20px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontFamily: 'Roboto',
  boxShadow: '0px 0px 10px #9e9e9e',
  transition: 'all 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const GoogleButtonHoverStyle = {
  backgroundColor: '#357ae8',
  cursor: 'pointer',
  boxShadow: '0px 0px 20px #9e9e9e',
  transform: 'scale(1.1)',
  color: 'white',
};

export default function Register() {
  const router = useRouter()

  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { values, handleChange, touched, handleBlur, handleSubmit, errors } =
    useFormik({
      validationSchema: registerSchema,
      initialValues: initialValues,
      onSubmit: async (values) => {
        try {
          const response = await fetch("http://localhost:5000/api/auth/sendOtp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (response.ok) {
            const data = await response.json();
            if (response.status === 201) {
              setAlertVariant("success");
              setAlertMessage(data.message);
              setTimeout(() => {
                router.push('/pages/auth/reset/registerOtp')

              }, 1500);
            } else if (response.status === 200) {
              setAlertVariant("danger");
              setAlertMessage(data.message);
            }
          } else {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error during signup:", error);
          setAlertVariant("danger");
          setAlertMessage(
            "An error occurred during signup. Please try again later."
          );
        }
        
      },
    });
    const googleauth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pages/auth/google-Auth');
        console.log(response.data); // Handle the response data here
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  return (
    <>
      <Navbar />
      {alertMessage && (
          <Alert className='container my-1' variant={alertVariant} onClose={() => setAlertMessage("")} dismissible>
            {alertMessage}
          </Alert>
        )}
      <div className="container my-3">
        <h1 className="mx-auto " style={{ width: "200px" }}>
          Register
        </h1>

        <div className="d-flex justify-content-between">

        <Card
          className="mx-auto "
          style={{ width: "16rem", padding: "14px", borderRadius: "12px" }}
        >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Name
            </label>
            <input
              id="text"
              type="text"
              className="form-control"
              name="name"
              aria-describedby="emailHelp"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}{" "}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <div className="text-danger">{errors.password}</div>
            ) : null}
          </div>
          <label htmlFor="dateOfBirth" className="form-label">
            Date Of Birth
          </label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            id="dateOfBirth"
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-describedby="emailHelp"
          />

          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>

        <Link href={"/pages/auth/login"}>
              <p style={{ margin: "2px 0px" }} className="my-2 ">
                SignIn If Aready Register
              </p>
            </Link>
        </Card>
       
         <div style={CenteredDivStyle}>
      <a
        href="http://localhost:5000/api/auth/google"
        onClick={()=>googleauth()}
        style={{ ...GoogleButtonStyle, ...GoogleButtonHoverStyle }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          height="50px"
          width="50px"
          alt="Google logo"
          style={{ marginRight: '10px' }}
        />
        <span style={{ fontSize: '30px', fontWeight: 'bold',marginRight: '10px' }}>
          Login with Google
        </span>
      </a>
    </div>
        

       </div>
      </div>
    </>
  );
}
