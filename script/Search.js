const myForm = document.getElementById("myForm");
const myInput = document.getElementById("inputarget");
const myRow = document.getElementById("cardsearch");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

const searchAPI = function (inputvalue) {
  if (!inputvalue) return;

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

      let album = data.data[0].album;
      let artist = data.data[0].artist;

      myRow.innerHTML = `
        <div class="col-4">
          <div class="card">
            <img src="${album.cover_medium}" class="card-img-top" alt="album musicale">
            <div class="card-body">
              <h5 class="card-title">${album.title}</h5>
              <p class="card-text"><a href="./artist.html?id=${artist.id}" target="_blank">${artist.name}</a></p>
              <a href="https://www.deezer.com/album/${album.id}" class="btn btn-primary" target="_blank">Ascolta</a>
            </div>
          </div>
        </div>`;
    })
    .catch((err) => {
      console.error("Errore", err);
    });
};

myInput.addEventListener("input", function () {
  searchAPI(this.value);
});
