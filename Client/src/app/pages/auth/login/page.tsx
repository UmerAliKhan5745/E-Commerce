"use client";
import Navbarr from "@/app/components/navbar/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import ResetPassword from "../reset/resetpassword/page";
import Link from "next/link";
interface FormData {
  email: string;
  password: string;
  resetemail: string;
  resetpassword: string;
}
export default function Login() {
  const router = useRouter();
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    resetemail: "",
    resetpassword: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const responseData = await response.json();
      if (responseData.status) {
        setAlertVariant("success");
        setAlertMessage(responseData.message);
        localStorage.setItem("Authorization", responseData.token);
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        setAlertVariant("danger");
        setAlertMessage(responseData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle network errors or other issues
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <Navbarr />
      {alertMessage && (
        <Alert
          className="container my-1"
          variant={alertVariant}
          onClose={() => setAlertMessage("")}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}

      <div className="container my-5">
        <h1 className="mx-auto" style={{ width: "100px" }}>
          Login
        </h1>
        <Card
          className="mx-auto "
          style={{ width: "16rem", padding: "14px", borderRadius: "12px" }}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-primary mx-auto">
              Login
            </button>
            <Link href={"/pages/auth/register"}>
              <p style={{ margin: "2px 0px" }} className="my-2 ">
                SignUp If Not Register
              </p>
            </Link>
            <hr />
            <ResetPassword />
          </form>
        </Card>
      </div>
    </>
  );
}
