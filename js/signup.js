var firebaseConfig = {
  // Put your firebase config here
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function register () {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("full_name").value;
  pfp_link = document.getElementById("pfp").value;

  if (validate_password(password) == false) {
    alert("The password field is empty!");
    return;
  }
  if (validate_field(full_name) == false) {
    alert("The name field is empty!");
    return;
  }
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser;

    var database_ref = database.ref();

    var user_data = {
      email : email,
      full_name : full_name,
      pfp_link : pfp_link,
    }

    database_ref.child('users/' + user.uid).set(user_data);

    alert("User created!");
  })
  .catch(function(error) {
    var error_code = error.code;
    var error_message = error.message;

    alert(error_message);
  })
}


// Validate Functions

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}