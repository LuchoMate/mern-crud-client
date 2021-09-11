import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth' 
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import Icon from './Icon';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles()
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault()
        //sign up or sign in
        if(isSignUp){dispatch(signup(formData, history))}
        else{dispatch(signin(formData, history))}

    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const googleSuccess = async(res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({type: 'AUTH', data: {result, token}})
            history.push('/')
            
        } catch (error) {
            console.log(error)
            
        }

    }

    const googleFailure = () => {
        //console.log(error)
        console.log("error google sign in")
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp?'Sign Up':'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half  />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                                </>
                            )
                        }
                        <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword}/>
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        {isSignUp?'Sign Up':'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId="548001257411-em7c0h9f0n0lqtkp5ihj94glnclt2v9f.apps.googleusercontent.com"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        render={(renderProps)=>(
                        <Button className={classes.googleButton} 
                        color="primary" 
                        fullWidth 
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}
                        variant="contained"
                        >
                            Google Sign In
                        </Button>)} 
                    />

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignUp?'Already have an account? Sign In':'Dont have an account? Sign Up'}</Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>

        </Container>
    )
}

export default Auth