import React, { Component } from 'react';
import "./Recipe.css";
import PopUp from "./PopUp/PopUp";

class Recipe extends Component{
    // this is where you map
    // check it is not empty
    // for each of the results in this.props.result
        // grab the stuff to display
    constructor(){
        super();
        this.state={
            popUp:"hidden"
        }
        this._onClick = this._onClick.bind(this);
        this._resetVisible = this._resetVisible.bind(this);
    }
    _onClick(event){ 
        if(this.state.popUp === "hidden"){
            this.setState({
                popUp:"visible"
            })
        }
    }
    _resetVisible(){
        const hidden = "hidden";
        this.setState({
            popUp:hidden
        });
    }
    render(){
        // console.log(this.props.data);
        // const list = this.props.data
        // loop though all of the objects in data
        // for each object, grab the stuff you want to show
        return(
            <div className="recipe" onClick={this._onClick}>
                <div className="image-container">
                    <img src={this.props.image} alt="img"/>
                </div>
                <div className="words">
                    <h4>{this.props.title}</h4>
                    <div className="written">
                        <p className="stats"> 
                            Servings: {this.props.servings} &nbsp;
                            Prep Time: {this.props.prepTime}&nbsp;
                            Calories: {this.props.calories}&nbsp;
                        </p>
                        <p className="label"> Diet Label: {this.props.dietLabel}</p>
                    </div>
                </div>
                <div className={this.state.popUp} id="popUp">
                    <PopUp
                    visible={this.state.popUp}
                    resetVisible = {this._resetVisible}
                    title={this.props.title}
                    image={this.props.image}
                    url={this.props.url}
                    description={this.props.description}
                    servings={this.props.servings}
                    prepTime={this.props.prepTime}
                    dietLabel={this.props.dietLabel}
                    calories={this.props.calories}
                    recipeCategory={this.props.recipeCategory}
                    cookingMethod={this.props.cookingMethod}
                    rating={this.props.rating}
                    ingredients={this.props.ingredients}/>
                </div>
            </div>
        )
    }
    
}
export default Recipe;