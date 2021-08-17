import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyle from './Style'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ total }) => {
    const classes = useStyle()
    const location = useLocation()
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color="inherit" >
                <Toolbar>
                    <Typography component={Link} to='/' variant="h6" className={classes.title} color="inherit">
                        <img src='https://github.com/adrianhajdin/project_e_commerce/blob/main/src/assets/commerce.png?raw=true' alt="commerce.js" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to='/cart' aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={total} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>

            </AppBar>

        </>
    )
}

export default Navbar
