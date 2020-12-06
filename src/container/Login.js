import React from "react";
import { Row } from "react-bootstrap";
import fire from '../firebase'
import { browserHistory } from 'react-router'
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
  }
  componentDidMount(){
    fire.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  onLogin(e) {
    e.preventDefault()
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((user)=>{
      document.getElementById('form').reset()
      browserHistory.push("/dashboard")
    }).catch((err)=>{
      console.log(err)
    })
  }
  onChangePassword(e){
    this.setState({email:e.target.value})
  }
  onChangeUsername(e){
    this.setState({password:e.target.value})
  }
  render() {
    return (
      <form id="form">
        <Row>Email</Row>
        <Row>
          <input type="email" className="input-email" placeholder="enter email address" onChange={this.onChangeUsername.bind(this)} required />
        </Row>
        <Row>Password</Row>
        <Row>
          <input type="password" className="input-password" placeholder="enter password" onChange={this.onChangePassword.bind(this)} required />
        </Row>
        <Row>
          <button className="button" onClick={this.onLogin.bind(this)}>
            Submit
          </button>
        </Row>
      </form>
    );
  }
}
