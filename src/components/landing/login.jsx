import './landing.css';
import React, { useState } from 'react';
import { loginUser } from '../../redux/actions/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import foto4 from '../../images/foto4.png';
import foto6 from '../../images/foto6.png';
import LoadingUser from './loadingUser';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Flight academy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    pass: "",
    email: "",
  })
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const [islogin, setIslogin] = useState(false)

  const handleInputChange = function (e) {
    console.log(e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (input.email && input.pass) {
      dispatch(loginUser(input));
      setIslogin(true)
      userLogin.hasOwnProperty("id") && navigate('/home')
    } else {
      alert("rellene los campos")
    }
  }

  return (
    //   <div className="contenedorLogin">
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${foto4})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1 }}>
                {/* <LockOutlinedIcon /> */}
                <img src={foto6} alt='Imagen de avatar' />
                {/* Foto avatar usuarios */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Flight Academy
              </Typography>
              <Box component="form" noValidate onSubmit={e => handleSubmit(e)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="pass"
                  label="Contraseña"
                  type="password"
                  id="pass"
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Mantener sesión iniciada"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesion
                </Button>
                {
                  islogin ? < LoadingUser status={islogin} key={input.email} setIslogin={setIslogin} /> : ''
                }
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" style={{ textDecoration: 'none' }}>
                      <div className="btnLogIn">
                        Se olvidó la contraseña?
                      </div>
                    </Link>
                  </Grid>
                  <Grid item>
                  {/*   <Link href="/register" variant="body2" style={{ textDecoration: 'none' }}>
                      <div className="btnLogIn">
                        {"Registrarse"}
                      </div>
                    </Link> */}
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Link href="/">
        <button className='botonVolverLogin'>
          Volver
        </button>
      </Link>
    </div>
  );
}
