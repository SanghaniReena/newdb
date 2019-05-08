import "./Cards.css"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";
import { bindActionCreators } from "redux";
import * as boardAction from "../action/BoardsAction"
import * as cardAction from "../action/CardsAction"
import * as listAction from "../action/ListsAction"
import * as teamboardAction from "../action/TeamBoardsAction";
import * as teamAction from "../action/TeamsAction"
import BoardDash from "./BoardDash";
import { DropdownItem, DropdownMenu, DropdownToggle, Input,Dropdown, Button, FormGroup, Label, Form, UncontrolledDropdown } from 'reactstrap';
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
            editing: false,
            show: false,
            comment: "",
            cDesc: "",
            idcards: 0,
            showStb: false,
            showDel: false
        };
        this.toggle = this.toggle.bind(this);

    }
    // componentWillMount() {
    //     
    //     const idcards = localStorage.getItem("cardid")
    //     if(idcards){
    //         this.props.action.cardAction.FetchCardComments(idcards)
    //         this.props.action.cardAction.FetchCardDetails(idcards)
    //     }

    // }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
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
        //this.props.action.cardAction.deleteComm(idcomm)
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
                            <div className="cmbtn"><div><img alt="" height="20px" width="20px" src={duedate} style={{ marginRight: "3px" }} />Due Date</div></div>
                            <div className="cmbTitle">Action</div>
                           <div>
                            <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                           
                            
                                <span
                                onClick={this.toggle}
                               
                                >
                                <div ><img alt="" height="20px" width="20px" src={move} style={{ marginRight: "3px" }} />Move</div>
                                </span>
                                <DropdownMenu style={{ width: "max-content" }}>
                                    <DropdownItem style={{ textAlign: "center" }} header>Add to a team</DropdownItem>
                                    <DropdownItem divider />
                                    <Form style={{ width: "max-content", padding: "5%" }} >
                                        <FormGroup>
                                            <Label for="teamselect">This board is a part of..</Label>
                                            <Input type="select" name="idteams" id="idteams" onChange={(e) => this.handleOnChange("idteams", e)} >
                                                <option value="0">Personal boards (No team)</option>

                                            </Input>
                                        </FormGroup>
                                    </Form>
                                    <div style={{ paddingLeft: "5%" }} >
                                        <Button color="primary"  >Add</Button>
                                        <a style={{ marginLeft: "35%", float: "center", textAlign: "center" }} href="/boards">Create Team</a></div>
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
        archived: state.CardsReducer.archived

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