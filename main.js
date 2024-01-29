


const url = "http://localhost:3000/api/messages";


fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
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