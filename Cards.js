import "./Cards.css"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";
import Calendar from 'react-calendar';
import TimeField from 'react-simple-timefield';
import { bindActionCreators } from "redux";
import * as boardAction from "../action/BoardsAction"
import * as cardAction from "../action/CardsAction"
import * as listAction from "../action/ListsAction"
import * as teamboardAction from "../action/TeamBoardsAction";
import * as teamAction from "../action/TeamsAction";

import { DropdownItem, DropdownMenu, Label, DropdownToggle, Input, Dropdown, Button, FormGroup, Form, } from 'reactstrap';
const move = require("../img/move.png");
const duedate = require("../img/duedate.png");
const copy = require("../img/copy.png");
const watch = require("../img/watch.png");
const archive = require("../img/archive.png");
const member = require("../img/member.png");
const description = require("../img/description.png");
const comments = require("../img/comments.png");
const activity = require("../img/activity.png");
const close = require("../img/close.png");
const refresh = require("../img/refresh.png")
const remove = require("../img/remove.png")

class Cards extends Component {
    constructor(props) {
        super();
        this.ESCAPE_KEY = 27;
        this.ENTER_KEY = 13;
        this.state = {
            editText: "",
            dropdownOpen: false,
            ddrodpownOpen: false,
            editing: false,
            show: false,
            comment: "",
            cDesc: "",
            date: "",
            idcards: 0,
            idboards: 0,
            idlist: 0,
            rem:0,
            showStb: false,
            showDel: false,
            time: '12:00'
        };
        this.toggle = this.toggle.bind(this);
        this.toggled = this.toggled.bind(this)
        this.onTimeChange = this.onTimeChange.bind(this);
    }
    componentWillMount() {
        
        const iduser = localStorage.getItem("iduser")
        this.props.action.boardAction.FetchAllBoard(iduser);
        // this.props.action.cardAction.FetchCardComments(this.props.idcards)
    }

