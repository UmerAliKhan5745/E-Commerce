"use client"
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';


interface Props {
  clientSecret: string;  
}

const CheckoutForm: React.FC<Props> = ({ clientSecret }) => {

  const stripe = useStripe();
  const elements = useElements();
 
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
          },
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent?.status === "succeeded") {
          setMessage("Payment succeeded!");
        } else {
          setMessage("Payment failed.");
        }
      }

      setIsLoading(false);
    } catch (error) {
      setMessage((error as Error).message || "Something went wrong.");
      setIsLoading(false);
    }
  };
  const movecontinueshopping=()=>{
    window.location.href = `http://localhost:3000`; // Redirect to the checkout page with subtotal as a query parameter

  }
  return (
    <div>
      <style>
        {`
          #root {
            display: flex;
            align-items: center;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 16px;
            -webkit-font-smoothing: antialiased;
            display: flex;
            justify-content: center;
            align-content: center;
            height: 100vh;
            width: 100vw;
          }

          form {
            width: 30vw;
            min-width: 500px;
            align-self: center;
            box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
              0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
            border-radius: 7px;
            padding: 40px;
          }

          #payment-message {
            color: rgb(105, 115, 134);
            font-size: 16px;
            line-height: 20px;
            padding-top: 12px;
            text-align: center;
          }

          #payment-element {
            margin-bottom: 24px;
          }

          /* Buttons and links */
          button {
            background: #5469d4;
            font-family: Arial, sans-serif;
            color: #ffffff;
            border-radius: 4px;
            border: 0;
            padding: 12px 16px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: block;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            width: 100%;
          }

          button:hover {
            filter: contrast(115%);
          }

          button:disabled {
            opacity: 0.5;
            cursor: default;
          }

          /* spinner/processing state, errors */
          .spinner,
          .spinner:before,
          .spinner:after {
            border-radius: 50%;
          }

          .spinner {
            color: #ffffff;
            font-size: 22px;
            text-indent: -99999px;
            margin: 0px auto;
            position: relative;
            width: 20px;
            height: 20px;
            box-shadow: inset 0 0 0 2px;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
          }

          .spinner:before,
          .spinner:after {
            position: absolute;
            content: '';
          }

          .spinner:before {
            width: 10.4px;
            height: 20.4px;
            background: #5469d4;
            border-radius: 20.4px 0 0 20.4px;
            top: -0.2px;
            left: -0.2px;
            -webkit-transform-origin: 10.4px 10.2px;
            transform-origin: 10.4px 10.2px;
            -webkit-animation: loading 2s infinite ease 1.5s;
            animation: loading 2s infinite ease 1.5s;
          }

          .spinner:after {
            width: 10.4px;
            height: 10.2px;
            background: #5469d4;
            border-radius: 0 10.2px 10.2px 0;
            top: -0.1px;
            left: 10.2px;
            -webkit-transform-origin: 0px 10.2px;
            transform-origin: 0px 10.2px;
            -webkit-animation: loading 2s infinite ease;
            animation: loading 2s infinite ease;
          }

          @keyframes loading {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }

          @media only screen and (max-width: 600px) {
            form {
              width: 80vw;
              min-width: initial;
            }
          }
        `}
      </style>
      <form onSubmit={handleSubmit} id="payment-form">
        <div id="payment-element" className="payment-element">
          <CardElement />
        </div>
        <button type="submit" disabled={!stripe || isLoading} id="submit-button">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay Now"}
        </button>
        <div id="payment-message">
          {message && <div>{message}</div>}
        </div>
      </form>
      <Button onClick={movecontinueshopping}>Continue Shopping</Button>
    </div>
  );
};

export default CheckoutForm;
