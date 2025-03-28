const myForm = document.getElementById("myForm");
const myInput = document.getElementById("inputarget");
const myRow = document.getElementById("cardsearch");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

const searchAPI = function (inputvalue) {
  if (!inputvalue) {
    myRow.innerHTML = ``;
    return;
  }

  const eventsURL =
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
  fetch(eventsURL + inputvalue)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La risposta non era valida");
      }
      return response.json();
    })
    .then((data) => {
      if (data.data.length === 0) {
        myRow.innerHTML = "<p>Nessun album trovato.</p>";
        return;
      }
      console.log(data);
      let album = data.data[0].album;
      let artist = data.data[0].artist;

      myRow.innerHTML = `
        <div class="col-lg-6 col-8 ">
        <h3 class="text-white">Risultato più rilevante</h3>
          <div class="card border-0 p-3">
            <img src="${album.cover_medium}" class="card-img-top" alt="album musicale">
            <div class="card-body">
              <h5 class="card-title text-white">${album.title}</h5>
              <p class="card-text"><a class="text-secondary text-decoration-none" href="./artist.html?id=${artist.id}" target="_blank">${artist.name}</a></p>
              <a href="./album2.html?id=${album.id}" class="btn btn-outline-primary" target="_blank">Ascolta L'Album</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12 my-5 ms-5 my-sm-0 ms-sm-0">
          <h3 class="ms-2 text-white">Brani </h3>
             <div class="container ">
                <div class="row" id="tracce">
              
                </div>
             </div>
        </div>
        
        `;
      const tracce = document.getElementById("tracce");
      data.data.splice(0, 5).forEach((track) => {
        tracce.innerHTML += `
            <div class="col-6 col-lg-12 my-3 mx-1 mx-lg-0" >
            <div class="d-flex">
            <div class="me-3">
            <img src="${track.album.cover_big}" style="width : 50px ; height : 50px ;" />
            </div>
            <div class="d-flex flex-column  p-0 m-0">
            <p class="p-0 m-0 text-white">${track.title}</p>
            <p class="p-0 m-0 text-secondary"><a class=" text-secondary text-decoration-none" href="./artist.html?id=${track.artist.id}">${track.artist.name}</a></p>
            </div>
          
                 
           
            </div>
            </div>
      `;
      });
    })
    .catch((err) => {
      console.error("Errore", err);
    });
};

myInput.addEventListener("keyup", function () {
  searchAPI(this.value);
});
