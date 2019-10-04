import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = e => {
        this.setState({ name: e.target.value });
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    }

    onSubmit = async e => {
        e.preventDefault();
        try {
            let response = await fetch('https://lit-peak-43904.herokuapp.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            });

            if (response.ok) {
                let user = await response.json();
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                const msg = await response.json();
                this.props.toggleAlert(msg);
            }
        } catch (err) {
            this.props.toggleAlert('Server not available');
            console.log(err);
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='register-section mt4'>
                <main className='lightest-blue'>
                    <form className='measure center shadow-2 pa4 ba br3'
                        onSubmit={this.onSubmit}>
                        <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                            <legend className='f3 fw6 ph0 mh0 tc ttu'>Register</legend>
                            <div className='mt3'>
                                <label className='db fw6 lh-copy f6'>Name</label>
                                <input
                                    className='pa2 input-reset lightest-blue ba b--lightest-blue bg-transparent hover-bg-lightest-blue hover-black w-100' type='text'
                                    name='username'
                                    id='username'
                                    onChange={this.onNameChange} required
                                />
                            </div>
                            <div className='mt3'>
                                <label className='db fw6 lh-copy f6'>Email</label>
                                <input
                                    className='pa2 input-reset lightest-blue ba b--lightest-blue bg-transparent hover-bg-lightest-blue hover-black w-100' type='email'
                                    name='email-address'
                                    id='email-address'
                                    onChange={this.onEmailChange} required
                                />
                            </div>
                            <div className='mv3'>
                                <label className='db fw6 lh-copy f6'>Password</label>
                                <input
                                    className='b pa2 input-reset lightest-blue ba b--lightest-blue bg-transparent hover-bg-lightest-blue hover-black w-100'
                                    type='password'
                                    name='password'
                                    id='password'
                                    onChange={this.onPasswordChange} required
                                />
                            </div>
                        </fieldset>
                        <div className='tc'>
                            <input
                                className='b lightest-blue ph3 pv2 input-reset ba b--lightest-blue bg-transparent grow pointer f6 dib'
                                type='submit'
                                value='Register'
                            />
                        </div>
                        <div className='lh-copy mt3 tc'>
                            <a
                                href='#0'
                                className='f6 link dim black dib lightest-blue'
                                onClick={() => onRouteChange('signIn')}
                            >Sign In</a>
                        </div>
                    </form>
                </main>
            </div>
        );
    }
};

export default Register;