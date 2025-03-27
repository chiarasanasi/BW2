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
          <section class="mb-3">
              <div class="d-flex justify-content-between">
                <div class="col-6 col-md-6 mb-2 mb-md-0">
                  <div class="d-flex w-100">

                    <a href="/album2.html" class="btn btn-light me-2 bg-transparent border-0 text-light-emphasis">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-arrow-left-circle-fill text-dark"
                        viewBox="0 0 16 16">
                        <path
                          d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                        />
                      </svg>
                    </a>

                    <a href="/artist.html?id=${artistId}" class="btn me-2 bg-transparent border-0 text-light-emphasis">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-arrow-right-circle-fill text-dark"
                        viewBox="0 0 16 16">
                        <path
                          d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                        />
                      </svg>
                    </a>

                  </div>
                </div>
                <div class="col-6 col-md-6 col-lg-4 col-xxl-3 text-md-end">
                  <select class="form-select bg-black text-light rounded-5">
                    <option selected>Riccardo Sangermano</option>
                    <option value="1">Pierattilio Correale</option>
                    <option value="2">Chiara Sanasi</option>
                    <option value="3">Pietro sorbo</option>
                    <option value="3">Alessandro di Giannantonio</option>
                  </select>
                </div>
              </div>
            </section>
        <div class="invisible">ciao</div>
        <div class="invisible">ciao</div>
        <div class="invisible">ciao</div>
        <div class="invisible">ciao</div>
        <div >
        <p class="text-white mb-0"><i class="bi bi-patch-check-fill  text-primary" ></i> Artista Verificato</p>
          <h5 class="card-title fs-0 text-white mb-5">${data.name}</h5>
          </div>
          <p class="card-text text-white position-absolute bottom-0 pb-3 d-none d-lg-block">  ${data.nb_fan} Ascoltatori Mensili</p>
      
          
         
      </div>
    </div>
     <p class="card-text text-white position-absolute bottom-0 pb-3 d-block d-lg-none paragrafo2">  ${data.nb_fan} Ascoltatori Mensili</p>
    <div class="container  ">
 <div class="row">
                 <div class="col-12 ms-3 my-5 d-flex flex-row-reverse gap-4 flex-lg-row justify-content-evenly  justify-content-lg-start align-items-center">

                  <button class="btn-custom3 me-2 mg-lg-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        class="bi bi-play-fill"
                        viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                      </svg>
                    </button>

                  <button class="btn-custom4 order-1">Following</button>

                  <div class="ms-auto d-lg-none"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-shuffle text-primary d-lg-none flex-grow-2 " viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
</svg>

</div>
                <p class="text-white rotazione fs-1 ms-3 ms-lg-0 clicclabile"><i class="bi bi-three-dots"></i></p>        
                
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
              <div><p class="text-white mb-1">Hai messo MI piace a <span id="">x</span> brani</p> 
              <div><p class="text-secondary2 fs-7">${data.name}</p></div></div>
           
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
        <div class="col-xl-2 ms-xl-0 ms-5 ps-4 text-secondary2 spostamento  ">${
          track.rank
        }</div> 
        <div class="col-xl-2 d-none d-xl-block ps-5 text-secondary2">${new Date(
          track.duration * 1000
        )
          .toISOString()
          .substring(14, 19)}</div> 
      </div>
     

      
    `
      )
      .join("")}

      <div>
          <h6 class="my-lg-3 my-2 text-secondary2 clicclabile">Visualizza altro</h6>
      </div>
      
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
