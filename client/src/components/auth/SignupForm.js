import { Grid, InputAdornment, Link, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { BASE_URL_1 } from '../../constants/urls'
import textStyle from '../../helpers/textStyle'
import { addLoader, removeLoader } from '../../redux/services/actions/loaderActions'
import { login } from '../../redux/services/actions/authActions'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

const SignupForm = (props) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const Schema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        contact: Yup.string().required("contact is required"),
        line1: Yup.string().required("Address is required"),
        city: Yup.string().required("city is required"),
        state: Yup.string().required("state is required"),
        pincode: Yup.string().required("pincode is required")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            contact: "",
            line1: "",
            city: "",
            state: "",
            pincode: ""
        },
        validationSchema: Schema,
        onSubmit: async (values, action) => {
            props.addLoader()
            try {
                const res = await axios.post(`${BASE_URL_1}/auth/signup`, values)
                props.login(
                    { email: values.email, password: values.password, navigateUrl: props?.navigateUrl },
                    enqueueSnackbar,
                    navigate,
                );
                props.removeLoader()
            } catch (err) {
                props.removeLoader()
                let message = 'Something went wrong'
                if (err?.response?.data?.errors) {
                    message = err?.response?.data?.errors[0].msg
                } else if (err?.response?.data?.message) {
                    message = err?.response?.data?.message
                }
                enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000
                })
                action.setSubmitting(false);
            }
        }
    })

    const {
        errors,
        values,
        touched,
        handleSubmit,
        isSubmitting,
        getFieldProps,
        setSubmitting,
    } = formik;

    return (
        <>
            <div style={{ margin: 'auto', padding: window.innerWidth > 400 ? 10 : 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div style={{ marginBottom: 20 }}>
                            <TextField
                                fullWidth
                                id='first_name'
                                name='first_name'
                                variant='outlined'
                                label='First Name'
                                placeholder="First Name"
                                type='text'
                                value={values.firstName}
                                {...getFieldProps("firstName")}
                                error={Boolean(touched.firstName && errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ marginBottom: 20 }}>
                            <TextField
                                fullWidth
                                id='last_name'
                                name='last_name'
                                variant='outlined'
                                label='Last Name'
                                placeholder="Last Name"
                                type='text'
                                value={values.lastName}
                                {...getFieldProps("lastName")}
                                error={Boolean(touched.lastName && errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                        </div>
                    </Grid>
                </Grid>
                <div style={{ marginBottom: 20 }}>
                    <TextField
                        fullWidth
                        id='email'
                        name='email'
                        variant='outlined'
                        label='Email'
                        placeholder="Email"
                        type='text'
                        value={values.email}
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <TextField
                        fullWidth
                        id='password'
                        name='password'
                        variant='outlined'
                        label='Password'
                        placeholder="Password"
                        type='password'
                        value={values.password}
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <TextField
                        fullWidth
                        id='contact'
                        name='contact'
                        variant='outlined'
                        label='Contact'
                        placeholder="Contact"
                        type='text'
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+91-</InputAdornment>,
                        }}
                        value={values.contact}
                        {...getFieldProps("contact")}
                        error={Boolean(touched.contact && errors.contact)}
                        helperText={touched.contact && errors.contact}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <TextField
                        fullWidth
                        id='address'
                        name='address'
                        variant='outlined'
                        label='Address'
                        placeholder="Address"
                        type='text'
                        value={values.line1}
                        {...getFieldProps("line1")}
                        error={Boolean(touched.line1 && errors.line1)}
                        helperText={touched.line1 && errors.line1}
                    />
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id='city'
                            name='city'
                            variant='outlined'
                            label='City'
                            placeholder="City"
                            type='text'
                            value={values.city}
                            {...getFieldProps("city")}
                            error={Boolean(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id='state'
                            name='state'
                            variant='outlined'
                            label='State'
                            placeholder="State"
                            type='text'
                            value={values.state}
                            {...getFieldProps("state")}
                            error={Boolean(touched.state && errors.state)}
                            helperText={touched.state && errors.state}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id='pincode'
                            name='pincode'
                            variant='outlined'
                            label='Pincode'
                            placeholder="Pincode"
                            type='text'
                            value={values.pincode}
                            {...getFieldProps("pincode")}
                            error={Boolean(touched.pincode && errors.pincode)}
                            helperText={touched.pincode && errors.pincode}
                        />
                    </Grid>
                </Grid>
            </div>
            <div style={{ width: '80%', maxWidth: 200, margin: 'auto', marginTop: 15 }}>
                <Link style={{ cursor: 'pointer' }} onClick={handleSubmit}>
                    <div style={{
                        backgroundColor: '#FA861B',
                        padding: '10px 30px',
                        borderRadius: 30
                    }}>
                        <Typography style={{ ...textStyle, color: '#F8F5CC', textAlign: 'center' }}>Signup</Typography>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default connect(null, { addLoader, removeLoader, login })(SignupForm)