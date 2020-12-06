import React from "react";
import { Row } from "react-bootstrap";
import firebase from '../firebase'
import { browserHistory } from 'react-router'
export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      name:''
    }
  }
  componentDidMount(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  signUp(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        // user.updateProfile({
        //   displayName: this.state.name
        // }).then(function() {
        //   console.log("update successfull")
          
        // }).catch(function(error) {
        //   console.log(error)
        // });
        browserHistory.push("/login")
        console.log(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        // ..
      });
  }
  onChangePassword(e){
    this.setState({password:e.target.value})
  }
  onChangeUsername(e){
    this.setState({email:e.target.value})
  }
  onChangeName(e){
    this.setState({name:e.target.value})
  }
  render() {
    return (
      <form id="form">
        <Row>Email</Row>
        <Row>
          <input type="email" placeholder="enter email" className="input-email" onChange={this.onChangeUsername.bind(this)} required />
        </Row>
        <Row>
          Name
        </Row>
        <Row>
          <input type="text" placeholder="enter name" className="input-text" onChange={this.onChangeName.bind(this)} required />
        </Row>
        <Row>Password</Row>
        <Row>
          <input type="password" placeholder="enter password" className="input-password" onChange={this.onChangePassword.bind(this)} required />
        </Row>
        <Row>
          <button className="button" onClick={this.signUp.bind(this)}>
            Signup
          </button>
        </Row>
      </form>
    );
  }
}
