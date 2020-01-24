
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './containers/HomePage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

import NavBar from './components/NavBar'
import SideDrawer from './SideDrawer/SideDrawer'
import Backdrop from './SideDrawer/Backdrop'



class App extends React.Component{

  state = {
    stores: [],
    drawerOpen: false,
    favorites: [],
    visited: [],
    username: ''
  }

  componentDidMount(){
    fetch('https://bobafinderbackend.herokuapp.com/profile', {
      headers: {"Authorization": localStorage.getItem("token")}
    })
    .then(res => res.json())
    .then(data => this.setState({
      favorites: data.favorites,
      visited: data.visited,
      username: data.username
    }, () => console.log('profile data', data)))
  }

  favoriteClickHandler = (store) => {

    // CHECK TO SEE IF THE CURRENT FAVORITE STATE INCLUDES THE STORE

    if (this.state.favorites.map((fav) => (fav.id)).includes(store.id)) {
      // IF INCLUDED, REMOVES IT FROM THE STATE
      const newFavs = this.state.favorites.filter ((fav) =>{
        return fav.id !== store.id
      })
      this.setState({
        favorites: newFavs
      })
      // IF NOT INCLUDED, ADD IT TO THE STATE
    } else {
      this.setState({
        favorites: [...this.state.favorites, store]
      })
    }
  }

  visitedClickHandler = (store) => {
    if (this.state.visited.map((fav) => (fav.id)).includes(store.id)) {

      const newVisited = this.state.visited.filter ((v) =>{
        return v.id !== store.id
      })

      this.setState({
        visited: newVisited
      })

    } else {
      this.setState({
        visited: [...this.state.visited, store]
      })
    }
  }

  drawerToggleClickHandler = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  backdropClickHandler = () => {
    this.setState({
      drawerOpen: false
    })
  }

  render(){
    // console.log('App state', this.state)
    // RENDER THE BACKDROP CONDITIONALLY
    let backdrop;
    if(this.state.drawerOpen){
      backdrop = <Backdrop
        backdropClickHandler={this.backdropClickHandler}/>;
    }
    // console.log('App state', this.state)
    return (
      <div className="conts-wrapper">
        <NavBar
          drawerToggleClickHandler={this.drawerToggleClickHandler}/>
        {localStorage.getItem("token") ? (
        <React.Fragment>
          <SideDrawer
            show={this.state.drawerOpen}
            favorites={this.state.favorites}
            visited={this.state.visited}
            username={this.state.username}/>
          {backdrop}
        </React.Fragment>) : null}
        <Switch >
          <Route exact path="/" render={ (props) =>
           <HomePage favoriteClickHandler={this.favoriteClickHandler}
           visitedClickHandler={this.visitedClickHandler}
            {...props}
            /> }/>
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/login" render={ (props) =>
           <LoginPage
            router={props}
            /> }
          />
        </Switch>
      </div>


    )
  }

}
export default App;
