


const url = "http://localhost:3000/api/messages";


fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })

  let submitButton = document.getElementById("submitButton")
  let Username = document.getElementById("Username")
  let password = document.getElementById("password")

// Username.addEventListener("keydown",(e)=>{
//   console.log(e.target.value);
// })


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
        const content = await rawResponse.json();
        window.location.replace('index.html');
    }else{
        error.style.display = "block";
    }

})

  



  
    /*if (response == undefined) {
      response.status(404).send('Finns inte');
    }
    return response.json();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/