import React, {Component} from 'react'
import User from '../../api/user'
class info extends Component {
    state = {  }
    componentDidMount(){
        let InfoPromise = User.info({userid:'201610804025'});
        InfoPromise.then((data)=>{
            console.log(data);
        },(error)=>{
            console.log(error);
        })
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default info;