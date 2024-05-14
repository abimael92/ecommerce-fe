import { useState, useEffect, createContext } from "react";
import { Cart } from "@/api";

const cartCtrl = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(cartCtrl.count());

  useEffect(() => {
    const response = cartCtrl.getAll();
    setCart(response);
  }, []);

  const addCart = (gameId) => {
    cartCtrl.add(gameId);
    refreshTotalCart();
  };

  const changeQuantityItem = (gameId, quantity) => {
    cartCtrl.changeQuantity(gameId, quantity);
    refreshTotalCart();
  };

  const deleteItem = (gameId) => {
    cartCtrl.delete(gameId);
    refreshTotalCart();
  };

  const deleteAllItems = () => {
    cartCtrl.deleteAll();
    refreshTotalCart();
  };

  const refreshTotalCart = () => {
    setTotal(cartCtrl.count());
    setCart(cartCtrl.getAll());
  };

  const getCartItem = (gameId) => {
    return cart.some(item => item.id === gameId);
  };


  const data = {
    cart,
    addCart,
    total,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
    getCartItem
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
