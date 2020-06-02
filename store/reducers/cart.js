import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  INCREASE_PRODUCT_ON_CART,
} from '../actions/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
  quantityCart: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const prodImageUrl = addedProduct.imageUrl;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        const newQuantity = state.items[addedProduct.id].quantity + 1;
        const newSum = state.items[addedProduct.id].sum + prodPrice;

        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
          prodImageUrl
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
          prodImageUrl
        );
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
        quantityCart: state.quantityCart + 1,
      };
    case REMOVE_FROM_CART:
      let selectedCartItem = state.items[action.pid];
      let currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
          selectedCartItem.imageUrl
        );
        updatedCartItems = {
          ...state.items,
          [action.pid]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
        quantityCart: state.quantityCart - 1,
      };
    case INCREASE_PRODUCT_ON_CART:
      selectedCartItem = state.items[action.pid];
      currentQty = selectedCartItem.quantity;
      // if (currentQty > 1) {
      const updatedCartItem = new CartItem(
        selectedCartItem.quantity + 1,
        selectedCartItem.productPrice,
        selectedCartItem.productTitle,
        selectedCartItem.sum + selectedCartItem.productPrice,
        selectedCartItem.imageUrl
      );
      updatedCartItems = {
        ...state.items,
        [action.pid]: updatedCartItem,
      };
      // }
      //  else {
      //   updatedCartItems = { ...state.items };
      //   delete updatedCartItems[action.pid];
      // }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount + selectedCartItem.productPrice,
        quantityCart: state.quantityCart + 1,
      };
    case ADD_ORDER:
    case RESET_CART:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      const itemQuantity = state.items[action.pid].quantity;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
        quantityCart: state.quantityCart - itemQuantity,
      };
  }
  return state;
};
