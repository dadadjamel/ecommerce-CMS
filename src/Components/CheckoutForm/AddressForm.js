import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'
import { Link } from 'react-router-dom'

const AddressForm = ({ checkouttoken, next }) => {
    const [shippingcountries, setshippingcountries] = useState([])
    const [shippingcountry, setshippingcountry] = useState('')
    const [shippingshubdivisions, setshippingshubdivisions] = useState([])
    const [shippingshubdivision, setshippingshubdivision] = useState('')
    const [shippingoptions, setshippingoptions] = useState([])
    const [shippingoption, setshippingoption] = useState('')
    const methods = useForm()

    const fetchshippingcoutries = async (checkouttokenid) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkouttokenid)
        console.log('🔐', checkouttokenid)
        setshippingcountries(countries)
        setshippingcountry(Object.keys(countries)[0])
    }

    const fetchsubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        setshippingshubdivisions(subdivisions)
        setshippingshubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

        setshippingoptions(options);
        setshippingoption(options[0].id);
    };

    useEffect(() => {
        fetchshippingcoutries(checkouttoken.id)
    }, [])

    useEffect(() => {
        if (shippingcountry) fetchsubdivisions(shippingcountry)
    }, [shippingcountry])

    useEffect(() => {
        if (shippingshubdivision) fetchShippingOptions(checkouttoken.id, shippingcountry, shippingshubdivision)
    }, [shippingshubdivision])


    // console.log('🗺',shippingcountries)

    const countrie = Object.entries(shippingcountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingshubdivisions).map(([code, name]) => ({ id: code, label: name }))

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit((data)=> next({...data,shippingcountry, shippingshubdivision, shippingoption}))} >
                    <Grid container spacing={3} >
                        <FormInput required name="firstName" label="First name" />
                        <FormInput required name="lastName" label="Last name" />
                        <FormInput required name="address1" label="Address line 1" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="Zip / Postal code" />
                        <Grid item sm={6} xs={12} >
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingcountry} fullWidth onChange={(e) => setshippingcountry(e.target.value)} >
                                {/* {console.log(Object.entries(shippingcountries))} */}
                                {countrie.map(country => (
                                    <MenuItem key={country.id} value={country.id} >
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>

                        </Grid>

                        <Grid item sm={6} xs={12} >
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingshubdivision} fullWidth onChange={(e) => setshippingshubdivision(e.target.value)} >
                                {subdivisions.map(subdivision => (
                                    <MenuItem key={subdivision.id} value={subdivision.id} >
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>

                        </Grid>

                        <Grid item sm={6} xs={12} >
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingoption} fullWidth onChange={(e) => setshippingoption(e.target.value)}>
                                {shippingoptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>

                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>

                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
