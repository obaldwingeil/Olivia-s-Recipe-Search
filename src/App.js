import React, {Component} from 'react';
import './App.css';
import recipeJson from "./assets/data/recipe.json";
import Recipe from "./components/recipes/Recipe";
import Dropdown from "./components/Dropdown/Dropdown";

const recipes = recipeJson.recipes;
console.log(recipes);

class App extends Component{
  constructor(){
    super();
    this.state={
      results: [],
      hasResult:false,
      firstTime:true,
      AdvancedSearch:"hidden",
      servings:[],
      prep:[],
      diet:[],
      cal: []
    }
    this.inputRef = React.createRef();
    this._keyPressed = this._keyPressed.bind(this);
    this._AdvancedSearch = this._AdvancedSearch.bind(this);
    this._submitSearch = this._submitSearch.bind(this);
    this._aSearchSubmit = this._aSearchSubmit.bind(this);
    this._setCriteria = this._setCriteria.bind(this);
  }

  _fetchText(input){
    // check title, description, and ingredients
    // to see if the input is inside any of those items in the json
    // if yes
      // add the recipe title to a result list

    // set up an empty array in the states
    // add recipe to the array by changing the state
    const search = input.toLowerCase();
    const list = [];
    if(input !== ""){
      recipes.forEach(r=>{
        r.ingredients.forEach(ingredient=>{
          const item = ingredient.toLowerCase();
          if(!list.includes(r) && item.includes(search)){
            list.push(r);
          }
          else if(!list.includes(r) && (search.charAt(search.length-1) === "s" && item.includes(search.substring(0,search.length-1)))){
            list.push(r);
          }
        });
        if(!list.includes(r) 
        && ((!r.description.includes(search+"less") && !r.description.includes(search.substring(0, search.length-1)+"less"))
        && (r.title.toLowerCase().includes(search) || 
        r.description.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search.substring(0,input.length-1))))){
          list.push(r);
        }
      });
      if(list.length !== 0){
        this.setState({
          hasResult: true
        })
      }
      else{
        this.setState({
          hasResult: false
        })
      }
      this.setState({
        results:list,
        firstTime:false,
      })
    }
  }
  
  _setCriteria(criteria, setName){
    const list = [];
    // console.log(criteria);
    if(setName === "Servings"){
      criteria.forEach(item=>{
        list.push(item);
      })
      this.setState({
        servings:list
      })
    }
    else if(setName === "Prep Time"){
      criteria.forEach(item=>{
        list.push(item);
      })
      this.setState({
        prep:list
      })
      // console.log("Prep Time: " +this.state.prep);
    }
    else if(setName === "Diet Label"){
      criteria.forEach(item=>{
        list.push(item);
      })
      this.setState({
        diet:list
      })
      // console.log("Diet Label: " +this.state.diet);
    }
    else{
      criteria.forEach(item=>{
        list.push(item);
      })
      this.setState({
        cal:list
      })
      // console.log("Calories: " +this.state.cal);
    }
  }

  // for Advanced search, for all recipes that meet the criteria, 
    // check that the recipe is not already in this.state.results
    // if it is not, add it to results
  _aSearchSubmit(event){
    // create a temporary list array
    const list = [];
    if(this.state.servings !== []){
      // console.log(this.state.servings);
      this.state.servings.forEach(item=>{
        recipes.forEach(r=>{
          if(!list.includes(r) && item === "1-5" && r.servings < 6){
            list.push(r);
          }
          else if(!list.includes(r) && item === "6-10" && r.servings > 5 && r.servings < 11){
            list.push(r);
          }
          else if(!list.includes(r) && item === "11-20" && r.servings > 10 && r.servings < 21){
            list.push(r);
          }
          else if(!list.includes(r) && item === "20+" && r.servings > 20){
            list.push(r);
          }
        })
      })
    }
    if(this.state.prep !== []){
      this.state.prep.forEach(item=>{
        recipes.forEach(r=>{
          if(!list.includes(r) && item === "Under 25 mins" && r.prepTime < 25){
            list.push(r);
          }
          else if(!list.includes(r) && item === "26-40 mins" && r.prepTime > 24 && r.prepTime < 41){
            list.push(r);
          }
          else if(!list.includes(r) && item === "41-60 mins" && r.prepTime > 40 && r.prepTime < 61){
            list.push(r);
          }
          else if(!list.includes(r) && item === "Over 1 hour" && r.prepTime > 60){
            list.push(r);
          }
        })
      })
    }
    if(this.state.diet !== []){
      this.state.diet.forEach(item=>{
        recipes.forEach(r=>{
          if(!list.includes(r) && r.dietLabel === item){
            list.push(r);
          }
        })
      })
    }
    if(this.state.cal !== []){
      this.state.cal.forEach(item=>{
        recipes.forEach(r=>{
          if(!list.includes(r) && item === "Less than 500" && r.calories < 500){
            list.push(r);
          }
          else if(!list.includes(r) && item === "501-800" && r.calories > 499 && r.calories < 800){
            list.push(r);
          }
          else if(!list.includes(r) && item === "801-1200" && r.calories > 799 && r.calories < 1201){
            list.push(r);
          }
          else if(!list.includes(r) && item === "1200+" && r.calories > 1200){
            list.push(r);
          }
        })
      })
    }
    if(list.length !== 0){
      this.setState({
        hasResult:true
      })
    }
    this.setState({
      results: list,
      firstTime:false
    })
  }

    // Advanced search onclick: show the drop-content
  _AdvancedSearch(event){
    const visible = "visible";
    const hidden = "hidden";
    this.state.AdvancedSearch === hidden ? this.setState({
      AdvancedSearch: visible
    }) : this.setState({
      AdvancedSearch: hidden
    })
  }

  // React.createRef()
  _keyPressed(event){
    if(event.key === "Enter"){
      // console.log(this.inputRef.current.value);
      this._fetchText(this.inputRef.current.value);
    }
  }
  _submitSearch(event){
    this._fetchText(this.inputRef.current.value);
  }
  // <Recipe data={this.state.results}/>
  render(){
    const recipeComponent = this.state.results.map(recipe =>{
      // console.log(recipe);
      return(
        <Recipe key={recipe.title}
        title={recipe.title}
        image={recipe.image}
        url={recipe.url}
        description={recipe.description}
        servings={recipe.servings}
        prepTime={recipe.prepTime}
        dietLabel={recipe.dietLabel}
        calories={recipe.calories}
        recipeCategory={recipe.recipeCategory}
        cookingMethod={recipe.cookingMethod}
        rating={recipe.rating}
        ingredients={recipe.ingredients}
        />
      )
    })
    console.log("results " + this.state.hasResult);
    return(
      <div className="App">
        <header>
          <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet"/>
        </header>
        <h1> Olivia's Recipe Search</h1>
        <div className="searchSection">
          <input type="text" className="searchBar"
          placeholder="🔍  Search..."
          ref = {this.inputRef}
          onKeyPress={this._keyPressed}/>
          <button id="wordSearch" type="submit" onClick={this._submitSearch}>
          Search
          </button>
        </div>
        <div className="dropdown" id="AdvancedSearch">
          <button className="dropbtn" type="button" onClick={this._AdvancedSearch}>
            Advanced Search &nbsp; &nbsp; ▽
          </button>
          <div className={this.state.AdvancedSearch}>
            <div id="AScontent">
            <div className="box">
            <Dropdown setCriteria={(criteria, setName) => this._setCriteria(criteria, setName)} buttonName="Servings" op1="1-5" op2="6-10" op3="11-20" op4="20+"/>
            <Dropdown setCriteria={(criteria, setName) => this._setCriteria(criteria, setName)} buttonName="Prep Time" op1="Under 25 mins" op2="26-40 mins" op3="41-60 mins" op4="Over 1 hour"/>
            <Dropdown setCriteria={(criteria, setName) => this._setCriteria(criteria, setName)} buttonName="Diet Label" op1="Vegetarian" op2="Low-Fat" op3="Low-Carb" op4="Low-Sodium"/>
            <Dropdown setCriteria={(criteria, setName) => this._setCriteria(criteria, setName)} buttonName="Calories" op1="Less than 500" op2="501-800" op3="801-1200" op4="1200+"/>
            </div>
            <button id="aSearch" type="submit" onClick={this._aSearchSubmit}>
              Search
            </button>
          </div>
          </div>
        </div> 
        <div className="results">
          {recipeComponent}
        </div>
        <div className="Error">
          {(this.state.firstTime) ? "": ((!this.state.hasResult) ? "No Results Found" : "")}
        </div>
      </div>
    );
  }
}

export default App;
