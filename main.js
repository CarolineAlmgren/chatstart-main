let chatInput = document.getElementById("chatInput")
let chatButton = document.getElementById("chatButton")
let messageForm = document.getElementById("messageForm")

messageForm.addEventListener("submit", async (ev)=>{
    ev.preventDefault();

    const theResponse = await fetch('http://localhost:3000/hej',{
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   },
          method:'GET',
        //   credentials:'include',
          //body: JSON.stringify({message:chatInput.value,})                
      })
      const content = await theResponse.json()
      
      const rawResponse = await fetch('http://localhost:3000//api/sendmessage',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'POST',
          credentials:'include',
          body: JSON.stringify({message:chatInput.value,chatUserId:content.id})             
    })
})

