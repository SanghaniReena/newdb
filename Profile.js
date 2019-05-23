import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as boardAction from "../action/BoardsAction";
import * as teamAction from "../action/TeamsAction"
import * as userAction from "../action/UserRegAction"
import Navbd from './Navbd';
import "./Profile.css"
const edit = require("../img/edit.png");

class Profile extends Component {
    render() {
        let name=localStorage.getItem("userName")
        var myArray = name.split("");
        
        return (
            <div>
                <Navbd></Navbd>
                <div className="profileUpr">
                    <div className="mainprodiv">
                    <div className="profileRound">
                    <span className="spanpro">{myArray[0]}</span></div>
                    <div className="proDetails">
                    <h1>{name}</h1>
                   
                    <button className="proBtn">  <img height="20px" width="20px" alt=""src={edit}></img>Edit Profile</button>
                    </div>
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        boardData: state.boards,
        teamData: state.TeamReducer.teams,
        userAuth: state.UserRegReducer.auth,
        userid: state.UserRegReducer.userid
    }
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        boardAction: bindActionCreators(boardAction, dispatch),
        teamAction: bindActionCreators(teamAction, dispatch),
        userAction: bindActionCreators(userAction, dispatch)
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile)); 
