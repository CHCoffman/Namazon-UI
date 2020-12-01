import React from 'react';
import axios from 'axios';

class UserCart extends React.Component{
    constructor(){
        super();
        this.state = {
            cartItems: ''
        }
        this.populateCart = this.populateCart.bind(this);
    }

    async populateCart(event){
        try{
            const headers = {
                'Authorization': `Bearer: ${this.props.accessToken}`
            }
            const response = (await axios.get(`http://localhost:8080/user/${this.props.user._id}/cart`, {headers})).data;
            const cartListItems = [];
            response[0].cart.forEach(cartItem => {
                cartListItems.push(<li>{cartItem.quantity}: {cartItem.item.storeItemName}</li>)
            })
            this.setState({cartItems:cartListItems});
        }
        catch(e){
            console.log(e);
        }
        event.preventDefault();
    }

    render(){
    return(
        <div>
            Hello {this.props.user.name.firstName}!
            <span><br /></span>
            <button onClick={this.populateCart}>Show My Cart</button>
            <div>
                {this.state.cartItems}
        </div>
        </div>
    )
    }
}
export default UserCart;


