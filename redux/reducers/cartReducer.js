let defaultState = {
  selectedItems: { items: [], shopName: "" },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        console.log("ADD TO CART");

        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items,
            { ...action.payload, qty: 1 },
          ],
          shopName: action.payload.shopName,
        };
      } else {
        console.log("REMOVE FROM CART");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.id !== action.payload.id
            ),
          ],
          shopName: action.payload.shopName,
        };
      }
      console.log(newState, "👉");
      return newState;
    }
    case "DELETE_CART": {
      let newState1 = { ...state };
      newState1.selectedItems = { items: [], shopName: "" };
      console.log("CartEmpty! 👉");
      return newState1;
    }
    case "PLUS_QTY": {
      let newState2 = { ...state };
      let cartItemToPlus = newState2.selectedItems.items.find(
        (item) => item.id === action.payload.id
      );
      let cartItemModified = {
        ...cartItemToPlus,
        qty: cartItemToPlus.qty + 1,
        price: (
          (cartItemToPlus.price * (cartItemToPlus.qty + 1)) /
            cartItemToPlus.qty +
          1 -
          1
        ).toString(),
      };

      let cartListModified = newState2.selectedItems.items.map((item) =>
        item.id === action.payload.id ? cartItemModified : item
      );

      newState2.selectedItems = {
        items: cartListModified,
        shopName: "",
      };
      console.log(newState2, "👉");

      return newState2;
    }
    case "MINUS_QTY": {
      let newState2 = { ...state };
      let cartItemToMinus = newState2.selectedItems.items.find(
        (item) => item.id === action.payload.id
      );
      let cartItemModified = {};
      let cartListModified = {};

      if (cartItemToMinus.qty > 1) {
        cartItemModified = {
          ...cartItemToMinus,
          qty:
            cartItemToMinus.qty > 1
              ? cartItemToMinus.qty - 1
              : cartItemToMinus.qty,
          price:
            cartItemToMinus.qty > 1
              ? (
                  (cartItemToMinus.price * (cartItemToMinus.qty - 1)) /
                    cartItemToMinus.qty +
                  1 -
                  1
                ).toString()
              : cartItemToMinus.price,
        };
        cartListModified = newState2.selectedItems.items.map((item) =>
          item.id === action.payload.id ? cartItemModified : item
        );
      } else if (cartItemToMinus.qty === 1) {
        cartListModified = newState2.selectedItems.items.filter(
          (item) => item.id !== action.payload.id
        ); 
      }
 
      newState2.selectedItems = {
        items: cartListModified,
        shopName: "",
      };
      console.log(newState2, "👉");

      return newState2;
    }

    default:
      return state;
  }
};

export default cartReducer;
