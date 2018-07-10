//TYPES
const USER_INFO_TO_REDUX = "USER_INFO_TO_REDUX";
const ADD_CART_ITEM_COUNT = "ADD_CART_ITEM_COUNT";
const ADJUST_VIEW = "ADJUST_VIEW";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const LOAD_CART_CONTENTS = "LOAD_CART_CONTENTS";
const UPDATE_CART = "UPDATE_CART";

//ACTION BUILDERS
export function userInfoToRedux(array) {
  return {
    type: USER_INFO_TO_REDUX,
    payload: array
  }
}

export function addCartItemCount(itemCount) {
  return {
    type: ADD_CART_ITEM_COUNT,
    payload: itemCount
  }
}

export function adjustView(view) {
  return {
    type: ADJUST_VIEW,
    payload: view
  }
}

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    payload: products
  }
}

export function loadCartContents(cartContents) {
  return {
    type: LOAD_CART_CONTENTS,
    payload: cartContents
  }
}

export function updateCart(cartUpdate) {
  return {
    type: UPDATE_CART,
    payload: cartUpdate
  }
}

const initialState = {
  logged_in: false,
  userInfo: [],
  current_view: 'Home',
  products_in_view: [],
  search_text: '',
  products_in_cart: [],
  cart_item_count: 0
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
  
  switch(action.type) {

    case USER_INFO_TO_REDUX:
      return Object.assign({}, state, {
        logged_in: true,
        userInfo: action.payload
      }
    );

    case ADD_CART_ITEM_COUNT:
      return Object.assign({}, state, {
        cart_item_count: action.payload
      }
    );

    case ADJUST_VIEW:
      return Object.assign({}, state, {
        current_view: action.payload
      }
    );

    case ADD_PRODUCTS:
      return Object.assign({}, state, {
        products_in_view: action.payload
      }
    );

    case LOAD_CART_CONTENTS:
      return Object.assign({}, state, {
        products_in_cart: action.payload
      }
    );

    case UPDATE_CART:
      return Object.assign({}, state, {
        products_in_cart: action.payload
      }
    );

    default: 
      return state;
  }
}