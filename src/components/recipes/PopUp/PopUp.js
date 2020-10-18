import React, { Component } from 'react';
import "./PopUp.css";

class PopUp extends Component{
    // this is where you map
    // check it is not empty
    // for each of the results in this.props.result
        // grab the stuff to display
    
    render(){
        const rating = this.props.rating;
        return(
            <div className={this.props.visible} id="PopUp">
                <button className="exit" type="button" onClick={this.props.resetVisible}>
                    X
                </button>
                <div className="image-container">
                    <img src={this.props.image} alt="img"/>
                </div>
                <div className="words">
                    <h3>{this.props.title}</h3>
                    <div className="rating">
                        {(rating < 2) ? "★☆☆☆☆" : (rating < 3) ? "★★☆☆☆" : (rating < 4) ? "★★★☆☆" : 
                        (rating < 5) ? "★★★★☆" : "★★★★★"} &nbsp; {this.props.rating}
                    </div>
                    <div className="written">
                        <div className="description">
                            {this.props.description}
                        </div>
                        <p className="stats"> 
                            Servings: {this.props.servings} &nbsp;
                            Prep Time: {this.props.prepTime}&nbsp;
                            Calories: {this.props.calories}&nbsp;
                        </p>
                        <p className="label"> Diet Label: {this.props.dietLabel}</p>
                        <p className="category"> Recipe Category: {this.props.recipeCategory}</p>
                        <a href={this.props.url}>Click Here for the full recipe!</a>
                    </div>
                </div>
            </div>
        )
    }
    
}
export default PopUp;