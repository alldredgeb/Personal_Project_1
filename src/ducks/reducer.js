//TYPES
const ADJUST_VIEW = "ADJUST_VIEW";

//ACTION BUILDERS
export function adjustView(view_info) {
  return {
    type: ADJUST_VIEW,
    payload: view_info
  }
}

const initialState = {
  logged_in: false,
  current_view: 'Home',
  products_in_view: {},
  number_of_pages: [],
  current_page: 1,
  search_text: '',
  current_product_displayed: {},
  current_product_image_displayed: 1,
  current_product_in_cart: false,
  products_in_cart: {},
  number_of_products_in_cart: 0
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
  
  switch(action.type) {

    case ADJUST_VIEW:
      return Object.assign( {}, state, 
        action.payload
      );

    default: 
      return state;
  }
}