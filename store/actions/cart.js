export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const RESET_CART = 'RESET_CART';
export const INCREASE_PRODUCT_ON_CART = 'INCREASE_PRODUCT_ON_CART';

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_FROM_CART, pid: productId };
};

export const increaseProductOnCart = (productId) => {
  return { type: INCREASE_PRODUCT_ON_CART, pid: productId };
};

export const resetCart = () => {
  return { type: RESET_CART };
};
