import React from 'react';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageInput from '../components/ImageInput/ImageInput';
import FaceDetection from '../components/FaceDetection/FaceDetection';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import AlertPopup from '../components/AlertPopup/AlertPopup';
import Loader from '../components/Loader/Loader';

const params = {
	'particles': {
		'number': {
			'value': 50
		},
		'size': {
			'value': 5
		},
	}
};

const initState = {
	input: '',
	imageUrl: '',
	boxes: [],
	route: 'signIn',
	loggedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: '',
		joined: ''
	},
	popup: {
		show: false,
		msg: ''
	},
	loader: false
};

class App extends React.Component {
	constructor() {
		super();
		this.state = initState;
	}

	toggleAlertMsg = msg => {
		this.setState({
			popup: {
				show: !this.state.popup.show,
				msg
			}
		});
	}

	toggleAlert = msg => {
		this.toggleAlertMsg(msg);
		setTimeout(() => { this.toggleAlertMsg(msg) }, 2000);
	}

	onImageInputChange = e => {
		this.setState({ input: e.target.value });
	}

	displayFace = boxes => {
		this.setState({ boxes, loader: false });
	}

	calculateFaceDetection = values => {
		const img = document.querySelector('.faceDetection img');
		const imgHeight = Number(img.height);
		const imgWidth = Number(img.width);

		const boxes = values.map((value, i) => {
			return {
				id: i,
				top: value.top_row * imgHeight,
				right: (imgWidth) - (value.right_col * imgWidth),
				bottom: imgHeight - (value.bottom_row * imgHeight),
				left: (value.left_col * imgWidth)
			}
		})
		this.displayFace(boxes);
	}

	updateEntryCount = async () => {
		try {
			let response = await fetch('https://lit-peak-43904.herokuapp.com/entries', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 'id': this.state.user.id })
			});

			if (response.ok) {
				const id = await response.json();
				let user = { ...this.state.user };
				user.entries = Number(id);
				this.setState({ user });
			} else {
				const msg = await response.json();
				this.toggleAlert(msg);
			}
		} catch (err) {
			this.toggleAlert('Entry count not updated as server is unavailable');
			console.log(err);
		}
	}

	onImageSubmit = async () => {
		const input = this.state.input;
		this.setState({ imageUrl: input });
		if (input !== '') {
			this.setState({ loader: true });
			try {
				let response = await fetch('https://lit-peak-43904.herokuapp.com/image', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ image: input })
				});

				if (response.ok) {
					let data = await response.json();
					const regions = data.outputs[0].data.regions;
					const boundaries = regions.map(region => region.region_info.bounding_box);
					this.calculateFaceDetection(boundaries);
					this.updateEntryCount();
				} else {
					this.setState({ loader: false });
					const msg = await response.json();
					this.toggleAlert(msg);
				}
			} catch (err) {
				this.setState({ loader: false });
				this.toggleAlert('Server not available');
				console.log(err);
			}
		} else {
			this.toggleAlert('Image URL is empty');
		}
	}

	onRouteChange = route => {
		const loggedIn = route === 'home' ? true : false;
		if (!loggedIn) {
			this.setState(Object.assign({}, initState, { route }));
		} else {
			this.setState({ route, loggedIn });
		}
	}

	loadUser = user => {
		this.setState({
			user: {
				id: Number(user.id),
				name: user.name,
				email: user.email,
				entries: user.entries,
				joined: user.joined
			}
		});
	}

	render() {
		const { imageUrl, boxes, route, loggedIn, user, popup, loader } = this.state;

		return (
			<div className='pa3 pa4-ns'>
				<Particles params={params} className='particles' />
				<Navigation onRouteChange={this.onRouteChange} loggedIn={loggedIn} />
				{
					route === 'home' ?
						<div>
							<Logo />
							<Rank user={user} />
							<ImageInput
								onImageInputChange={this.onImageInputChange}
								onImageSubmit={this.onImageSubmit}
							/>
							<FaceDetection
								imageUrl={imageUrl}
								boxes={boxes}
							/>
						</div> :
						(
							route === 'signIn' ?
								<SignIn
									onRouteChange={this.onRouteChange}
									loadUser={this.loadUser}
									toggleAlert={this.toggleAlert}
								/> :
								<Register
									onRouteChange={this.onRouteChange}
									loadUser={this.loadUser}
									toggleAlert={this.toggleAlert}
								/>
						)
				}
				<AlertPopup show={popup.show} msg={popup.msg} />
				<Loader loader={loader} />
			</div>
		);
	}
}

export default App;
