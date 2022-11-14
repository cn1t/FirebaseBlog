var firebaseConfig = {
  // Put your firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

// Variable to access database collection
const db = firestore.collection("blog");

// Get submit button
let submitButton = document.getElementById("submit");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in
    
    // Create event listener to allow form submission
    submitButton.addEventListener("click", (e) => {
        // Prevent default form submission behavior
        e.preventDefault();
    
        // Get form values
        let articleTitle = document.getElementById("title-txt").value;
        let articleText = document.getElementById("text-txt").value;
        let thumbnail = document.getElementById("inputlink").value;
    
        const d = new Date();
        const month = d.getMonth() + 1;
        let dateString = d.getDate() + "/" + month + "/" + d.getFullYear();

        let postName = d.getFullYear() + "|" + month + "|" + d.getDate() + "|" + d.getHours() + "|" + d.getMinutes();

        let blogId = "" + d.getFullYear() + month + d.getDate() + d.getHours() + d.getMinutes();
    
        let postDate = dateString;

        // CHECK Maybe not needed
        firestore.collection("blog").get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              const articleTitle = doc.data().articleTitle;
              
              if (articleTitle === articleTitle) {
                  console.log("Already Exists");
              };
    
            // console.log("data", doc.data().fname);
            });
        });

        var authorName;
        var author_pfp;

        var authorNameRef = firebase.database().ref("users/" + user.uid + "/full_name");
        var author_pfpRef = firebase.database().ref("users/" + user.uid + "/author_pfp");
        authorNameRef.on("value", (snapshot) => {
          authorName = snapshot.val();

          author_pfpRef.on("value", (snapshots) => {
            author_pfp = snapshots.val();

            // Save Form Data To Firebase
            db.doc("" + postName)
            .set({
                thumbnail: thumbnail,
                title: articleTitle,
                text: articleText,
                timestamp: postDate,
                author: authorName,
                author_pfp: author_pfp,
            })
            .then(() => { })
            .catch((error) => {
                console.log(error);
            });
        });

        alert("The article has been uploaded!");
        });
    });
  } else {
    // User not logged in

    console.log("You are not logged in!");
  }
});