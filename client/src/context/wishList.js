import { useState, useContext, createContext, useEffect } from "react";

const wishContext = createContext();

const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);

  useEffect(() => {
    let existingWishItem = localStorage.getItem("wish");
    if (existingWishItem) setWish(JSON.parse(existingWishItem));
  }, []);


  return (
    <wishContext.Provider value={[wish, setWish]}>
      {children}
    </wishContext.Provider>
  );
};

// custom hook
const useWish = () => useContext(wishContext);

export { useWish, WishProvider };