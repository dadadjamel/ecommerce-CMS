import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './Styles'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleupdatecartqty, handleremovefromcart, handleEmptycart }) => {
    const isEmpty = !cart.line_items?.length
    const classes = useStyles()
    const renderEmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link to='/' className={classes.link} > start adding some </Link>
        </Typography>
    );

    const renderCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((lineItem) => (
                    <Grid item xs={12} sm={4} key={lineItem.id}>
                        <CartItem
                            handleupdatecartqty={handleupdatecartqty}
                            handleremovefromcart={handleremovefromcart}
                            item={lineItem} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button onClick={() => handleEmptycart()} className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty cart</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) {
        return (
            'Loading...'
        )
    }

    return (
        <div>
            <Container>
                <div className={classes.toolbar} />
                <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
                {!cart.line_items?.length ? renderEmptyCart() : renderCart()}
            </Container>
        </div>
    )
}

export default Cart
