"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

$(document).ready(function () {

  //ESTABLISH STORAGE KEY AND EITHER GET RECIPES FROM STORAGE
  // OR SET THIS RECIPIES VARIABLE TO STATE WHICH WILL GET SET TO STORAGE
  var localStorageKey = "benjaminadk_MY_RECIPES";
  var recipes = JSON.parse(localStorage.getItem(localStorageKey)) || [{
    name: "Carrot Cake",
    ingredients: [["Grated Carrots", "3 Cups"], ["Flour", "2 Cups"], ["Sugar", "2 Cups"], ["Eggs", "4"], ["Vegetable Oil", "1 Cup"], ["Vanilla Extract", "1 Teaspoon"], ["Cinnamon", "2 Teaspoons"], ["Baking Soda", "1.5 Teaspoons"]],
    instructions: ["Heat oven to 350 F", "Combine wet ingredients in bowl and mix", "Add dry ingredients to bowl", "Stir until smooth", "Gently fold in carrots", "Bake 30-35 minutes", "Remove from oven and cool", "Apply cream cheese frosting"],
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1216298/carrotcake.jpg" }, {
    name: "Cream Cheese Frosting",
    ingredients: [["Cream Cheese", "16 Ounces"], ["Powdered Sugar", "8 Ounces"], ["Vanilla", "1 Teaspoon"], ["Butter", "1 Stick"]],
    instructions: ["Bring Cream Cheese and Butter to room temperature", "Combine ingredients", "Apply to Mom's Killa Carrot Cake"],
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1216298/creamcheese.jpg" }, {
    name: "Chocolate Chip Cookies",
    ingredients: [["Flour", "4 Cups"], ["Butter", "2 Cups"], ["Eggs", "4"], ["Sugar", "2 Cups"], ["Baking Soda", "2 Teaspoons"], ["Baking Powder", "2 Teaspoons"], ["Vanilla Extract", "2 Teaspoons"], ["Oatmeal", "5 Cups"], ["Chocolate Chips", "24 Ounces"], ["Brown Sugar", "2 Cups"], ["Salt", "1 Teaspoon"], ["Chopped Nuts", "3 Cups (Optional)"]],
    instructions: ["Heat oven to 375 F", "Combine wet ingredients in bowl and mix", "Add dry ingredients to bowl", "Stir until smooth", "Gently fold in chocolate chips and nuts", "Bake for 10 minutes", "Remove and Eat"],
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1216298/cookies.jpg"
  }];

  var Recipe = function (_React$Component) {
    _inherits(Recipe, _React$Component);

    function Recipe(props) {
      _classCallCheck(this, Recipe);

      return _possibleConstructorReturn(this, _React$Component.call(this, props));
    }

    Recipe.prototype.handleDelete = function handleDelete(event, index) {
      this.props.deleteRecipe(event, index);
    };

    Recipe.prototype.handleEdit = function handleEdit(event, index) {
      this.props.editRecipe(event, index);
    };

    Recipe.prototype.render = function render() {
      var ingredientList = [];
      var instructionList = [];
      for (var i = 0; i < this.props.ingredients.length; i++) {
        ingredientList.push(React.createElement(
          "span",
          { className: "ingredient" },
          this.props.ingredients[i][0],
          React.createElement(
            "span",
            { className: "quantity" },
            this.props.ingredients[i][1]
          )
        ));
      }
      for (var j = 0; j < this.props.instructions.length; j++) {
        instructionList.push(React.createElement(
          "li",
          { className: "instruction" },
          this.props.instructions[j]
        ));
      }

      return React.createElement(
        "li",
        { className: "accordion-item", id: this.props.index, "data-accordion-item": true },
        React.createElement(
          "a",
          { href: '#' + this.props.index, className: "accordion-title" },
          this.props.name
        ),
        React.createElement(
          "div",
          { className: "accordion-content", "data-tab-content": true },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "column medium-4 small-12 leftCol" },
              React.createElement(
                "p",
                { id: "ingredientTitle" },
                "Ingredients"
              ),
              ingredientList
            ),
            React.createElement(
              "div",
              { className: "column medium-4 small-12 midImgBut" },
              React.createElement("img", { src: this.props.url, alt: "photo of food item", className: "thumbnail", height: "200px", width: "200px" }),
              React.createElement(
                "div",
                { id: "midButBox" },
                React.createElement(
                  "button",
                  { type: "button", className: "button delete", onClick: this.handleDelete.bind(this, this.props.index) },
                  "DELETE"
                ),
                React.createElement(
                  "button",
                  { type: "button", className: "button edit", onClick: this.handleEdit.bind(this, this.props.index) },
                  "EDIT"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "column medium-4 small-12 rightCol" },
              React.createElement(
                "p",
                { id: "instructionTitle" },
                "Instructions"
              ),
              React.createElement(
                "ol",
                { id: "instructionsOL" },
                instructionList
              )
            )
          )
        )
      );
    };

    return Recipe;
  }(React.Component);

  var RecipeBox = function (_React$Component2) {
    _inherits(RecipeBox, _React$Component2);

    function RecipeBox(props) {
      _classCallCheck(this, RecipeBox);

      return _possibleConstructorReturn(this, _React$Component2.call(this, props));
    }

    RecipeBox.prototype.render = function render() {
      var recipeComponents = [];
      for (var i = 0; i < this.props.recipes.length; i++) {
        recipeComponents.push(React.createElement(Recipe, { name: this.props.recipes[i].name,
          ingredients: this.props.recipes[i].ingredients,
          instructions: this.props.recipes[i].instructions,
          url: this.props.recipes[i].url,
          deleteRecipe: this.props.deleteRecipe.bind(this),
          editRecipe: this.props.editRecipe.bind(this),
          index: i }));
      }
      return React.createElement(
        "ul",
        { className: "accordion", "data-accordion": true, id: "recipeBox" },
        recipeComponents
      );
    };

    return RecipeBox;
  }(React.Component);

  var AddButton = function AddButton(props) {
    return React.createElement(
      "button",
      { type: "button", className: "expanded button", id: "addRecipe", "data-open": "newItem" },
      "ADD RECIPE"
    );
  };

  var Reveal = function Reveal(props) {
    return React.createElement(
      "div",
      { className: "reveal", id: "newItem", "data-reveal": true },
      React.createElement(
        "h1",
        { id: "newRecipe" },
        "New Recipe"
      ),
      React.createElement(
        "label",
        { className: "label" },
        "Recipe Name"
      ),
      React.createElement("input", { type: "text", id: "recipeName", placeholder: "Enter the Name of New Recipe Here" }),
      React.createElement(
        "label",
        { className: "label" },
        "Ingredients"
      ),
      React.createElement("textarea", { id: "rIngredients", placeholder: "Enter Ingredient Comma Measurement Comma New Ingredient....." }),
      React.createElement(
        "label",
        { className: "label" },
        "Instrucions"
      ),
      React.createElement("textarea", { id: "rInstructions", placeholder: "Enter Instructions Each Step Followed By A Comma" }),
      React.createElement(
        "label",
        { className: "label" },
        "Photo URL"
      ),
      React.createElement("input", { type: "text", id: "photoURL", placeholder: "Enter the URL of Photo Here" }),
      React.createElement(
        "button",
        { className: "button expanded", type: "button", id: "saveRecipe", onClick: props.add },
        "SAVE"
      ),
      React.createElement(
        "button",
        { className: "button expanded", type: "button", id: "revealClose", onClick: props.close },
        "CANCEL"
      )
    );
  };

  var Title = function Title() {
    return React.createElement(
      "footer",
      null,
      React.createElement(
        "span",
        { id: "title" },
        "Grandma's New School Recipe Box | © 2017 | @benjaminadk"
      )
    );
  };

  var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App(props) {
      _classCallCheck(this, App);

      var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

      _this3.state = {
        recipes: recipes,
        editMode: false,
        editIndex: -1
      };
      _this3.addRecipe = _this3.addRecipe.bind(_this3);
      return _this3;
    }

    App.prototype.componentDidMount = function componentDidMount() {
      //FOUNDATION JS INITIALIZERS
      var options = {
        slideSpeed: 500,
        allowAllClosed: true,
        deepLink: true,
        deepLinkSmudge: true,
        updateHistory: true
      };
      var accordion = new Foundation.Accordion($("#recipeBox"), options);

      var mOptions = {
        animationIn: "spin-in",
        animationOut: "spin-out-ccw"
      };
      var reveal = new Foundation.Reveal($("#newItem"), mOptions);
    };

    //APP CLASS METHODS
    //CLOSE METHOD FOR REVEAL AKA MODAL

    App.prototype.closeReveal = function closeReveal() {
      $('#newItem').foundation('close');
    };
    //METHOD FOR ADDING RECIPES

    App.prototype.addRecipe = function addRecipe(e, index) {
      var rName = document.getElementById("recipeName").value,
          rIng = document.getElementById("rIngredients").value,
          rIns = document.getElementById("rInstructions").value,
          rImg = document.getElementById("photoURL").value;

      if (rName.length > 0 && rIng.length > 0 && rIns.length > 0) {
        var newRecipes = this.state.recipes;
        var tempIng = rIng.split(",");
        var newIns = rIns.split(",");
        var newIng = [];
        for (var i = 0; i < tempIng.length; i += 2) {
          newIng.push([tempIng[i], tempIng[i + 1]]);
        }
        var newRecipe = {
          name: rName,
          ingredients: newIng,
          instructions: newIns,
          url: rImg
        };
        if (this.state.editMode) {
          newRecipes.splice(this.state.editIndex, 1, newRecipe);
        } else {
          newRecipes.push(newRecipe);
        }
        this.setState({
          recipes: newRecipes,
          editMode: false,
          editIndex: -1
        });
        localStorage.setItem(localStorageKey, JSON.stringify(newRecipes));

        $('#newItem').foundation('close');
        location.reload();
      } else {
        alert("Please finish filling out the New Recipe Input Boxes");
      }
    };

    //METHOD TO EDIT A RECIPE

    App.prototype.editRecipe = function editRecipe(index) {
      var rName = document.getElementById("recipeName"),
          rIng = document.getElementById("rIngredients"),
          rIns = document.getElementById("rInstructions"),
          rImg = document.getElementById("photoURL");

      rName.value = this.state.recipes[index].name;
      rIng.value = this.state.recipes[index].ingredients.join(",");
      rIns.value = this.state.recipes[index].instructions;
      rImg.value = this.state.recipes[index].url;
      this.setState({
        editMode: true,
        editIndex: index
      });
      $("#newItem").foundation("open");
    };

    //METHOD TO DELETE A RECIPE

    App.prototype.deleteRecipe = function deleteRecipe(index) {
      var newRecipeState = this.state.recipes.filter(function (el, i) {
        return i !== index;
      });
      localStorage.setItem(localStorageKey, JSON.stringify(newRecipeState));
      this.setState({
        recipes: newRecipeState
      });
    };

    App.prototype.render = function render() {

      return React.createElement(
        "div",
        { id: "appWrapper" },
        React.createElement(RecipeBox, { recipes: this.state.recipes,
          deleteRecipe: this.deleteRecipe.bind(this),
          editRecipe: this.editRecipe.bind(this) }),
        React.createElement(AddButton, null),
        React.createElement(Title, null),
        React.createElement(Reveal, { close: this.closeReveal,
          add: this.addRecipe })
      );
    };

    return App;
  }(React.Component);

  ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
});