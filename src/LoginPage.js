import React from 'react'
import { Link } from 'react-router-dom'
import './form.css'

class LoginPage extends React.Component{

  state = {
    username: '',
    password: ''
  }

  componentDidMount(){
    if (!!localStorage.getItem("token")){

      this.props.router.history.push('/')

    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch('https://frozen-temple-72152.herokuapp.com/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then( response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Please check your username and password.');
      }
    })
    .then( data => {
      localStorage.setItem('token', data.token)
      // needs to look to see if token is present and is not undefined

      if (localStorage.getItem("token")==="undefined"){
        localStorage.clear()
      } else if (!!localStorage.getItem("token")){
        window.location.replace(`http://localhost:3000/login`)
      }
    })
    .catch((error) => {
      alert('Not valid ID or Password.')
    });
  }

  render(){
    return(
      <div className="wrapper">


        <div className="signup-container">
          <div className="signup-wrapper">
            <h3>Log In 😉</h3>
            <form onSubmit={this.handleSubmit}>
              Username
              <div className="form-inputs"><input type='text' name="username" onChange={this.handleChange}/></div>
              Password
              <div className="form-inputs"><input type='password' name="password" onChange={this.handleChange} /></div>
              <div className="btn-container">
                <input className="login-btn" type='submit' value="Log In" />
                <Link className="signup-btn" to='/signup' >Sign Up </Link>
              </div>
            </form>
          </div>
        </div>
        {
          // waiting on browser router  temp solution
        }
      </div>
    )
  }
}

export default LoginPage
