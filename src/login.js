import React from 'react';
import axios from 'axios';
import './Login.css';
import UserCart from './UserCart/UserCart';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginName:'',
            loginPass:'',
            cart:[]
        }
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeLogin(event) {
        this.setState({loginName: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({loginPass: event.target.value});
    }

    async handleSubmit(event){
        try{
            const login = {
                login: this.state.loginName,
                password: this.state.loginPass
            }
            const response = (await axios.post('http://localhost:8080/user/login', login)).data;
            this.setState({accessToken: response.jwt, user: response.user})
        } catch(err){
            console.log(err)
        }
        event.preventDefault();
    }

    welcomeUser(){
        if(this.state.user){
            return(
                 <UserCart user = {this.state.user} accessToken={this.state.accessToken}/>
            )
        }
    }

    getLoginForm(){
        if(!this.state.user){
            return (
                <div>
                    <input className = "loginName" onChange={this.handleChangeLogin}></input>
                    <input type="password" className="loginPass" onChange={this.handleChangePassword}></input>
                    <button className=".loginButton" onClick={this.handleSubmit}>Log in!</button>
                </div>
            )
        }
    }

    render(){
        return(
        <div className = "Login">
            <span>Welcome to Namazon</span>
            <span><br /><br /></span>
            {this.getLoginForm()}
            {this.welcomeUser()}
            <span><br /><br /></span>
        </div>
        )
    }
}

export default Login;