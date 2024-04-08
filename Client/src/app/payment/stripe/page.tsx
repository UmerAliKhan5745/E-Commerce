"use client"
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/page';
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe("pk_test_51OyxV3CgxQYZeBXvJWypSJBNhGCbVzel79EYWG3kqGAkdDldt9bsGDHniWmbvfvk6HIBiGT77XfRuH4kG6r3TXrk00KSVPpPvm");

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const subtotalValue = parseFloat(searchParams.get('subtotal') ?? '0'); // Use '0' as default value if 'subtotal' is not present or null
  // console.log(subtotalValue, 'page');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subtotal: subtotalValue }) // Pass subtotal from URL
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [subtotalValue]); // Add subtotalValue to dependencies

  return (
    <div>
      <h1>Checkout</h1>
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}
