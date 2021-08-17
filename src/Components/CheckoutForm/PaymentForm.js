import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripepropise = loadStripe(process.env.REACT_APP_STRIPE)

const PaymentForm = ({ checkouttoken, backStep, shippingdata, handleCapturecheckout, nextStep }) => {

    const handlesubmit = async (event, elements, stripe) => {
        event.preventDefault()

        if (!stripe || !elements) return;

        const cardelement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardelement });

        if (error) {
            console.log('[error]', error);
        } else {
            const orderData = {
                line_items: checkouttoken.live.line_items,
                customer: { firstname: shippingdata.firstName, lastname: shippingdata.lastName, email: shippingdata.email },
                shipping: { name: 'international', street: shippingdata.address1, town_city: shippingdata.city, county_state: shippingdata.shippingshubdivision, postal_zip_code: shippingdata.zip, country: shippingdata.shippingcountry },
                fulfillment: { shipping_method: shippingdata.shippingoption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            handleCapturecheckout(checkouttoken.id, orderData)
            console.log('📅',orderData)
        }
    }
    return (
        <>
            <Review checkouttoken={checkouttoken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
            <Elements stripe={stripepropise} >
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handlesubmit(e, elements, stripe)} >
                            <CardElement />
                            <br />
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={backStep} >Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay {checkouttoken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm;
