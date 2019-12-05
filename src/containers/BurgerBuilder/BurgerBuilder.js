import React, {Component} from 'react'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


const INGREDIENT_PRICES = {
    salad: 3 ,
    cheese: 7 ,
    bacon: 10,
    meat: 20
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 0, 
            bacon: 0, 
            cheese: 0,
            meat: 0
        },
        totalPrice: 50
    }

    addIngredientHandler = (type) => {
        const oldcount = this.state.ingredients[type]
        const updatedCount = oldcount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }

    removeIngredientHandler = (type) => {

    }
    
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                />

            </Aux>
        );
    }
}

export default BurgerBuilder