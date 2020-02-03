import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewFormRoom from './components/NewRoomForm';
import './App.css';

import { tokenUrl, instanceLocator } from './config';

class App extends Component {
	constructor() {
		super();
		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.createRoom = this.createRoom.bind(this);
	}

	componentDidMount() {
		const chatManager = new ChatManager({
			instanceLocator,
			userId: 'Shivansh',
			tokenProvider: new TokenProvider({
				url: tokenUrl
			})
		});

		chatManager
			.connect()
			.then((currentUser) => {
				this.currentUser = currentUser;

				this.getRooms();
			})
			.catch((err) => console.log('error on conneting ', err));
	}

	getRooms() {
		this.currentUser
			.getJoinableRooms()
			.then((joinableRooms) => {
				this.setState({
					joinableRooms,
					joinedRooms: this.currentUser.rooms
				});
			})
			.catch((err) => console.log('error on joinable rooms ', err));
	}

	subscribeToRoom(roomId) {
		this.setState({ messages: [] });
		this.currentUser
			.subscribeToRoomMultipart({
				roomId: roomId,
				hooks: {
					onMessage: (message) => {
						//console.log('message', message.parts[0].payload.content);
						this.setState({
							messages: [ ...this.state.messages, message ]
						});
					}
				}
			})
			.then((room) => {
				//console.log(room.id);
				this.setState({ roomId: room.id });
				this.getRooms();
			})
			.catch((err) => console.log('error on subscribing to room: ', err));
	}

	sendMessage(text) {
		//console.log(this.state.roomId);
		this.currentUser.sendSimpleMessage({
			roomId: this.state.roomId,
			text
		});
	}

	createRoom(name) {
		this.currentUser
			.createRoom({
				name
			})
			.then((room) => this.subscribeToRoom(room.id))
			.catch((err) => console.log('Error Creating the room: ', err));
	}

	render() {
		console.log(this.state.messages);
		return (
			<div className="app">
				<RoomList
					roomId={this.state.roomId}
					subscribeToRoom={this.subscribeToRoom}
					rooms={[ ...this.state.joinableRooms, ...this.state.joinedRooms ]}
				/>
				<MessageList roomId={this.state.roomId} messages={this.state.messages} />
				<SendMessageForm roomId={this.state.roomId} sendMessage={this.sendMessage} />
				<NewFormRoom createRoom={this.createRoom} />
			</div>
		);
	}
}

export default App;
