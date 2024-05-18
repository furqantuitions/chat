// Retrieve userEmail from local storage
var userEmail = localStorage.getItem('userEmail');

if (userEmail) {
  // Replace period with comma in the userEmail
  var modifiedEmail = userEmail.replace(/\./g, ',');

  // Use modifiedEmail to access the specific container in Firebase
  var messagesRef = firebase.database().ref('users/' + modifiedEmail + '/messages');

  // Listen for changes in the messages data
  messagesRef.on('value', function(snapshot) {
    var messagesData = snapshot.val();
    console.log("messagesData", messagesData); // Log messagesData to check if data is retrieved

    // Display the sender's email for each message as a button on the webpage
    if (messagesData) {
      var messages = "";

      // Concatenate all messages
      Object.keys(messagesData).forEach(function(senderEmail) {
        var senderMessages = messagesData[senderEmail];
        Object.keys(senderMessages).forEach(function(messageId) {
          messages += senderMessages[messageId].message + "\n";
        });
      });

      // Display all messages
      document.getElementById("messageDisplay").innerText = messages;

      // Display the sender's email for each message as a button on the webpage
      var senderEmails = [];

      // Iterate over messages and collect unique sender emails
      Object.keys(messagesData).forEach(function(senderEmail) {
        var senderMessages = messagesData[senderEmail];
        if (!senderEmails.includes(senderEmail)) {
          senderEmails.push(senderEmail);

          // Create a button element for each sender
          var button = document.createElement("button");
          button.innerText = senderEmail.replace(/,/g, '.'); // Revert comma to period
          button.classList.add("sender-button"); // Add a class for styling

          // Add an event listener to the button to display messages when clicked
          button.addEventListener("click", function() {
            var messages = "";
            // Concatenate all messages from this sender
            Object.keys(senderMessages).forEach(function(messageId) {
              messages += senderMessages[messageId].message + "\n";
            });
            document.getElementById("messageDisplay").innerText = messages;

            // Update receiver email with sender's email when button is clicked
            document.getElementById("receiverEmail").value = senderEmail.replace(/,/g, '.');
          });

          // Append the button to the container in the HTML document
          document.getElementById("senderButtonsContainer").appendChild(button);
        }
      });

    } else {
      document.getElementById("userDataDisplay").innerText = "No messages found for this user.";
    }
  }, function(error) {
    console.error("Error fetching data from Firebase:", error);
  });
} else {
  console.error("User email not found in local storage.");
}

function sendMessage() {
  var receiverEmail = document.getElementById("receiverEmail").value;

  // Check if receiver's email is provided
  if (!receiverEmail) {
    alert("Please provide the receiver's email!");
    return; // Stop further execution
  }

  var message = document.getElementById("message").value;

  // Replace period with comma in the receiverEmail
  var modifiedReceiverEmail = receiverEmail.replace(/\./g, ',');

  // Check if message is provided
  if (!message) {
    alert("Please enter a message!");
    return; // Stop further execution
  }

  // Save the message in the receiver's email ID container with the sender's email ID
  firebase.database().ref('users/' + modifiedReceiverEmail + '/messages/' + modifiedEmail).push({
    message: message
  });

  // Clear the message input field after message is sent
  document.getElementById("message").value = "";

}

