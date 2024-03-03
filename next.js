// Retrieve userEmail from local storage
var userEmail = localStorage.getItem('userEmail');

if (userEmail) {
  // Replace period with comma in the userEmail
  var modifiedEmail = userEmail.replace(/\./g, ',');

  // Use modifiedEmail to access the specific container in Firebase
  firebase.database().ref('users/' + modifiedEmail).once('value').then(function(snapshot) {
    var userData = snapshot.val();
    console.log("userData", userData); // Log userData to check if data is retrieved

    // Display the sender's email for each message as a button on the webpage
    if (userData && userData.messages) {
      var messages = userData.messages;
      var senderEmails = [];

      // Iterate over each message
      Object.keys(messages).forEach(function(messageId) {
        var sender = messages[messageId].sender;
        if (sender && !senderEmails.includes(sender)) {
          senderEmails.push(sender);
          // Create a button element for each sender
          var button = document.createElement("button");
          button.innerText = sender;
          button.classList.add("sender-button"); // Add a class for styling
          // Add an event listener to the button to display the message when clicked
          button.addEventListener("click", function() {
            var message = messages[messageId].message;
            document.getElementById("messageDisplay").innerText = message;
          });
          // Append the button to a container in the HTML document
          document.getElementById("senderButtonsContainer").appendChild(button);
        }
      });
    } else {
      document.getElementById("userDataDisplay").innerText = "No messages found for this user.";
    }
  }).catch(function(error) {
    console.error("Error fetching data from Firebase:", error);
  });
} else {
  console.error("User email not found in local storage.");
}
 // Function to send a message to a receiver's email ID
 function sendMessage() {
  var senderEmail = userEmail;
  var message = document.getElementById("message").value;
  // Replace period with comma in the receiverEmail
  var modifiedReceiverEmail = senderEmail.replace(/\./g, ',');
  // Save the message in the receiver's email ID container with the sender's email ID
  firebase.database().ref('users/' + modifiedReceiverEmail + '/messages').push({
    sender: userEmail,
    message: message
  });

  alert("Message sent successfully!");
}