import React from 'react'
import './form.css'

class SignupPage extends React.Component{

  state = {
    username: '',
    password: ''

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = (e) => {
    e.preventDefault()

    // creating a new user
    fetch('https://frozen-temple-72152.herokuapp.com/signup',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then( res => res.json() )
    .then( data => {
      // if successful, token will be recieved
      localStorage.setItem('token', data.token)
      window.location.replace(`https://bobafinderjl.herokuapp.com/`)
      // this.props.history.push('/')
      //after sign up pushed to main page
    })

  }

  render(){
    return(
      <div className="wrapper">
        <div className="signup-container">
          <div className="signup-wrapper">
            <h3>Join <span className="join">Boba Finder!</span> 😋</h3>
            <form onSubmit={this.handleSignUp}>
              Username
              <div className="form-inputs"><input type='text' name="username" onChange={this.handleChange}/></div>
              Password
              <div className="form-inputs"><input type='password' name="password" onChange={this.handleChange} /></div>
              <div className="btn-container signup">
                <input className="login-btn" type='submit' value="Sign Up" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignupPage
