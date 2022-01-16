import React from 'react';
import { LoginWrapper } from '../styles/Login';
import TextField from '@mui/material/TextField';
import { Button, colors, IconButton, InputAdornment, OutlinedInput, Stack, Box, FormControl, InputLabel } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import BackgroundImage from '../img/loginBackgroundImage.jpg'; 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = () => {

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword :false,
        invalidPassword: false,
        invalidUsername: false,
        usernameError: '',
        passwordError: '',

    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
    const handleSubmit = () =>{
        setValues({
            ...values,
            invalidUsername : false,
            usernameError: '',
            invalidPassword : false,
            passwordError:'',
        });

        console.log(values)
        if(values.username.length == 0 && values.password.length == 0){
            console.log('3333333333333')
            setValues({
                ...values,
                invalidUsername : true,
                usernameError: 'username cannot be empty',
                invalidPassword : true,
                passwordError: 'password cannot be empty',
            });
            console.log(values)
        } else if(values.username.length == 0){
            setValues({
                ...values,
                invalidUsername : true,
                usernameError: 'username cannot be empty',
            });
        } else if(values.password.length == 0){
            setValues({
                ...values,
                invalidPassword : true,
                passwordError: 'password cannot be empty',
            });
        }

        if(values.password.length == 0){
            setValues({
                ...values,
                invalidPassword : true,
                passwordError: 'password cannot be empty',
            });
        }

        // submit login
    }


    return (
        <LoginWrapper style={{ 
            backgroundImage: `url(${BackgroundImage})`,
             backgroundSize: "cover",
            height: "100vh",
        }}>
            <Box 
                sx={{
                    width:'400px',
                    height: '80%',
                    // bgcolor: 'white',
                    color: 'secondary.contrastText',
                    p: 2,
                }}
                className="login-card" >
                <form>
                    <div className="heading-div d-flex flex-direction-column justify-content-center algin-items-center">
                        <LockIcon className='lock-icon'/>
                        <h2>Sign In</h2>
                    </div>
                    <TextField 
                        className="input"
                        error={values.invalidUsername}
                        helperText={values.usernameError}
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined"
                        value={values.username}
                        onChange={handleChange('username')}
                        startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        } />
                    <FormControl className='input' variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            error={values.invalidPassword}
                            helperText={values.passwordError}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <div className="btn-div">
                        <Button onClick={handleSubmit} className="login-btn"  variant="contained">Sign In</Button>
                    </div>
                </form>
            </Box>
        </LoginWrapper>
    );
};

export default Login;