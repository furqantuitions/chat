function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
            // Login successful
            var user = userCredential.user;
            var userEmail = user.email;
            // Store userEmail in local storage
            localStorage.setItem('userEmail', userEmail);
            // Redirect to the next page
            window.location.href = "nextPage.html";
        })
      .catch(function(error) {
        // Handle login error
        alert("Error: " + error.message);
      });
}
