import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import "./CheckOutToGo.css";

const CheckOutToGo = () => {
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
        });

        if (error) {
            toast.error(error.message);
        }

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <button disabled={isProcessing} id="submit">
                <PaymentElement />
            </button>
        </form>
    );
};

export default CheckOutToGo;