    componentDidMount() {
        let idb;
        if (this.props.allBoardsData.length > 0) {
            idb = this.props.allBoardsData[0].idboards
        }
        else {
            idb = 0
        }
        this.props.action.listAction.FetchAllList(idb);
        var dated = new Date().getDate() + 1; //Current Date.
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear()
        var defaltDate = month + "/" + dated + "/" + year
        this.setState({
            date:defaltDate
        })
    }
    toggled() {
        var dated = new Date().getDate() + 1; //Current Date.
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear()
        var defaltDate = month + "/" + dated + "/" + year
        this.setState({
            date:defaltDate,
            rem:0
        })
        this.setState({
            ddropdownOpen: !this.state.ddropdownOpen,
        });
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            idboards: 0,
            idlist: 0
        });
        let idb;
        if (this.props.allBoardsData.length > 0) {
            idb = this.props.allBoardsData[0].idboards
        }
        else {
            idb = 0
        }
        this.props.action.listAction.FetchAllList(idb);
    }
    handleEdit = (e) => {
        return (e) => this.setState({
            editing: !this.state.editing,
            show: true
        });
    }

    handleChange(e) {
        this.setState({ editText: e.target.value });
    }

    handleOnChange = (key, e) => {
        
        this.setState({
            [key]: e.target.value
        })

    }
    handleOnChangemove = (key, e) => {
        this.setState({
            [key]: e.target.value
        })
        this.props.action.listAction.FetchAllList(e.target.value)
    }
    handleOnChangeDate = (key, e) => {
        let d = e.toLocaleDateString();
        this.setState({
            date: d
        })

        console.log("date", this.setState.date)
    }
    handleSubmit(e) {
        var val = this.state.editText.trim();
        if (val) {
            this.setState({
                editText: val,
                editing: false,
            });
        }
    }
    handleCommSubmit = (id, e) => {
        e.preventDefault()
        this.refs.form.reset();
        const carddetails = {
            idcards: id,
            cComment: this.state.comment
        }

        this.props.action.cardAction.AddComment(carddetails)
        this.setState({
            comment: ""
        })

    }
    handleDescSubmit = (id, e) => {
        this.setState({
            show: !this.state.show
        })
        const carddetails = {
            idcards: id,
            cDesc: this.state.cDesc
        }
        this.props.action.cardAction.AddDesc(carddetails)
    }
    handleDescEdit = (id, e) => {

        this.setState({
            show: !this.state.show
        })
        let carddetails = ""
        if (this.state.cDesc === "") {
            carddetails = {
                idcards: id,
                cDesc: this.props.cardDetails[0].cDesc
            }
        } else {
            carddetails = {
                idcards: id,
                cDesc: this.state.cDesc
            }
        }
        this.props.action.cardAction.EditDesc(carddetails)
    }
    handleKeyDown(e) {
        if (e.which === this.ESCAPE_KEY) {
            this.setState({
                editText: this.props.name,
                editing: false
            });
        } else if (e.which === this.ENTER_KEY) {
            this.handleSubmit(e);
        }
    }
    handleSTBClick = (idcards) => {
        this.setState({
            showDel: !this.state.showDel,
            isArch: 0
        })
        this.props.action.cardAction.SendtbCard(idcards)

    }
    handleDeleteClick = (idcards) => {
        this.props.action.cardAction.DeleteCard(idcards)
    }
    handleCancel = () => {
        this.setState({
            show: !this.state.show
        })

    }
    handleCancelc = (e) => {
        e.preventDefault();
        this.refs.form.reset();
    }
    handlearchive = (idcards) => {
        this.props.action.cardAction.ArchiveCard(idcards)
    }
    handleArchiveClick = (idcards) => {
        this.setState({
            showDel: !this.state.showDel,
            isArch: 1
        })
        this.props.action.cardAction.ArchiveCard(idcards)

    }
    handleDelComm = (idcomm) => {
        this.props.action.cardAction.deleteComm(idcomm)
    }
    onTimeChange(time) {
        this.setState({ time });
    }
    hanndleMove = () => {
        let moveData = []
        let idb;
        if (this.state.idboards === 0) {
            if (this.props.allBoardsData.length > 0) {
                idb = this.props.allBoardsData[0].idboards
            }
            else {
                idb = 0
            }
            moveData = {
                idcards: this.props.idcards,
                idboards: idb,
                idlist: this.state.idlist
            }
        }
        if (this.state.idlist === 0) {
            let idl;
            if (this.props.allListData.length > 0) {
                idl = this.props.allListData[0].idlist
            }
            else {
                idl = 0
            }
            moveData = {
                idcards: this.props.idcards,
                idboards: this.state.idboards,
                idlist: idl
            }
        }
        if (this.state.idboards === 0 && this.state.idlist === 0) {
            let idb;
            let idl;
            if (this.props.allBoardsData.length > 0) {
                idb = this.props.allBoardsData[0].idboards
            }
            else {
                idb = 0
            }
            if (this.props.allListData.length > 0) {
                idl = this.props.allListData[0].idlist
            }
            else {
                idl = 0
            }
            moveData = {
                idcards: this.props.idcards,
                idboards: idb,
                idlist: idl
            }
        }
        if (this.state.idboards !== 0 && this.state.idlist !== 0) {
            moveData = {
                idcards: this.props.idcards,
                idboards: this.state.idboards,
                idlist: this.state.idlist
            }
        }
        this.props.action.cardAction.MoveCard(moveData)
        this.toggle()
        this.props.onClose()
        console.log("move dataa", moveData)
    }
    handleDueDatesub=()=>{
        let ddData={}
        if(this.state.rem===0){
            ddData={
                idcards:this.props.idcards,
                date:this.state.date,
                time:this.state.time,
                reminder:1
            }
        }
        else{
            ddData={
                idcards:this.props.idcards,
                date:this.state.date,
                time:this.state.time,
                reminder:this.state.rem
            }
        }
        this.props.action.cardAction.AddDueDate(ddData)
        this.toggled()
    }

    render() {
        const userName = localStorage.getItem("userName");
        let singleCard = []
        if (this.props.cardData.length > 0) {
            singleCard = this.props.cardData.filter((cards) => {

                return cards.idcards === this.props.idcards
            })
        }
        let singlelist = []
        if (singleCard.length > 0) {
            if (this.props.listData.length > 0) {
                singlelist = this.props.listData.filter((lists) => {
                    return lists.idlist === singleCard[0].idlists
                })
            }
        }
        let cComments = []
        cComments = this.props.cardComment.map((cardComment, key) => {
            return (
                <div key={key}><div className="cmCommTitle">{userName}</div>
                    {cardComment.cComment ? <div className="cmSubcomm">{cardComment.cComment}</div> : ""}
                    <div className="cmSubdel" onClick={() => this.handleDelComm(cardComment.idcomm)}><div>delete</div></div>
                </div>
            )
        })
        let allPBoards = [];
        if (this.props.boardData.length > 0) {
            allPBoards = this.props.boardData.filter((boards) => {
                return boards.idteams === 0
            })
        }
        let allPBoardsnames = [];
        if (allPBoards.length > 0) {
            allPBoardsnames = allPBoards.map((allPBoards, key) => {
                return (

                    <option key={key} value={allPBoards.idboards}>{allPBoards.bTitle}</option>
                )
            })
        }

        let alltBoards = [];
        if (this.props.allBoardsData.length > 0) {
            alltBoards = this.props.allBoardsData.filter((allboards) => {
                return allboards.idteams !== 0
            })
        }
        let boardTeamWise = []
        if (this.props.teamData.length > 0) {
            boardTeamWise = this.props.teamData.map((team, key) => {
                return (<optgroup key={key} label={team.tName}>
                    {
                        alltBoards.map((alltBoards, key) => {
                            if (team.idteams === alltBoards.idteams) {
                                return (<option key={key} value={alltBoards.idboards} >{alltBoards.bTitle}</option>)
                            }
                        })
                    }
                </optgroup>)
            })
        }
        let boardlist = []
        if (this.props.allListData.length > 0) {
            boardlist = this.props.allListData.map((allList, key) => {
                return (
                    <option key={key} value={allList.idlist}>{allList.lName}</option>
                )
            })
        } else {
            boardlist = <option >No Lists</option>
        }

        return (
            <div>

                <Modal open={this.props.open} onClose={this.props.onClose} idcards={this.props.idcards} center>
                    <div className="cmMainDiv" >
                        <div className="cmSubDiv1">
                            <div className="cmTitle" ><img alt="" height="30px" width="30px" src={copy} style={{ marginRight: "5px" }} />{(singleCard.length > 0)
                                ? singleCard[0].cTitle
                                : (this.props.archived[0] ? this.props.archived[0].cTitle : "")}</div>
                            <div className="cmsubFont">in list <a href="xx" className="cmSubTitle" style={{ textDecoration: "underline" }}>
                                {(singlelist.length > 0) ?
                                    singlelist[0].lName
                                    : (this.props.archived[0] ? this.props.archived[0].lName : "")}</a></div>

                                    <div>DD</div>
                            <div>
                                <div className="cmTitle"><img alt="" height="30px" width="30px" src={description} style={{ marginRight: "5px" }} />Description</div>
                                {this.state.show ?
                                    (!this.props.cardDetails.length > 0 ?
                                        <form >
                                            <textarea style={{ borderColor: "lightgrey", minWidth: "500px", minHeight: "60px", marginLeft: "35px" }}
                                                value={this.props.editText}
                                                onChange={(e) => this.handleOnChange("cDesc", e)}
                                            />
                                            <br></br>
                                            <button
                                                onClick={(e) => this.handleDescSubmit(this.props.idcards, e)}
                                                style={{ marginBottom: "1%", backgroundColor: "#5aac44", boxShadow: "0 1px 0 0 #3f6f21", border: "none", color: "#fff", fontWeight: "bold", marginLeft: "35px", borderRadius: "6%", padding: "0.5% 1.5%", marginTop: "5px" }}>{" "}Save{" "} </button>
                                            <img alt="" height="23px" width="23px" src={close} style={{ marginLeft: "3px" }} onClick={this.handleCancel.bind(this)} /></form>
                                        :
                                        (<form >
                                            <textarea style={{ borderColor: "lightgrey", minWidth: "500px", minHeight: "60px", marginLeft: "35px" }}
                                                defaultValue={this.props.cardDetails[0].cDesc}
                                                onChange={(e) => this.handleOnChange("cDesc", e)}
                                            />
                                            <br></br>
                                            <button

                                                onClick={(e) => this.handleDescEdit(this.props.idcards, e)}
                                                style={{ marginBottom: "1%", backgroundColor: "#5aac44", boxShadow: "0 1px 0 0 #3f6f21", border: "none", color: "#fff", fontWeight: "bold", marginLeft: "35px", borderRadius: "6%", padding: "0.5% 1.5%", marginTop: "5px" }}>{" "}Save{" "} </button>
                                            <img alt="" height="23px" width="23px" src={close} style={{ marginLeft: "3px" }} onClick={this.handleCancel.bind(this)} /></form>)
                                    )

                                    :
                                    (this.props.cardDetails.length > 0 ?
                                        <label type="text" onClick={this.handleEdit()}><div className="cmAddDesc"> {this.props.cardDetails[0].cDesc}</div></label>
                                        :
                                        <label type="text" onClick={this.handleEdit()}><div className="cmAddDesc">Add a more detailed description…</div></label>)
                                }
                            </div>
                            <div>
                                <div className="cmTitle" ><img alt="" height="30px" width="30px" src={comments} style={{ marginRight: "5px" }} />Add Comment</div>
                                <form onSubmit={this.handleCommSubmit} ref="form">
                                    <div className="commDiv">
                                        <textarea type="text" placeholder="Write a comment…"
                                            onChange={(e) => this.handleOnChange("comment", e)}
                                            style={{ borderColor: "lightgrey", minWidth: "500px", minHeight: "60px", marginLeft: "35px" }} />
                                    </div>
                                    <button
                                        disabled={!this.state.comment}
                                        onClick={(e) => this.handleCommSubmit(this.props.idcards, e)}
                                        style={{ marginBottom: "1%", backgroundColor: "#5aac44", boxShadow: "0 1px 0 0 #3f6f21", border: "none", color: "#fff", fontWeight: "bold", marginLeft: "35px", borderRadius: "6%", padding: "0.5% 1.5%" }}>{" "}Save{" "} </button>
                                    <img
                                        disabled={!this.state.comment} alt="" height="23px" width="23px" src={close} style={{ marginLeft: "3px" }} onClick={this.handleCancelc.bind(this)} />
                                </form>
                            </div>
                            <div className="commentMain">
                                <div className="cmTitle" ><img alt="" height="30px" width="30px" src={activity} style={{ marginRight: "5px" }} />Activity</div>
                            </div>
                            <div >{cComments}</div>
                        </div>
                        <div className="cmSubDiv2">
                            <div className="cmbTitle">Add To Card</div>
                            <div className="cmbtn"><div><img alt="" height="20px" width="20px" src={member} style={{ marginRight: "3px" }} />Members</div></div>

                            <div>
                                <Dropdown isOpen={this.state.ddropdownOpen} toggle={this.toggled} >
                                    <DropdownToggle nav style={{ alignSelf: "center", fontWeight: "bold", color: "black", borderRadius: "1%", height: "32px", width: "150px", background: "#ebeef0", padding: "2%", margin: "1%", marginTop: "6%", border: "None" }}>
                                        <span onClick={this.toggled}>
                                            <div ><img alt="" height="20px" width="20px" src={duedate} style={{ marginRight: "3px" }} />Due Date</div>
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu style={{ width: "300px" }} >
                                        <DropdownItem style={{ textAlign: "center" }} header>Due Date</DropdownItem>
                                        <DropdownItem divider />
                                        <Form >
                                            <div >
                                                <div >
                                                    <div className="row">
                                                        <div className="column">
                                                            <FormGroup>
                                                                <div className="datelabel"><Label >Date</Label></div>
                                                                <input style={{ padding: "3%", marginLeft: "5%", width: "90%" }}
                                                                    value={this.state.date}
                                                                    onChange={(e) => this.handleOnChange("date", e)}
                                                                ></input>
                                                            </FormGroup>

                                                        </div>
                                                        <div className="column">
                                                            <FormGroup>
                                                                <div className="timelabel"><Label >Time</Label></div>
                                                                <TimeField value={this.state.time} style={{ padding: "3%", marginLeft: "5%", width: "90%" }} onChange={this.onTimeChange} />
                                                            </FormGroup>
                                                        </div>

                                                    </div>
                                                </div>                                                
                                                    <div className="calender">
                                                        <Calendar
                                                            onChange={(e) => this.handleOnChangeDate("date", e)}
                                                        />
                                                    </div>
                                                <FormGroup>
                                                    <div className="rem"><Label >Set Reminder</Label></div>
                                                    <Input style={{ margin: "2%", marginLeft: "4%", width: "92%" }} defaultValue="1" type="select" disabled={this.props.allListData.length === 0} name="idlist" id="idlist" onChange={(e) => this.handleOnChange("rem", e)} >
                                                        <option value="1">None</option>
                                                        <option value="2">At a Time of Due Date</option>
                                                        <option value="3">5 Minutes Before</option>
                                                        <option value="4">10 Minutes Before</option>
                                                        <option value="5">15 Minutes Before</option>
                                                        <option value="6">1 Hour Before</option>
                                                        <option value="7">2 Hours Before</option>
                                                        <option value="8">1 day Before</option>
                                                        <option value="9">2 days Before</option>
                                                    </Input>
                                                    <div className="reText">Reminders will be sent to all members and watchers of this card.</div>
                                                    <div style={{ paddingLeft: "5%",marginTop:"1%" }} >
                                                    <Button onClick={this.handleDueDatesub.bind(this)} color="success" style={{padding:"1% 4%",maxHeight:"30px",fontSize:"15px",fontWeight:"bold",alignContent:"center"}}>Save</Button>
                                                    <Button color="danger" style={{float:"right",padding:"1% 4%",maxHeight:"30px",fontSize:"15px",fontWeight:"bold",alignContent:"center",marginRight:"3%"}}>Remove</Button>

                                                    </div>
                                                </FormGroup>
                                            </div>
                                        </Form>

                                    </DropdownMenu>
                                </Dropdown >
                            </div>
                            <div className="cmbTitle">Action</div>
                            <div>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                                    <DropdownToggle nav style={{ alignSelf: "center", fontWeight: "bold", color: "black", borderRadius: "1%", height: "32px", width: "150px", background: "#ebeef0", padding: "2%", margin: "1%", marginTop: "6%", border: "None" }}>
                                        <span onClick={this.toggle}>
                                            <div ><img alt="" height="20px" width="20px" src={move} style={{ marginRight: "3px" }} />Move</div>
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu style={{ width: "300px" }} >
                                        <DropdownItem style={{ textAlign: "center" }} header>Move Card</DropdownItem>
                                        <DropdownItem divider />
                                        <Form style={{ width: "300PX", padding: "5%" }} >
                                            <FormGroup >
                                                {allPBoards.length > 0 ?
                                                    <Input type="select" name="idboards" id="idboards" onChange={(e) => this.handleOnChangemove("idboards", e)} >
                                                        <optgroup label="Personal boards"  >{allPBoardsnames}</optgroup>
                                                        {boardTeamWise}
                                                    </Input> : ""}

                                            </FormGroup>
                                            <FormGroup   >
                                                <Input type="select" disabled={this.props.allListData.length === 0} name="idlist" id="idlist" onChange={(e) => this.handleOnChange("idlist", e)} >
                                                    {boardlist}
                                                </Input>
                                            </FormGroup>
                                            <div>
                                            </div>
                                        </Form>

                                        <div style={{ paddingLeft: "5%" }} >
                                            <Button color="primary" disabled={this.props.allListData.length === 0} onClick={this.hanndleMove.bind(this)}>Move</Button>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown >
                            </div>
                            <div className="cmbtn"><div><img alt="" height="20px" width="20px" src={copy} style={{ marginRight: "3px" }} />Copy</div></div>
                            <div className="cmbtn"><div><img alt="" height="20px" width="20px" src={watch} style={{ marginRight: "3px" }} />Watch</div></div>
                            {!this.state.showDel
                                ? <div className="cmbtn" onClick={this.handleArchiveClick.bind(this, this.props.idcards)}><div><img alt="" height="20px" width="20px" src={archive} style={{ marginRight: "3px" }} />Archive</div></div>
                                : (<div><div className="cmbtn" onClick={this.handleSTBClick.bind(this, this.props.idcards)}><div><img alt="" height="20px" width="20px" src={refresh} style={{ marginRight: "3px" }} />Send to board</div></div>
                                    <div className="cmbtn1" onClick={this.handleDeleteClick.bind(this, this.props.idcards)}><div><img alt="" height="20px" width="20px" src={remove} style={{ marginRight: "3px" }} />Delete</div></div></div>)
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boardData: state.BoardReducer.boards,
        teamData: state.TeamReducer.teams,
        listData: state.ListsReducer.lists,
        teamBoardData: state.TeamBoardsReducer.teamboards,
        cardData: state.CardsReducer.cards,
        cardComment: state.CardsReducer.cardComment,
        cardDetails: state.CardsReducer.cardDetails,
        archived: state.CardsReducer.archived,
        allBoardsData: state.BoardReducer.allBoards,
        allListData: state.ListsReducer.allList
    }
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        boardAction: bindActionCreators(boardAction, dispatch),
        teamAction: bindActionCreators(teamAction, dispatch),
        listAction: bindActionCreators(listAction, dispatch),
        teamboardAction: bindActionCreators(teamboardAction, dispatch),
        cardAction: bindActionCreators(cardAction, dispatch)
    }
    // return bindActionCreators({boardAction,teamAction,listAction,teamboardAction,cardAction},dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Cards); 