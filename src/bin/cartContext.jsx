

const [cartItems, setCartItems] = useState(JSON.parse(Cookies.get("cart") || "[]"));
  const [totalPrice, setTotalPrice] = useState(JSON.parse(Cookies.get("totalPrice") || 0));
  const [totalQuantities, setTotalQuantities] = useState(JSON.parse(Cookies.get("totalQuantities") || 0));


const addProduct = (product, quantity) => {
    const existingProduct = cartItems.find((item) => (link unavailable) === (link unavailable));
    if (existingProduct) {
      updateQuantity((link unavailable), existingProduct.quantity + quantity);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);
    }
  };

  const updateQuantity = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      (link unavailable) === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice + (quantity * cartItems.find((item) => (link unavailable) === id).price));
    setTotalQuantities(totalQuantities + quantity);
  };

  const removeProduct = (id) => {
    const updatedCartItems = cartItems.filter((item) => (link unavailable) !== id);
    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice - cartItems.find((item) => (link unavailable) === id).price * cartItems.find((item) => (link unavailable) === id).quantity);
    setTotalQuantities(totalQuantities - cartItems.find((item) => (link unavailable) === id).quantity);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        addProduct,
        updateQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
