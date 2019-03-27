import React,{Component} from "react";

import Home from '../pages/home/home'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

componentDidMount(){
    console.log(this.props.children)
}
    render() {
        return (
            <div className="container" style={{"height":'600px',"width":'600px',"backgroundColor":'#abcdef'}}>
                <div><Home></Home></div>
                back home     !!!!!!
                <div className="content">{this.props.children}</div>
            </div>
        );
    }
}

export default index;