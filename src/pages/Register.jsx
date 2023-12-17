import React, { useEffect, useState } from 'react'

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
import {yupResolver} from "@hookform/resolvers/yup"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from "yup"

import COFFEE from "../assets/Background.jpg"
import LogoCOFFEE from "../assets/Logo.jpg"

export default function Register() {
    const[loading, setLoading] = useState(true) 
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const validataionScheme = yup.object().shape( {
        firstName : yup.string().min(2).max(7).required(),
        lastName : yup.string().min(2).max(7).required(),
        email : yup.string().email().required(),
        password : yup.string().min(8).max(20).required(),

    })

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({mode : "onChange", resolver : yupResolver(validataionScheme)})

    const handdleDataRegister = (data) => {
        console.log(data);
        localStorage.setItem("dataRegister", JSON.stringify(data))
        toast.success('Register Success', {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => {
            navigate("/login")
        }, 5000)
    }

    return (
        <>
        {
            loading ? 
            <Box
                sx={{position: "absolute",top: "50%",  left: "50%", transform: "translate(-50%, -50%)"}}
            >
                <CircularProgress/> 
            </Box>
            : 
            <Box sx={{ display: 'flex', height: "100vh" }}>
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
                        Sign up COFFEE PAGE
                    </Typography>
                    <Box
                        component="form"
                        sx={{ mt: 3 }}
                        onSubmit={handleSubmit(handdleDataRegister)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...register("firstName")}
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                />
                                <Typography sx={{color : "red", fontSize : "12px", marginTop : "10px"}}>{errors?.firstName?.message}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                {...register("lastName")}
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                />
                                <Typography sx={{color : "red", fontSize : "12px", marginTop : "10px"}}>{errors?.lastName?.message}</Typography>

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("email")}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                                <Typography sx={{color : "red", fontSize : "12px", marginTop : "10px"}}>{errors?.email?.message}</Typography>

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
                                <Typography sx={{color : "red", fontSize : "12px", marginTop : "10px"}}>{errors?.password?.message}</Typography>
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
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
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
