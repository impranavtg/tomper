import React from 'react';
import AuthModal from './Authentication/AuthModal'
import { AppBar,Container,Toolbar,Typography ,Select,MenuItem,makeStyles,createTheme,ThemeProvider} from '@material-ui/core';
import UserSidebar from "./Authentication/UserSidebar";
import {Link} from 'react-router-dom';
import { CurrencyState } from '../CurrContext';
const useStyles=makeStyles(()=>({
  link:{
    flex:1
  },
  logo:{
    color:'#FF2E63',
    fontFamily:'inherit',
    fontWeight:'bold',
    cursor:'pointer'
  },
}));
const Navbar = () => {
  const classes=useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {main:'#252A34'},
      type:'dark'
    },
  })
   
  const {currency,setCurrency, user} = CurrencyState();
  return(
     <ThemeProvider theme={darkTheme}>
     <AppBar position='static'>
       <Container>
       <Toolbar>
       <Link to='/' className={classes.link}><Typography className={classes.logo} variant='h5'>Crypto Geeks</Typography></Link>
       <Select variant='outlined' value={currency} style={{
         width:100,
         height:40,
       }}
       onChange={(e)=>setCurrency(e.target.value)}
       >
         <MenuItem value={'INR'} style={{color:'#08D9D6'}}>INR</MenuItem>
         <MenuItem value={'USD'} style={{color:'#08D9D6'}}>USD</MenuItem>
       </Select>
       {user ? <UserSidebar /> : <AuthModal/>}
       </Toolbar>
       </Container>
     </AppBar>
     </ThemeProvider>);
};

export default Navbar;
