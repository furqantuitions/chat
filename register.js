function register() {
    var regEmail = document.getElementById("reg-email").value;
    var regPassword = document.getElementById("reg-password").value;
  
    firebase.auth().createUserWithEmailAndPassword(regEmail, regPassword)
      .then(function(userCredential) {
        // Registration successful
        alert("Registration successful!");
        
        // Get the user's unique ID
        var user = userCredential.user;
        var userId = user.uid;
  
        // Create a new data node in the Firebase Realtime Database with the email as the key
        var database = firebase.database();
        var usersRef = database.ref('users');
        usersRef.child(regEmail.replace('.', ',')).set({
          email: regEmail,
          userId: userId
        });
      })
      .catch(function(error) {
        // Handle registration error
        alert("Error: " + error.message);
      });
  }