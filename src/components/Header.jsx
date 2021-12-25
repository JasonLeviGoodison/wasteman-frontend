import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import * as routes from '../routes/routes';

const Header = (props) => {
  let navigate = useNavigate();

  const onMansClicked = () => {
    navigate(routes.MANS);
  };
  const homeClicked = () => {
    navigate(routes.HOME);
  }

  const onRefundClicked = () => {
    navigate(routes.REFUND);
  }

  return (
    <div className="header">
      <Navbar expand="lg">
        <Navbar.Brand onClick={homeClicked}>
          {' '}
          <div style={{ paddingLeft: 10 }}>
            Miami After Dark
            {/* <img
              alt="Company logo"
              src={`${process.env.REACT_APP_REACT_URL}/checklist.png`}
              style={{ paddingLeft: 5, paddingBottom: 5, width: 35 }}
            /> */}
          </div>
          {' '}

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent: 'end'}}>
          <Nav className="ml-auto">
            <Nav.Link href="http://3.90.235.184/"> Home </Nav.Link>
            <Nav.Link onClick={homeClicked}> Mint </Nav.Link>
            <Nav.Link onClick={onRefundClicked}> Refund </Nav.Link>
            <Nav.Link onClick={onMansClicked}> Collection </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Divider />
    </div>
  );
};

export default Header;
