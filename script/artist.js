const URLparameters = new URLSearchParams(location.search);
const artistId = URLparameters.get("id");

const eventsURL = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const artistAPI = function () {
  fetch(eventsURL + "/" + artistId, {})
    .then((response) => {
      console.log("Response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta non era valida");
      }
    })
    .then((data) => {
      console.log("Dati", data);

      const row = document.getElementById("events-row");

      row.innerHTML += `
      <div class="card border-0 rounded-0 " style="background-image: url('${data.picture_xl}'); background-size: cover; background-position: 50%; background-repeat: no-repeat;">
        <div class="card-body " style="backdrop-filter: brightness(50%); min-height: 50%;">
        <div class="invisible">ciao</div>
        <div class="invisible">ciao</div>
        <div class="invisible">ciao</div>
        <div class="invisible">ciao</div>
        <div >
        <p class="text-white mb-0"><i class="bi bi-patch-check-fill  text-primary" ></i> Artista Verificato</p>
          <h5 class="card-title fs-1 text-white mb-5">${data.name}</h5>
          </div>
          <p class="card-text text-white position-absolute bottom-0 pb-3 d-none d-lg-block">  ${data.nb_fan} Ascoltatori Mensili</p>
      
          
         
      </div>
    </div>
     <p class="card-text text-white position-absolute bottom-0 pb-3 d-block d-lg-none paragrafo2">  ${data.nb_fan} Ascoltatori Mensili</p>
    <div class="container  ">
 <div class="row">
                 <div class="col-12 ms-3 my-5 d-flex flex-row-reverse gap-4 flex-lg-row justify-content-evenly  justify-content-lg-start align-items-center">
                 <div class="border rounded-circle d-flex justify-content-center align-items-center bg-success playspoty me-4 me-lg-0" style="width: 50px; height: 50px;""><i class="bi bi-play-fill fs-3"></i></div>
                 <button type="button" class="btn btn-secondary order-1 ">Following</button>
                  <div class="ms-auto d-lg-none"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-shuffle text-primary d-lg-none flex-grow-2 " viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
</svg>

</div>
        <p class="text-white rotazione fs-1 ms-3 ms-lg-0 clicclabile">...</p>        
                
                 </div>
              <div class="col-xl-7 col-lg-7 order-2 order-sm-1 "><h2 class="text-white ps-4 mb-5 mb-lg-4 ms-5 ms-md-0">Popolari</h2>
              <div class="d-flex justify-content-between text-white" > 
              <div id="top5tracklist" > </div>
              <div id="numeroascolti"> </div>
              <div id="temporiproduzione"> </div>
              </div>
              </div>
              <div class="col-xl-5 col-lg-4 ps-lg-3 pb-0 order-1 order-sm-2 "><h2 class="fs-4 text-white p-0 my-5 my-lg-0 ms-4 ms-md-0">Brani che ti piacciono</h2>
              
                            <div class="d-flex gap-3 my-5 ms-4 ms-md-0">
               <div ><img class="rounded-circle" src="${data.picture_small}"></div>
              <div><p class="text-white">Hai messo MI piace a <span id="">x</span> brani</p> 
              <div><p class="text-white fs-6">${data.name}</p></div></div>
           
              </div>
              </div>
            </div>
          </div>`;
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

artistAPI();

const URLparameters2 = new URLSearchParams(location.search);
const albumId = URLparameters2.get("albumId");

const events2URL = "https://striveschool-api.herokuapp.com/api/deezer/artist";

const albumAPI = function () {
  fetch(events2URL + "/" + artistId + "/top?limit=50", {})
    .then((response) => {
      console.log("Response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta non era valida");
      }
    })
    .then((data) => {
      console.log("Dati", data);

      const topFive = document.getElementById("top5tracklist");

      topFive.innerHTML = `
      <div class="container">
    ${data.data
      .slice(0, 5)
      .map(
        (track, index) => `
      <div class="row align-items-center text-white gap-2 gap-xl-0  py-2" >
        <div class="col-xl-1 col-1">${index + 1}</div> 
        <div class="col-xl-2 col-2">
          <img src="${
            track.album.cover_big
          }" class="img" style="width: 50px; height: 50px; object-fit: cover;"/>
        </div> 
        <div class="col-xl-5 col-5 testospeciale ">${track.title}</div> 
        <div class="col-xl-2 col-2 d-flex justify-content-end d-lg-none"> 
    <p class="text-white rotazione clicclabile">...</p>
  </div>
        <div class="col-xl-2 ms-xl-0 ms-5 ps-4 text-secondary spostamento  ">${
          track.rank
        }</div> 
        <div class="col-xl-2 d-none d-xl-block ps-5 text-secondary">${new Date(
          track.duration * 1000
        )
          .toISOString()
          .substring(14, 19)}</div> 
      </div>
     

      
    `
      )
      .join("")}
      <div><h6 class="my-lg-3 my-2">Visualizza altro</h6></div>
  </div>`;
    })
    .catch((err) => {
      console.error("Errore", err);
    });
};

albumAPI();

/* <div class="col-xl-3 col-3 d-none">
<audio controls>
  <source src="${track.preview}" type="audio/mpeg">
</audio>
</div>
</div> */
