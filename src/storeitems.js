import React from 'react';
import axios from 'axios';
import ScrollArea from 'react-scrollbar';


class Storeitems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            storeitemslist:[]
        }
    }

    async componentDidMount(){
        await this.storeitemslist();
    }

    async storeitemslist(){
        try{
            const storeitems = (await axios.get('http://localhost:8080/StoreItem')).data;
            const storeItemsL = storeitems.map((storeitem, index)=>
                <li key={index}>{storeitem.storeItemName}</li>
            );
            this.setState({storeitemslist:(<ul>{storeItemsL}</ul>)});
        }catch(err){
            console.log(err);
        }
    }

    render(){
        return(
            <div className={"Storeitems"}>
                <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    horizontal={false}
                >
                    {this.state.storeitemslist}
                </ScrollArea>
            </div>
        );
    }
}

export default Storeitems;