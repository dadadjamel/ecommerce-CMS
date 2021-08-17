import React, { useState, useEffect } from 'react'
import { Paper, Stepper, StepLabel, Typography, CircularProgress, Divider, Button, Step } from "@material-ui/core";
import useStyles from './Styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';




const steps = ['Shipping address', 'Payment details']
const Checkout = ({ cart,order,handleCapturecheckout }) => {
    const [activeStep, setactiveStep] = useState(0)
    const classes = useStyles()
    const [checkouttoken, setcheckouttoken] = useState(null)
    const [shippingdata, setshippingdata] = useState({})
    const Confirmation = () => (
        <div>
            confirmation
        </div>
    )

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                console.log('🔑', token)
                setcheckouttoken(token)
            } catch (error) {

            }
        }

        generateToken()
    }, [cart])

    const nextStep = () => setactiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setactiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setshippingdata(data)
        nextStep()
    }

    const Form = () => activeStep === 0 ? <AddressForm checkouttoken={checkouttoken} next={next} /> : <PaymentForm nextStep={nextStep} handleCapturecheckout={handleCapturecheckout} backStep={backStep} checkouttoken={checkouttoken} shippingdata={shippingdata} />

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkouttoken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
