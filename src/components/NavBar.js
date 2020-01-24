import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'

class NavBar extends React.Component{

  log = () => {
    if (localStorage.getItem('token')){
      return <Nav.Link onClick={this.handleLogOut}>Log Out</Nav.Link>
    } else {
      return <Nav.Link href="/login">Log In</Nav.Link>
    }
  }

  signUp = () => {
    if (localStorage.getItem('token')){
      return
    } else {
      return <Nav.Link href="/signup">Sign Up</Nav.Link>
    }
  }

  handleLogOut = (e) => {
    localStorage.clear()
    window.location.replace(`https://bobafinderjl.herokuapp.com/login`)
  }

  render(){
    return (
        // NAVBAR
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/" className="logo">
              Boba Finder
            </Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link href="/">Home</Nav.Link>
              {this.signUp()}

              {this.log()}

              <Nav.Link
                onClick={this.props.drawerToggleClickHandler}>Profile</Nav.Link>
            </Nav>
          </Container>
        </Navbar>


    );
  }

}
export default NavBar;
