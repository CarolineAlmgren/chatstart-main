let chatInput = document.getElementById("chatInput");
let chatButton = document.getElementById("chatButton");
let messageForm = document.getElementById("messageForm");
let chatMessagesHolder = document.getElementById("chatMessagesHolder");
let chatInputHolder = document.getElementById("chat-input-holder")
let errorMsg = document.createElement("p");

let bigMessageResponse = await fetch(
  "http://localhost:3000/api/getallmessages",
  {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
    credentials: "include",
  }
);

//requireAuth körs ovan och om ingen är inloggad görs redirect till login.html

if(bigMessageResponse.status == 401){
  window.location.replace('login.html');
}


let bigUsersResponse = await fetch("http://localhost:3000/api/getallusers", {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "GET",
  credentials: "include",
});

const theUserResponse = await fetch("http://localhost:3000/api/theloggedinuser", {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "GET",
  credentials: "include",
});

const theLoggedInUser = await theUserResponse.json();

let messagesResponse = await bigMessageResponse.json();
console.log(messagesResponse);
let usersResponse = await bigUsersResponse.json();
console.log(usersResponse);

for (let i = 0; i < messagesResponse.length; i++) {
  let messageBox = document.createElement("div");
  messageBox.className = "message-box-holder";
  chatMessagesHolder.appendChild(messageBox);

  let textBox = document.createElement("div");

  if (messagesResponse[i].chatUserId !== theLoggedInUser.id) {
    let nameTextBox = document.createElement("div");
    nameTextBox.className = "message-sender";
    let nameTag = document.createElement("a");

    let theName = "";

    for (let j = 0; j < usersResponse.length; j++) {
      if (usersResponse[j].id == messagesResponse[i].chatUserId) {
        theName = usersResponse[j].Username;
      }
    }
    nameTextBox.appendChild(nameTag)
    nameTag.innerHTML = theName;

    textBox.className = "message-box message-partner";
    messageBox.appendChild(nameTextBox);
    nameTextBox.appendChild(textBox);
  } else {
    textBox.className = "message-box";
    messageBox.appendChild(textBox);
  }

  textBox.innerHTML = messagesResponse[i].message;
}

messageForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  errorMsg.innerHTML = "";

  const rawResponse = await fetch("http://localhost:3000/api/sendmessage", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ message: chatInput.value, chatUserId: theLoggedInUser.id }),
  });
  console.log(rawResponse);

  if(rawResponse.status == 422){
    let theError = await rawResponse.json()
    console.log(theError);
    chatInputHolder.appendChild(errorMsg)
    errorMsg.innerHTML = theError.errors[0].msg
    errorMsg.style.display = "block";

  }
  chatInput.value = "";
  
});
