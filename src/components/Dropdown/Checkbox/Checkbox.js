import React, { Component } from 'react';
import "./Checkbox.css";

class Checkbox extends Component{
    constructor(){
        super();
        this.state={
            checked:false,
        }
        
        this._toggleValue = this._toggleValue.bind(this);
    }
    _toggleValue(event){
        const name = this.props.name;
        this.props.optionChecked(!this.state.checked, name);
        if(this.state.checked){
            this.setState({
            checked:false
            })
        }
        else{
            this.setState({
            checked:true
            })
        }
    }
    render(){
        return(
            <div>
                <input className= "checkbox" type="checkbox" name={this.props.name} value={this.state.checked} onChange={this._toggleValue}/>
                <label>{this.props.name}</label>
            </div>
        )
    }
    
}
export default Checkbox;