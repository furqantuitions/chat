 // Retrieve userEmail from local storage
 var userEmail = localStorage.getItem('userEmail');

 // Replace period with comma in the userEmail
 var modifiedEmail = userEmail.replace(/\./g, ',');

 // Use modifiedEmail to access the specific container in Firebase
 firebase.database().ref('users/' + modifiedEmail).once('value').then(function(snapshot) {
   var userData = snapshot.val();
   // Display the contents on the webpage
   // For example, if you have a div with id "userDataDisplay":
   if (userData) {
     document.getElementById("userDataDisplay").innerText = JSON.stringify(userData, null, 2);
   } else {
     document.getElementById("userDataDisplay").innerText = "No data found for this user.";
   }
 });

 // Function to send a message to a receiver's email ID
 function sendMessage() {
   var receiverEmail = document.getElementById("receiverEmail").value;
   var message = document.getElementById("message").value;
   // Replace period with comma in the receiverEmail
   var modifiedReceiverEmail = receiverEmail.replace(/\./g, ',');
   // Save the message in the receiver's email ID container with the sender's email ID
   firebase.database().ref('users/' + modifiedReceiverEmail + '/messages').push({
     sender: userEmail,
     message: message
   });

   alert("Message sent successfully!");
 }