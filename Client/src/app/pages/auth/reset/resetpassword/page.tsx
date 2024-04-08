"use client"
import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
interface FormData {
  email: string;
  resetemail: string;
}
export default function ResetPassword() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    resetemail: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const resetPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/resetpasswordemailesend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.resetemail,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.status === "success") {
        setAlertVariant("success");
        setAlertMessage(responseData.message);
        setTimeout(() => {
          router.push("/pages/auth/reset/passwordOtp");
        }, 1000);
      } else if (responseData.status === "failed") {
        setAlertVariant("danger");
        setAlertMessage(responseData.message);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      // Handle network errors or other issues
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <form>
            <label htmlFor="resetemail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="resetemail"
              value={formData.resetemail}
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={resetPassword}>
            Save New Password
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container my-1">
        <button
          type="button"
          onClick={() => {
            handleShow();
          }}
          className="btn btn-warning mx-auto"
        >
          Recover Password
        </button>
      </div>
    </>
  );
}
