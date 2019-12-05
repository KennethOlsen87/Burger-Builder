import React, {Component} from 'react'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


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
        totalPrice: 50,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }
            ,0)
        this.setState({purchaseable: sum > 0})
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
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldcount = this.state.ingredients[type]
        if(oldcount <= 0) {
            return
        }
        const updatedCount = oldcount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }


    purchaseHandler = () => {
        this.setState({purchasing: true })
    }
    
    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary
                    ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved= {this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />

            </Aux>
        );
    }
}

export default BurgerBuilder