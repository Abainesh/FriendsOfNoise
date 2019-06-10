import React, {Component} from 'react';

class user extends Component{
    state = {
        user: 'HuaBUJ6Lqyp1swUMEW2O'
    };
    constructor(props){
        super();
        this.state={
            userId:'',
            name:''
            
        };
    }

const API = '../../../../backend_api/routes/new_person.';

    componentDidMount(){
       fetch('../../../../backend_api/routes/new_person');
        console.log(this.props.userId)
    };


}


