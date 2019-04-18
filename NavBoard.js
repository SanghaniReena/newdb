import React, { Component } from 'react'
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarToggler, UncontrolledDropdown } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as boardAction from "../action/BoardsAction"

class NavBoard extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this)
        this.toggleTModal = this.toggleTModal.bind(this)
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
    render() {
        const id = this.props.location.pathname.slice(7);
        console.log("props..", id)
        let data = "";
        if (this.props.boardData && this.props.boardData.length > 0) {
            data = this.props.boardData.filter((board) => {
                return board.idboards === parseInt(id, 10);
            })
        }
        return (
            <Navbar expand="md" style={{ backgroundColor: "#026AA7", opacity: "0.8", fontWeight: "bold" }}>
                <div className="divstyleboard" style={{ color: "white", fontWeight: "bold", fontSize: "100%", padding: "0.3%", margin: "0.1%" }}>
                    {(data) ? data[0].bTitle : null}
                </div>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav style={{ color: "white", fontWeight: "bold", background: "white", opacity: "0.5 ", borderRadius: "9%" }}>
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

                    </Nav>
                </Collapse>
            </Navbar>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        boardData: state.BoardReducer.boards
    }
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        boardAction: bindActionCreators(boardAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(NavBoard)
