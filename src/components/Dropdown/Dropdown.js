import React, { Component } from 'react';
import "./Dropdown.css";
import Checkbox from "./Checkbox/Checkbox";

class Dropdown extends Component{
    constructor(){
        super();
        this.state={
            class:"hidden",
            checkedList:[]
        }
        this._onClick = this._onClick.bind(this);
        this._checkedList = this._checkedList.bind(this);
    }
    _onClick(event){
        const visible = "visible";
        const hidden = "hidden";
        this.state.class === hidden ? this.setState({
          class: visible
        }) : this.setState({
          class: hidden
        })
      }
    _checkedList(checked, name){
        const list = this.state.checkedList;
        //console.log(name);
        if(checked){
            list.push(name);
            this.setState({
                checkedList: list  
            })
        }
        else{
            if(list.includes(name)){
                const index = list.indexOf(name);
                if(index > -1 ){list.splice(index, 1)}
                this.setState({
                    checkedList:list
                })
            }
        }
        const setName = this.props.buttonName;
        this.props.setCriteria(this.state.checkedList, setName);
    }
    render(){
        return(
            <div className="dopdown" id="subdrop">
              <button className="dropbtn" type="button" onClick={this._onClick}>
                {this.props.buttonName} &nbsp; &nbsp; ▽
              </button>
              <div className={this.state.class} id="content">
                <Checkbox name={this.props.op1} optionChecked={(checked, name) => this._checkedList(checked, name)}/>
                <Checkbox name={this.props.op2} optionChecked={(checked, name) => this._checkedList(checked, name)}/>
                <Checkbox name={this.props.op3} optionChecked={(checked, name) => this._checkedList(checked, name)}/>
                <Checkbox name={this.props.op4} optionChecked={(checked, name) => this._checkedList(checked, name)}/>
              </div>
            </div>
        )
    }
    
}
export default Dropdown;