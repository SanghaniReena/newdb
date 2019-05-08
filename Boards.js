import "../view/Boards.css"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Card, CardTitle, Label } from 'reactstrap';
import { bindActionCreators } from "redux";
import * as boardAction from "../action/BoardsAction"
import * as teamAction from "../action/TeamsAction"
import NavbarInside from "../view/NavbarInside"
import { withRouter } from "react-router"

class Boards extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      bTitle: "",
      boards: [],
      isOpenM: false,
      idteams: 0
    };
  }
  handleOnChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    })
  }
  toggleModal() {
    this.setState({
      isOpenM: !this.state.isOpenM
    });
  }
  componentWillMount() {
    const iduser = localStorage.getItem("iduser")
    if (iduser === null) {
      this.props.history.push("/login")
    }
    else {
      this.props.action.boardAction.FetchBoard(iduser)
    }
  }

  handleOnclickCard = (id) => {
   
    const iduser = localStorage.getItem("iduser")
    if (iduser === null) {
      this.props.history.push("/login")
    }else{
    this.props.history.push("/board/" + id)
    }
  }
  handleCreateBoardEvent = () => {
    
    const idusers = localStorage.getItem("iduser")
    this.toggleModal();
    const bData = {
      iduser: idusers,
      bTitle: this.state.bTitle,
      idteams: this.state.idteams
    }
    const {history}=this.props
    console.log("...",this.state.idboards)
    this.props.action.boardAction.AddBoard(bData,history)
    
  }

  render() {

    let boardData = ""
    boardData = this.props.boardData.map((boardData, key) => {
      return (
        <div className="col-sm-4" style={{ padding: "7px", width: "100%", marginLeft: "1%", WebkitFlex: "0 0 33.333333%", maxWidth: "23.333333%" }} key={key}>
          <Card className="card1" onClick={() => this.handleOnclickCard(boardData.idboards)} body outline color="secondary" style={{ width: "90%", backgroundColor: "white", border: "none", borderRadius: " 6%" }} >
            <CardTitle style={{ fontWeight: " bolder", fontSize: "larger" }}>{boardData.bTitle}</CardTitle>
          </Card>
        </div>

      )
    })
    let teamSelect = this.props.teamData.map((teamData, key) => {
      return (
        <option key={key} value={teamData.idteams}>{teamData.tName}
        </option>
      )
    })
    return (
      <div >
        <NavbarInside></NavbarInside>
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
                  <option defaultValue="0">No team</option>
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
        <center>
          <div style={{ padding: "15px", margin: "4% 4% auto auto", float: "right", width: "75%", backgroundColor: "#DCDCDC" }}>
            <h4 style={{ padding: "10px", color: "#026AA7", fontWeight: " bolder", paddingBlockStart: "15px", float: "left", marginLeft: "19px", marginBottom: "-1.5rem" }}>
              Personal Boards</h4></div>
          <div className="row" style={{ padding: "15px", margin: "auto", float: "right", width: "75%", backgroundColor: "#DCDCDC", marginRight: "4%" }}>
            {boardData}
            <div className="col-sm-4" style={{ padding: "7px", width: "100%", marginLeft: "1%", WebkitFlex: "0 0 33.333333%", maxWidth: "23.333333%" }}>
              <Card className="card1" onClick={this.toggleModal} body outline color="secondary" style={{ width: "90%", backgroundColor: "white", border: "none", borderRadius: " 6%" }} >
                <CardTitle style={{ fontSize: "larger" }}>Create board..</CardTitle>
              </Card>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    boardData: state.BoardReducer.boards,
    teamData: state.TeamReducer.teams,
  }
}
const mapDispatchToProps = (dispatch) => ({
  action: {
    boardAction: bindActionCreators(boardAction, dispatch),
    teamAction: bindActionCreators(teamAction, dispatch)

  }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Boards));