var firebaseConfig = {
  // Put your firebase config here
};

firebase.initializeApp(firebaseConfig); // Initializing firebase once

const auth = firebase.auth();
const database = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already -> Lead to post ui

    document.location.href = "post_ui.html";
  } else {
    // User not logged in
  }
});

function login () {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  if (validate_password(password) == false) {
    alert("The password has to include at least 6 characters!");
    return;
  };

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser;

    var database_ref = database.ref();

    database_ref.child("users/" + user.uid);

    alert("Logged in!");

    document.location.href = "../post_ui.html";
  })
  .catch(function(error) {
    var error_code = error.code;
    var error_message = error.message;

    alert(error_message);
  });
};



// Validate functions

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  };
};

function validate_field(field) {
  // Check if fields are empty
  if (field == null) {
    return false;
  };

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  };
};