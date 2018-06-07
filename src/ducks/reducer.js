//TYPES


//ACTION BUILDERS


const initialState = {
  logged_in: false,
  current_view: 'Home',
  products_in_view: {},
  number_of_pages: [],
  current_page: 1,
  search_text: '',
  current_product_displayed: {},
  current_product_image_displayed: '',
  current_product_in_cart: false,
  products_in_cart: {},
  number_of_products_in_cart: 0
}

//REDUCER FUNCTION
export default function reducer(state, action) {
  
  switch(action.type) {
    default: 
      return state;
  }
}