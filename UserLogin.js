import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { bindActionCreators } from "redux";
import * as userAction from "../action/UserRegAction"
import NavbarMain from "../view/NavbarMain"


class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            iduser: "",
            email: "",
            pw: "",
            auth: "",
            isLoggedin: false,
            user: { email: "", pw: "" },
            fieldsErrors: { email: '', pw: '' },
            fieldsValid: { email: false, pw: false },
            formValid: false,
            err_msg: ""
        };

    }
    componentDidMount() {
        this.props.action.userAction.FetchUsers();
        const { userAuth } = this.props;
        this.setState({ auth: userAuth })
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps.userAuth !== this.state.auth) {
            this.setState({ auth: nextProps.userAuth });
        }
        const { auth } = this.state;
        if (auth === true) {
            this.ont();
        }
    }
    ont = () => {
        
        const iduser = localStorage.getItem("iduser")
        const { auth } = this.state;
        if (auth === true && iduser !== null) {
            this.props.history.push("/boards");
            this.setState({
                iduser: this.props.userAuth.iduser
            })
        }
        else {
            this.props.history.push("/login");
        }
    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldsErrors;
        let fieldValidation = this.state.fieldsValid;

        switch (fieldName) {
            case 'email':
                fieldValidation.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$|^$/i);
                fieldValidationErrors.email = fieldValidation.email ? '' : ' Invalid Email';
                break;
            case 'pw':
                fieldValidation.pw = value.trim().length >= 6 || value.match(/^$/);
                fieldValidationErrors.pw = fieldValidation.pw ? '' : ' Invalid Password ';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            fieldValidation: fieldValidation
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.fieldValidation.email &&
                this.state.fieldValidation.pw
        });
    }



    handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: e.target.value
        }, () => { this.validateField(name, value) })

    }

    handleLoginSubmit = (e) => {

        const loginUsers = {

            email: this.state.email,
            pw: this.state.pw,
            isLoggedin: true
        }
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

        if (this.state.formValid) {

            this.props.action.userAction.userloginAction(loginUsers)
        }
    }

    enterPress(e) {
        if (e.key === "Enter") {
            this.props.action.userAction.userloginAction(this.state)
        }
    }
    render() {

        return (
            <div>
                <NavbarMain></NavbarMain>
                <div className="RegForm">
                    <h4 className="Header" style={{ marginBottom: "3%" }}>Welcome to Trello! Log in to Trello or <Link to="/signup" path="/signup">Create an account</Link></h4>
                    <div className="Form" >
                        <Form onKeyPress={this.enterPress.bind(this)} >
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
                            <Button onClick={this.handleLoginSubmit.bind(this)} style={{ backgroundColor: "#026AA7", fontWeight: "bold" }} >Log In</Button>
                            <center> <FormGroup>
                                {(this.props.err_msg !== "successfully authenticated") ? <span style={{ color: "red" }}>{this.props.err_msg}</span> : <span style={{ color: "red" }}>{}</span>}
                            </FormGroup></center>
                            <FormGroup>
                                <Link to="/forgetpw">Forget Password?</Link>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userAuth: state.UserRegReducer.auth,
        err_msg: state.UserRegReducer.error_msgl
    }
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        userAction: bindActionCreators(userAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);