import React from 'react';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


import Button from '@material-ui/core/Button';
import logo from '../../image/logo.svg';

const useStyles = makeStyles((theme) => ({
  buttonLogin: {
    backgroundColor: '#2d9cdb',
    width: '144px',
    height: '50px',
    marginLeft: '30px',
    '&:hover': {
      backgroundColor: '#1f6d99',
    },
  },
}));


function Menu(){
  const classes = useStyles();

  return (
    <nav>
      <Link to="/"><img src={logo} alt="Fabrinni" /></Link>
        
        <div className="menu-items">
          <ul>
            <li><Link to="/autotriagem">Sobre</Link></li> 
            <li><Link to="/">Contato</Link></li>
            <li><Link to="/">Ajuda</Link></li>
            <span>|</span>
            <li><Link to="/">Assinar</Link></li>
          </ul>
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonLogin}
          >
            Login
          </Button>
        </div>
      </nav>
  )
}

export default Menu;