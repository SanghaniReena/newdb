import "./style.css"

import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { bindActionCreators } from "redux";
import * as userAction from '../action/UserRegAction'
import NavbarMain from "../view/NavbarMain"


class UserRegistration extends Component {

  state = {
    name: "",
    email: "",
    pw: "",
    signsucc: "false",
    fieldsErrors: { name: '', email: '', pw: '' },
    fieldsValid: { name: false, email: false, pw: false },
    formValid: false,
    validEmail: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err_msg === "" && this.state.formValid !== false) {
      this.setState({
        inValidEmail: ""
      })
      this.props.history.push('/boards');
    }
    else {

      this.setState({

        validEmail: nextProps.err_msg
      })
    }
  }
  enterPress(e) {
    if (e.key === "Enter") {
      this.props.action.userAction.userRegAction(this.state)
    }
  }
  handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: e.target.value
    }, () => { this.validateField(name, value) })
  }
  handleRegSubmit = () => {

    if (this.state.pw === "")
      this.setState({
        fieldsErrors: { pw: "* Password Required" },
        formValid: false
      })
    if (this.state.email === "")
      this.setState({
        fieldsErrors: { email: "* Email Required" },
        formValid: false
      })

    if (this.state.name === "")
      this.setState({
        fieldsErrors: { name: "* Name Required" },
        formValid: false
      })


    var i;
    for (i = 0; i < this.props.userData.length; i++) {
      if (this.state.email === this.props.userData[i].email) {
        this.setState({
          fieldsErrors: { email: "email is already exist" },
          formValid: false

        })
      }

    }
    if (this.state.formValid) {
      this.props.action.userAction.userRegAction(this.state)

    }
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.fieldsErrors;
    let fieldValidation = this.state.fieldsValid;

    switch (fieldName) {
      case 'name':
        fieldValidation.name = value.match(/^[a-zA-Z]+$/i);
        fieldValidationErrors.name = fieldValidation.name ? '' : ' Only Alphabets Allowed'
        break;

      case 'email':

        fieldValidation.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = fieldValidation.email ? '' : ' Invalid Email';
        break;
      case 'pw':
        fieldValidation.pw = value.length >= 6;
        fieldValidationErrors.pw = fieldValidation.pw ? '' : ' Password is too short';
        break;
      default:
        break;
    }
    this.setState({
      fieldsErrors: fieldValidationErrors,
      fieldsValid: fieldValidation,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.fieldsValid.name &&
        this.state.fieldsValid.email &&
        this.state.fieldsValid.pw

    });
  }

  render() {
    return (
      <div>
        <NavbarMain></NavbarMain>
        <div className="RegForm">
          <h4 className="Header">Create a Trello Account or <Link to="/login" path="/login">Log in</Link> to your account</h4>
          <div className="Form" style={{ marginTop: "3%" }}>

            <Form onKeyPress={this.enterPress.bind(this)} >
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" name="name" id="name" placeholder="Enter name" onChange={this.handleOnChange.bind(this)} />
                <span style={{ color: "red" }}>{this.state.fieldsErrors.name}</span>
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" id="email" placeholder="Enter email" onChange={this.handleOnChange.bind(this)} />
                <span style={{ color: "red" }}>{this.state.fieldsErrors.email}</span>
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="pw" id="pw" placeholder="Enter password" onChange={this.handleOnChange.bind(this)} />
                <span style={{ color: "red" }}>{this.state.fieldsErrors.pw}</span>
              </FormGroup>
              <Button onClick={this.handleRegSubmit.bind(this)}>Create new Account</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.UserRegReducer.users,
    userAuth: state.UserRegReducer.auth,
    err_msg: state.UserRegReducer.error_msg,
    email: state.UserRegReducer.email
  }
}
const mapDispatchToProps = (dispatch) => ({
  action: {
    userAction: bindActionCreators(userAction, dispatch)
  }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRegistration));