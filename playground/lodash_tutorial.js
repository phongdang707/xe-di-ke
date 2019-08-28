const _ = require("lodash");

// _.isEmpty()
// check xem object/mang rong ?
// [],{}=>true
// [1,2,3] => false
console.log("TCL: _.isEmpty([1,2,3,4])", _.isEmpty([1, 2, 3, 4]));
_.isEmpty([1, 2, 3, 4]);

// _.get()
// nested object
const user = {
  credenticals: {
    email: "A@gmail.com",
    password: "xxxyyy"
  },
  profile: {
    name: "A",
    age: 23,
    address: {
      number: 10,
      street: "Nguyen Hue",
      province: "Hue"
    }
  }
};
console.log("====================================");
console.log(_.get(user, "profile.address"));
console.log("====================================");
const user1 = {
    credenticals: {
      email: "A@gmail.com",
      password: "xxxyyy"
    },
    profile: {
      name: "A",
      age: 23,
    //   address: {
    //     number: 10,
    //     street: "Nguyen Hue",
    //     province: "Hue"
    //   }
    }
  };
//   console.log(_.get(user1, "profile.address", "nguoi dung chua nhap dia chi"));

console.log(_.set(user1 , 'profile.address.province', "Ha Noi"));
