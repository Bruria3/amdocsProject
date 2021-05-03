export default function validate(user) {
  var errors = {}
  // if (!values.email) {
  //   errors.email = "Email address is required";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email address is invalid";
  // }
  if (!user.password) {
    errors.password = "Password is required";
  } else if (user.password.length < 8) {
    errors.password = "Password must be 8 or more characters";
  } else if (!/\d/.test(user.password)) {
    errors.password = "Password must contain atleast 1 number";
  } else if (!/[!@#$%&?]/g.test(user.password)) {
    errors.password = "Password must contain atleast 1 special character";
  } else if (!/[A-Z]/g.test(user.password)) {
    errors.password = "Password must contain atleast 1 capitol letter";
  }
  else {
    errors.password = "";

  }
  errors.username = !user.username ? "user name is required" : ""
  errors.firstName = !user.firstName ? "first name is required" : ""
  errors.lastName = !user.lastName ? "last name is required" : ""
debugger;
  console.log("errors: " + errors)
  return errors;
}