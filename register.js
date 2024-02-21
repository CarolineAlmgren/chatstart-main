let registrationForm = document.getElementById("registrationForm")
let registerUsername = document.getElementById("registerUsername")
let registerPassword = document.getElementById("registerPassword")
let registerPasswordCheck = document.getElementById("registerPasswordCheck")
let errorMessage = document.getElementById("errorMessage")



registrationForm.addEventListener("submit", async (ev)=>{
    ev.preventDefault();
    if (registerPassword.value == registerPasswordCheck.value){
  
      console.log("hej");
      const rawResponse = await fetch('http://localhost:3000/api/useraccount',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'POST',
          credentials:'include',
          body: JSON.stringify({Username: registerUsername.value,password:registerPassword.value})                
      })
      console.log(rawResponse);
      if(rawResponse.status == 204){
        //const content = await rawResponse.json();
        window.location.replace('index.html');
      }
      else{
        errorMessage.style.display = "block";
        const content = await rawResponse.json();
        errorMessage.innerHTML = content;
    }
  
    }
    else {
      errorMessage.style.display = "block";
    }
  })
  
    