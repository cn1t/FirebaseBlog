var firebaseConfig = {
  // Put your firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

// Variable to access database collection
const db = firestore.collection("blog");


// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.
if ('content' in document.createElement('template')) {
  const wrapper = document.querySelector("#article-wrapper");

  const container = document.querySelector("#container-section"); // Elements are put into this element
  const template = document.querySelector("#temp-cont"); // Elements are cloned from this template


  const snapshot = await db.orderBy("timestamp", 'desc').get();
  snapshot.forEach((doc) => {
    const clone = template.content.cloneNode(true);

    // Getting the specific elements
    let cardTitle = clone.getElementById("card-title");
    let cardDesc = clone.getElementById("card-desc");
    let cardAuthor = clone.getElementById("author");
    let cardDate = clone.getElementById("date");
    let cardThumbnail = clone.getElementById("thumbnail");
    let cardAuthorpfp = clone.getElementById("authorpfp");
    let cardReadBtn = clone.getElementById("readbtn");

    let backBtn = document.querySelector("#backbtn");
    let thumbnail = document.querySelector("#thumbnail-banner");
    let title = document.querySelector("#postTitle");
    let sub = document.querySelector("#postSub");
    let desc = document.querySelector("#postDesc");

    // Modifying the template with correct text
    cardTitle.innerHTML = doc.data().title;
    cardDesc.innerHTML = doc.data().text;
    cardAuthor.innerHTML = doc.data().author;
    cardDate.innerHTML = "Veröffentlicht am " + doc.data().timestamp;
    cardThumbnail.src = doc.data().thumbnail;
    cardAuthorpfp.src = doc.data().author_pfp;

    if (cardReadBtn) { // Check that readBtn exists
      cardReadBtn.addEventListener("click", (e) => { // When readBtn is pressed
        thumbnail.src = doc.data().thumbnail;
        title.innerHTML = doc.data().title;
        sub.innerHTML = doc.data().author + " - Published on " + doc.data().timestamp;
        desc.innerHTML = doc.data().text;

        container.style.display = "none";
        wrapper.style.display = "block";

        backBtn.addEventListener("click", (e) => { // When backBtn is pressed
          container.style.display = "flex";
          wrapper.style.display = "none";
        });
      });
    };

    // Appending the modified template to the container
    container.appendChild(clone);
  });
} else {
  // Find another to list elements because the HTML template element is not supported
}