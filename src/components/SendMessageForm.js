import React, { Component } from 'react';
import '../App.css';

class SendMessageForm extends Component {
	constructor() {
		super();
		this.state = {
			message: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ message: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		//console.log(this.state.message);
		this.props.sendMessage(this.state.message);
		this.setState({
			message: ''
		});
	}

	render() {
		let state = false;
		if (this.props.roomId === null) {
			state = true;
		} else {
			state = false;
		}
		return (
			<form onSubmit={this.handleSubmit} className="send-message-form">
				<input
					disabled={state}
					onChange={this.handleChange}
					value={this.state.message}
					placeholder="Type a Message"
					type="text"
				/>
			</form>
		);
	}
}

export default SendMessageForm;
