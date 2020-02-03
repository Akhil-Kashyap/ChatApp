import React, { Component } from 'react';
import '../App.css';

class NewRoomForm extends Component {
	constructor() {
		super();
		this.state = {
			roomName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ roomName: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		//console.log(this.state.roomName);
		this.props.createRoom(this.state.roomName);
		this.setState({ roomName: '' });
	}
	render() {
		return (
			<div className="new-room-form">
				<form onSubmit={this.handleSubmit}>
					<input value={this.state.roomName} onChange={this.handleChange} type="text" placeholder="Create a room" required />
					{/* <button id="create-room-btn" type="submit" /> */}
				</form>
			</div>
		);
	}
}

export default NewRoomForm;
