# Firebase Blog Template

This is a template for a quick and easy blog system fully working with firebase.

## Deployment

To deploy the blog you will have to add the following code to every java script file in the `js/` folder.

```js
  var firebaseConfig = {
    // Put your firebase config here

    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
```

Afterwards, you are already good to go!

Use signup.html to create an account / login.html to log into the account.

If you are already logged in, you will be automatically redirected to post_ui.html.
There you can write a blog-post and it will be displayed on the index.html.

Thats it!
