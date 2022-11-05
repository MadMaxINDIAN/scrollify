import React, { useState } from 'react'
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/services/actions/authActions';
import { Box, Link, TextField, Typography } from '@mui/material';
import textStyle from '../../helpers/textStyle';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

const LoginForm = (props) => {
    const [loginState, setLoginState] = useState({})
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const Schema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Schema,
        onSubmit: (values, action) => {
            props.login(
                { email: values.email, password: values.password, navigateUrl: props?.navigateUrl },
                enqueueSnackbar,
                navigate,
            );
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
                <div style={{ marginBottom: 20 }}>
                    <TextField
                        fullWidth
                        id='email'
                        name='email'
                        variant='outlined'
                        label='Email'
                        placeholder="Email"
                        type='text'
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleSubmit(e)
                            }
                        }}
                        value={values.email}
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <TextField
                        fullWidth
                        id='password'
                        name='password'
                        variant='outlined'
                        label='Password'
                        placeholder="Password"
                        type='password'
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleSubmit(e)
                            }
                        }}
                        value={values.password}
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </div>
            </div>
            <div style={{ width: '80%', maxWidth: 200, margin: 'auto', marginTop: 15 }}>
                <Link style={{ cursor: 'pointer' }} onClick={handleSubmit}>
                    <div style={{
                        backgroundColor: '#FA861B',
                        padding: '10px 30px',
                        borderRadius: 30
                    }}>
                        <Typography style={{ ...textStyle, color: '#F8F5CC', textAlign: 'center' }}>Login</Typography>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default connect(null, { login })(LoginForm)