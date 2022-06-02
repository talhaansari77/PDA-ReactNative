import axios from "axios";

let defaultState = {
  activeUser: {
    user: { shopId: null, type: null },
    status: false,
    menuId: null,
  },
};
// {
//   "id": "1",
//   "name": "SuperUser",
//   "email": "super@test.com",
//   "password": "123",
//   "contact": "+92132456879",
//   "city": "",
//   "cnic": "",
//   "business": "",
//   "picture": "https://grabefirst.000webhostapp.com/Uploads/imgs/624a2350d5fae2.98401165.png",
//   "type": "regular"
// }

let CreateUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CreateUser":
      let newState = { ...state };
      if (action.payload.status) {
        newState.activeUser = {
          user: { ...action.payload },
          status: true,
        };
        console.log(newState);
      } else {
        return state;
      }
      return newState;
    case "UpdateMenuId":
      let newState1 = { ...state };
      axios
        .get(Baseurl + "Shops/Shops.php?id=" + newState1.activeUser.user.shopId)
        .then((res) => {
          newState1.activeUser.menuId = res.data.menuId;
          console.log("menuId Updated");
        });
      return newState1;
    case "UpdatePicture":
      let newState3 = { ...state };
      if (action.payload.status) {
        newState3.activeUser.user.picture = action.payload.picture 
        console.log('Picture Updated');
      } else {
        return state;
      }
      return newState3;
    case "Logout":
      let newState2 = { ...state };
      newState2.activeUser = {
        user: { shopId: null, type: null },
        status: false,
        menuId: null,
      };
      console.log(newState2);
      return newState2;
    default:
      return state;
  }
};

export default CreateUserReducer;
