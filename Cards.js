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


class Cards extends Component {
    constructor(props) {
        super();
        this.ESCAPE_KEY = 27;
        this.ENTER_KEY = 13;
        this.state = {
            editText: "reena",
            editing: false,
            show:false,
            comment:"",
            idcards:0
        };
    }
   componentWillUpdate(){

   }
    handleEdit(e) {
        return (e) => this.setState({
            editing: !this.state.editing,
            show:!this.state.show
        });
    }

    handleChange(e) {
        this.setState({ editText: e.target.value });
    }

    handleOnChange=(key,e)=>{
        this.setState({
            [key]:e.target.value
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
    handleCommSubmit=(id,e)=>{
    e.preventDefault();
        this.setState({
            show:!this.state.show
        })
        const carddetails={
            idcards:id,
            cComment:this.state.comment            
        }
        this.props.action.cardAction.AddComment(carddetails)
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
    render() {
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
        return (
            <Modal open={this.props.open} onClose={this.props.onClose} idcards={this.props.idcards} center>
                <div className="cmMainDiv" >
                    <div className="cmSubDiv1">
                        <div className="cmTitle" ><img alt="" height="30px" width="30px" src={copy} style={{ marginRight: "5px" }} />{(singleCard.length > 0) ? singleCard[0].cTitle : ""}</div>
                        <div className="cmsubFont">in list <a href="xx" className="cmSubTitle" style={{ textDecoration: "underline" }}>
                            {(singlelist.length > 0) ? singlelist[0].lName : "undefine"}</a></div>
                        <div>
                            <div className="cmTitle"><img alt="" height="30px" width="30px" src={description} style={{ marginRight: "5px" }} />Description</div>
                            {!this.state.show? <label type="text" className={this.state.editing ? 'hidden' : ''} onClick={this.handleEdit()}><div className="cmAddDesc"> {this.state.editText}</div></label>
                            :
                            <form>
                            <textarea style={{ borderColor: "lightgrey", minWidth: "500px", minHeight: "60px", marginLeft: "35px" }} 
                                className={this.state.editing ? '' : 'hidden'}
                                value={this.state.editText}
                                onChange={this.handleChange.bind(this)}
                                onBlur={this.handleSubmit.bind(this)}
                                onKeyDown={this.handleKeyDown.bind(this)}
                            />
                            <br></br>
                            <button style={{ marginBottom: "1%", backgroundColor: "#5aac44", boxShadow: "0 1px 0 0 #3f6f21", border: "none", color: "#fff", fontWeight: "bold", marginLeft: "35px", borderRadius: "6%", padding: "0.5% 1.5%",marginTop:"5px" }}>{" "}Save{" "} </button>
                            <img alt="" height="23px" width="23px" src={close} style={{ marginLeft: "3px" }}/>
                            </form>}
                        </div>
                        <div>
                            <div className="cmTitle" ><img alt="" height="30px" width="30px" src={comments} style={{ marginRight: "5px" }} />Add Comment</div>
                            <form>
                                <div className="commDiv">
                                <textarea type="text" placeholder="Write a comment…" 
                                onChange={(e)=>this.handleOnChange("comment",e)}
                                style={{ borderColor: "lightgrey", minWidth: "500px", minHeight: "60px", marginLeft: "35px" }} />
                                </div>
                                <button 
                                onClick={(e)=>this.handleCommSubmit(this.props.idcards,e)}
                                style={{ marginBottom: "1%", backgroundColor: "#5aac44", boxShadow: "0 1px 0 0 #3f6f21", border: "none", color: "#fff", fontWeight: "bold", marginLeft: "35px", borderRadius: "6%", padding: "0.5% 1.5%" }}>{" "}Save{" "} </button>
                            </form>
                        </div>
                        <div>
                            <div className="cmTitle" ><img alt="" height="30px" width="30px" src={activity} style={{ marginRight: "5px" }} />Activity</div>
                        </div>
                    </div>
                    <div className="cmSubDiv2">
                        <div className="cmbTitle">Add To Card</div>
                        <div className="cmbtn"><div><img alt="" height="20px" width="20px" src={member} style={{ marginRight: "3px" }} />Members</div></div>
                        <div className="cmbtn"><div><img alt="" height="20px" width="20px" src={duedate} style={{ marginRight: "3px" }} />Due Date</div></div>
                        <div className="cmbTitle">Action</div>
                        <div className="cmbtn"><div><img alt="" height="20px" width="20px" src={move} style={{ marginRight: "3px" }} />Move</div></div>
                        <div className="cmbtn"><div><img alt=""  height="20px" width="20px" src={copy} style={{ marginRight: "3px" }} />Copy</div></div>
                        <div className="cmbtn"><div><img alt=""  height="20px" width="20px" src={watch} style={{ marginRight: "3px" }} />Watch</div></div>
                        <div className="cmbtn"><div><img alt=""  height="20px" width="20px" src={archive} style={{ marginRight: "3px" }} />Archive</div></div>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boardData: state.BoardReducer.boards,
        teamData: state.TeamReducer.teams,
        listData: state.ListsReducer.lists,
        teamBoardData: state.TeamBoardsReducer.teamboards,
        cardData: state.CardsReducer.cards

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
})
export default connect(mapStateToProps, mapDispatchToProps)(Cards); 