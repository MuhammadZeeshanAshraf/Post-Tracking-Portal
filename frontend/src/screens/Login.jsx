import React, { useState } from 'react';
import { LoginWrapper } from '../styles/Login';
import TextField from '@mui/material/TextField';
import { Button, colors, IconButton, InputAdornment, OutlinedInput, Stack, Box, FormControl, InputLabel, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import BackgroundImage from '../img/loginBackgroundImage.jpg'; 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useCookies } from 'react-cookie';


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    const handleChangeUsername = (prop) => (event) => {
        // setU({ ...values, [prop]: event.target.value });
        setUsername(event.target.value);
    };
    const handleChangePassword = (prop) => (event) => {
        setPassword(event.target.value);
    };
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleSubmit = () =>{
        setInvalidPassword(false);
        setInvalidUsername(false);
        setPasswordError('');
        setUsernameError('');
        
        if(password.length > 0 && username.length >0){
            if(password === "trackNtrace123" && username === "admin"){
                let date = new Date();
                date.setTime(date.getTime() + (14*24*60*60*1000));
                let expires = date.toUTCString();
                setCookie('user',{
                    username,
                    password,
                    expires,
                    isLogin:true
                });

            } else{
                setError(true);
            }

        } else if(username.length === 0){
                setUsernameError('username is required field');
                setInvalidUsername(true);
        } else if(password.length === 0){
                setPasswordError('password is required field');
                setInvalidPassword(true);
        }
    }


    return (
        <LoginWrapper style={{ 
            backgroundImage: `url(${BackgroundImage})`,
             backgroundSize: "cover",
            height: "100vh",
        }}>
            <Box 
                sx={{
                    width:'20%',
                    height: '80%',
                    bgcolor: 'white',
                    color: 'secondary.contrastText',
                    p: 2,
                }}
                className="login-card" >
                <form>
                    <Stack direction={"row"} color={"primary"} sx={{marginBottom:'30px', marginTop:'20px'}} justifyContent={"center"} alignItems={"center"}>
                        <LockIcon sx={{marginRight:'10px'}} className='lock-icon'/>
                        <h2>Sign In</h2>
                    </Stack>
                    {
                        error?
                        <Typography color={"red"} sx={{marginLeft:'10px'}} variant="caption" display="block" gutterBottom>
                        Invalid username or password
                      </Typography>
                        :
                        <></>
                    }
                    <TextField 
                        className="input"
                        error={invalidUsername}
                        helperText={usernameError}
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined"
                        value={username}
                        required={true}
                        onChange={handleChangeUsername('username')}
                        startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        } />
                    <FormControl className='input' variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            error={invalidPassword}
                            helperText={passwordError}
                            required={true}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChangePassword('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
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