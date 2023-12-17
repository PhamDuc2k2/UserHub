import React , { useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import Copyright from '../common/CopyRight';

import { Link, useNavigate } from "react-router-dom";

import {useForm} from "react-hook-form"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import COFFEE from "../assets/Background.jpg"
import LogoCOFFEE from "../assets/Logo.jpg"

export default function Login() {
    const[loading, setLoading] = useState(true) 
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const handdleDataLogin = (dataLogin) => {
        let dataRegisterLocal = JSON.parse(localStorage.getItem(("dataRegister")))
        if(dataLogin.email === dataRegisterLocal.email && dataLogin.password === dataRegisterLocal.password) {
            toast.success('Login Success', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate("/")
            }, 5000)
        } else {
            toast.error('Login Fail', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
        {
            loading ? <Box
            sx={{position: "absolute",top: "50%",  left: "50%", transform: "translate(-50%, -50%)"}}
        >
            <CircularProgress/> 
        </Box>
        : <Box sx={{ display: "flex", height: "100vh" }}>
            <Box
                component="img"
                sx={{
                    height: "100%",
                    width: "50%",
                }}
                alt="COFFEE"
                src={COFFEE}
            />
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 150,
                            marginBottom: "50px"
                        }}
                        alt="LogoCOFFEE"
                        src={LogoCOFFEE}
                    />
                    <Typography component="h1" variant="h5">
                        Sign in COFFEE PAGE
                    </Typography>
                    <Box
                        component="form"
                        sx={{ mt: 3 }}
                        onSubmit={handleSubmit(handdleDataLogin)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                 {...register("email")}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                                <Typography
                                    sx={{ fontSize: "12px", marginTop: "7px" }}
                                    color="tomato"
                                >
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                 {...register("password")}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                                <Typography
                                    sx={{ fontSize: "12px", marginTop: "7px" }}
                                    color="tomato"
                                >
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="Agree with our terms and conditions"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </Box>
        }
        </>
    )
}