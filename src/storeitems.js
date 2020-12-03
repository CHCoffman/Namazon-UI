import React from 'react';
import axios from 'axios';
import ScrollArea from 'react-scrollbar';


class Storeitems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            storeitemslist:[]
        }
        this.state = {
            viewedItems:[]
        }
    }

    async componentDidMount(){
        await this.storeitemslist();
    }

    async storeitemslist(){
        try{
            const storeitems = (await axios.get('http://localhost:8080/StoreItem')).data;
            const storeItemsL = storeitems.map((storeitem, index)=>
                <li key={index}>{<button>'View Item'</button>}{storeitem.storeItemName}{<button>Purchase Item</button>}</li>
            );
            this.setState({storeitemslist:(<ul>{storeItemsL}</ul>)});
            this.viewedItems.push(storeitems.storeItemName);
        }catch(err){
            console.log(err);
        }
    }

    render(){
        return(
            <div className={"Storeitems"}>
                <span>Items available for purchase:</span>
                <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    horizontal={false}
                >
                    {this.state.storeitemslist}

                </ScrollArea>
                <span>Viewed Items{this.state.viewedItems}</span>
            </div>
        );
    }
}

export default Storeitems;