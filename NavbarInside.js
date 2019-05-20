import "../view/style.css"

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarToggler, UncontrolledDropdown } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { bindActionCreators } from "redux";
import * as boardAction from "../action/BoardsAction";
import * as teamAction from "../action/TeamsAction"
import * as userAction from "../action/UserRegAction"
const plus = require("../img/plus.png");
const teamI = require("../img/teami.png");
const trelloI = require("../img/ticon.png");
// const homeI = require("../img/home.png");
const trelloIcon = require("../img/trellologo.png");

class NavbarInside extends Component {
  constructor(props) {
    super(props);

   
    this.state = {
      isOpen: false,
      isOpenM: false,
      isOpenTM: false,
      bTitle: "",
      iduser: "",
      boards: [],
      tName: "",
      tDesc: "",
      idteams: 0,
      teams: [],
      auth: true,
      
    };
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleTModal = this.toggleTModal.bind(this)
  }
  componentDidMount = () => {
    const iduser = localStorage.getItem("iduser")
    this.props.action.teamAction.FetchTeam(iduser);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleModal() {
    this.setState({
      isOpenM: !this.state.isOpenM
    });
  }
  toggleTModal() {
    this.setState({
      isOpenTM: !this.state.isOpenTM
    });
  }
  handleOnChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    })
  }

  handleLogout = () => {
    this.setState({
      auth: !this.state.auth
    })
    this.handleLogoutDir();
  }

  handleLogoutDir = () => {
    this.props.action.userAction.logoutAction(false);
    this.props.history.push("/login")
  }

  handleTeamClick = (teamid) => {
    this.props.history.push("/" + teamid + "/teamboards")
  }

  handleClick = () => {
    const idusers = localStorage.getItem("iduser")
    if (idusers === null) {
      this.props.history.push("/login");
    }
    else {
      this.props.history.push("/boards");
    }
  }
  handleCreateBoardEvent = () => {
    this.toggleModal();

    const idusers = localStorage.getItem("iduser")
    const bData = {
      iduser: idusers,
      bTitle: this.state.bTitle,
      idteams: this.state.idteams
    }
    const {history}=this.props    
    this.props.action.boardAction.AddBoard(bData,history)
  }
  handleCreateTeamEvent = () => {
    const idusers = localStorage.getItem("iduser")
    this.toggleTModal();
    const tData = {
      iduser: idusers,
      tName: this.state.tName,
      tDesc: this.state.tDesc
    }
    
    const { history } = this.props;

    this.props.action.teamAction.AddTeam(tData, history)

  }
  render() {
    const uname = localStorage.getItem("userName")
    let teamData = ""
    teamData = this.props.teamData.map((teamData, key) => {
      return (
        <div className="divstyle" style={{ fontWeight: "bold", fontSize: "120%", marginLeft: "2%" }} key={key} onClick={() => this.handleTeamClick(teamData.idteams)}>
          <img height="25px" width="25px" src={teamI} color="#F5F5F5" style={{ marginRight: "3%" }} alt=""></img>
          {teamData.tName}</div>
      )
    })

    let teamSelect = this.props.teamData.map((teamData, key) => {
      return (
        <option key={key} value={teamData.idteams}>{teamData.tName}
        </option>
      )
    })

    return (
      <div>
        <div>
          <Modal isOpen={this.state.isOpenM} toggle={this.toggleModal}>
            <ModalBody>
              <ModalHeader toggle={this.toggleModal}>Create board</ModalHeader>
              <Form>
                <FormGroup>
                  <Input type="text" name="bTitle" id="bTitle" placeholder="Add Board Title" onChange={(e) => this.handleOnChange("bTitle", e)} />
                  
                </FormGroup>
                
                <FormGroup>
                  <Label for="teamselect">Select Team</Label>
                  <Input type="select" name="idteams" id="idteams" onChange={(e) => this.handleOnChange("idteams", e)} >
                    <option value="0">No team</option>
                    {teamSelect}
                  </Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={this.state.bTitle===""} onClick={this.handleCreateBoardEvent.bind(this)}>Create</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.isOpenTM} toggle={this.toggleTModal}>
            <ModalBody>
              <ModalHeader toggle={this.toggleTModal}>Create Team</ModalHeader>
              <Form>
                <FormGroup>
                  <Input type="text" name="tName" id="tName" placeholder="Add team name" onChange={(e) => this.handleOnChange("tName", e)} />
                </FormGroup>
              </Form>
              <Form>
                <FormGroup>
                  <Input type="text" name="tDesc" id="tDesc" placeholder="Add team description" onChange={(e) => this.handleOnChange("tDesc", e)} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={this.state.tName===""} onClick={this.handleCreateTeamEvent.bind(this)}>Create</Button>{' '}
              <Button color="secondary" onClick={this.toggleTModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Navbar expand="md" style={{ backgroundColor: "#026AA7", fontWeight: "bold" }}>
            <a href="/boards" style={{ background: "white", opacity: "0.5", borderRadius: "9%", padding: "0.5%" }}><img height="25px" width="80px" src={trelloIcon} alt=""></img></a>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav style={{ color: "white", fontWeight: "bold", background: "white", opacity: "0.5", borderRadius: "9%" }}>
                  
                    <img className="icolor" height="28px" width="28px" src={plus} alt="" ></img>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem style={{ textAlign: "center" }} header>Create</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.toggleModal}>
                      Create Board
                    </DropdownItem>
                    <DropdownItem onClick={this.toggleTModal}>
                      Create Team
                   </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret style={{ color: "#434b54", marginLeft: "5%", background: "white", opacity: "0.5", borderRadius: "9%", fontSize: "18px" }}>
                    {uname}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.handleLogout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>

        </div>
        <div style={{ width: "15%", float: "left", paddingLeft: "3%", paddingTop: "4%" }}>
          <div  >
            <div className="divstyle" onClick={this.handleClick.bind(this)} style={{ fontWeight: "bold", fontSize: "120%", margin: "2%" }}>
              <img height="25px" width="25px" src={trelloI} style={{ margin: "2%" }} color="#F5F5F5" alt=""></img>Boards</div>
            {/*<div className="divstyle" style={{ fontWeight: "bold", fontSize: "120%", marginLeft: "-2%" }} >
    <img height="30px" width="40px" src={homeI} color="#F5F5F5" alt=""></img>Home</div>*/}
            <div style={{ margin: "2%", fontSize: "120%" }}  >Teams</div>
            {teamData}

          </div>
        </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarInside)); 