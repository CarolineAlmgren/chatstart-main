

let chatInput = document.getElementById("chatInput")
let chatButton = document.getElementById("chatButton")
let messageForm = document.getElementById("messageForm")
let messageBoxHolder = document.getElementById("messageBoxHolder")
let testBox = document.getElementById("testBox")
let testName = document.getElementById("testName")

let bigResponse = await fetch('http://localhost:3000/api/getallmessages',{
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method:'GET',
    credentials:'include',             

})

let messagesResponse = await bigResponse.json();
console.log(messagesResponse);


for (let i = 0;i < messagesResponse.length;i++){
  let messageBox = document.createElement("p");
  testBox.appendChild(messageBox)

  messageBox.innerHTML = messagesResponse[i].message;

}




messageForm.addEventListener("submit", async (ev)=>{
    ev.preventDefault();

    const theResponse = await fetch('http://localhost:3000/hej',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'GET',
          credentials:'include',
          //body: JSON.stringify({message:chatInput.value,})                
      })
      console.log(theResponse);
      const content = await theResponse.json()
      console.log(content);
      console.log(content.id);
      
      const rawResponse = await fetch('http://localhost:3000/api/sendmessage',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'POST',
          credentials:'include',
          body: JSON.stringify({message:chatInput.value,chatUserId:content.id})             
    })
})

