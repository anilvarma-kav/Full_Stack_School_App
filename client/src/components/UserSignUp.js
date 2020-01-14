import React from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';
export default class UserSignUp extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress:'',
        password: '',
        errors: [],
    }
    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
        } = this.state;
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="fname"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={this.change}
                                    placeholder="First Name" />
                                <input
                                    id="lname"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={this.change}
                                    placeholder="Last Name" />
                                <input
                                    id="email"
                                    name="emailAddress"
                                    type="text"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="email" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                            </React.Fragment>
                        )} />
                    <p>
                        Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                    </p>
                </div>
            </div>
        );
    }
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const {context} = this.props;

        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state;
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };
        context.data.createUser(user)
            .then(errors => {
                if(errors.length){
                    this.setState({errors});
                }
                else{
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push('/authenticated');
                        })
                    console.log(`${emailAddress} is successfully signed up and authenticated!`);
                }
            })
            .catch( err => { // handle rejected promises
                console.log(err);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }
}
