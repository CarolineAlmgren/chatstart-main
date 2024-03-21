  let submitButton = document.getElementById("submitButton")
  let Username = document.getElementById("Username")
  let password = document.getElementById("password")
  let errorMessage = document.getElementById("errorMessage")


  submitButton.addEventListener("submit", async (ev)=>{
    ev.preventDefault();
    console.log("hej");
    const rawResponse = await fetch('http://localhost:3000/api/chatuser',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'POST',
          credentials:'include',
          body: JSON.stringify({Username: Username.value,password:password.value})                
    })
    if(rawResponse.status == 200){
        window.location.replace('index.html');
    }else{
      const content = await rawResponse.json();
      errorMessage.style.display = "block";
      errorMessage.innerHTML = content.errors[0].msg;;
    }

})



