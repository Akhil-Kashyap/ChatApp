import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

class MessageList extends Component {
	componentWillUpdate() {
		const node = ReactDOM.findDOMNode(this);
		this.shouldscrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
	}

	componentDidUpdate() {
		if (this.shouldscrollToBottom) {
			console.log('scrolled');
			const node = ReactDOM.findDOMNode(this);
			node.scrollTop = node.scrollHeight;
		}
	}

	render() {
		console.log(this.props.roomId);
		if (this.props.roomId == null) {
			return (
				<div className="message-list">
					<div className="join-room">&larr; Join a room!</div>
				</div>
			);
		}
		return (
			<div className="message-list">
				{this.props.messages.map((message, index) => {
					return <Message key={index} username={message.senderId} text={message.parts[0].payload.content} />;
				})}
			</div>
		);
	}
}

export default MessageList;
