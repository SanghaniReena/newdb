import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Label } from 'reactstrap';
import { Card, CardTitle } from 'reactstrap';
import { bindActionCreators } from "redux";
import NavbarInside from "../view/NavbarInside"
import { withRouter } from "react-router"
import * as teamboardAction from "../action/TeamBoardsAction"
import * as teamAction from "../action/TeamsAction"
import * as boardAction from "../action/BoardsAction"

class TeamBoards extends Component {

    componentWillUpdate() {
        const idteams = this.props.location.pathname.slice(1);
        const idteam = idteams.slice(0, -11);
        if (idteam !== 0) {
            this.props.action.teamboardAction.FetchTBoard(idteam)
        }
    }

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            bTitle: "",
            boards: [],
            idteams: 0,
            isOpenM: false,
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

    handleOnclickCard = (id) => {
        this.props.history.push("/board/" + id)
    }
    handleCreateBoardEvent = () => {

        const idusers = localStorage.getItem("iduser")
        this.toggleModal();
        const TbData = {
            iduser: idusers,
            bTitle: this.state.bTitle,
            idteams: this.state.idteams
        }
        if (this.state.idteams === 0) {
            const { history } = this.props
            // console.log("...",this.state.idboards)
            this.props.action.boardAction.AddBoard(TbData, history)
        }
        else {
            const { history } = this.props
            this.props.action.teamboardAction.AddTBoard(TbData, history)
        }
    }

    render() {
        let teamboardData = ""
        teamboardData = this.props.teamboardData.map((teamboardData, key) => {
            return (
                <div className="col-sm-4" style={{ padding: "7px", width: "100%", marginLeft: "1%", WebkitFlex: "0 0 33.333333%", maxWidth: "23.333333%" }} key={key}>
                    <Card className="card1" onClick={() => this.handleOnclickCard(teamboardData.idboards)} body outline color="secondary" style={{ width: "90%", backgroundColor: "white", border: "none", borderRadius: " 6%" }} >
                        <CardTitle style={{ fontWeight: " bolder", fontSize: "larger" }}>{teamboardData.bTitle}</CardTitle>
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
                                <Input type="select" defaultValue="0" name="idteams" id="idteams" onChange={(e) => this.handleOnChange("idteams", e)} >
                                    <option value="0">No team</option>
                                    {teamSelect}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" disabled={this.state.bTitle === ""} onClick={this.handleCreateBoardEvent.bind(this)}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <center>
                    <div style={{ padding: "15px", margin: "4% 4% auto auto", float: "right", width: "75%", backgroundColor: "#DCDCDC" }}>
                        <h4 style={{ padding: "10px", color: "#026AA7", fontWeight: " bolder", paddingBlockStart: "15px", float: "left", marginLeft: "19px", marginBottom: "-1.5rem" }}>
                            Team Boards</h4></div>
                    <div className="row" style={{ padding: "15px", margin: "auto", float: "right", width: "75%", backgroundColor: "#DCDCDC", marginRight: "4%" }}>
                        {teamboardData}
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
        teamboardData: state.TeamBoardsReducer.Tboards,
        boardData: state.BoardReducer.Boards,
        teamData: state.TeamReducer.teams,
    }
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        teamboardAction: bindActionCreators(teamboardAction, dispatch),
        boardAction: bindActionCreators(boardAction, dispatch),
        teamAction: bindActionCreators(teamAction, dispatch),

    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamBoards));