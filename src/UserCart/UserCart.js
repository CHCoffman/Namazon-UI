import React from 'react';
import axios from 'axios';
import ScrollArea from "react-scrollbar";

class UserCart extends React.Component{
    constructor(){
        super();
        this.state = {
            cartItems: ''
        }
        this.populateCart = this.populateCart.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    async populateCart(event){
        try{
            const headers = {
                'Authorization': `Bearer: ${this.props.accessToken}`
            }
            const response = (await axios.get(`http://localhost:8080/user/${this.props.user._id}/cart`, {headers})).data;
            const cartListItems = [];
            response[0].cart.forEach(cartItem => {
                cartListItems.push(<li>{cartItem.quantity}: {cartItem.item.storeItemName}<button onClick={this.removeItem}>Remove Item</button></li>)
            })
            this.setState({cartItems:cartListItems});
        }
        catch(e){
            console.log(e);
        }
        event.preventDefault();
    }
    async removeItem(event){
        try{
            const headers = {
                'Authorization': `Bearer: ${this.props.accessToken}`
            }
            const response = (await axios.delete(`http://localhost:8080/user/${this.props.user._id}/cart`, {headers})).data;
            const cartListItems = [];
            response[0].cart.forEach(cartItem => {
                cartListItems.pop()
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
                <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    horizontal={false}
                >
                    {this.state.cartItems}
                </ScrollArea>

            {/*</div>*/}
            {/*/!*click to remove item, click show cart to show updated cart*!/*/}
            {/*<button onClick={this.removeItem}>Remove Item</button>*/}
            {/*<div>*/}
            {/*    {this.state.cartItems}*/}
            </div>
        </div>
    )
    }
}
export default UserCart;


