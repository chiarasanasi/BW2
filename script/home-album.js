const deezerUrl = "https://striveschool-api.herokuapp.com/api/deezer"
const search = "search"

const dieciArtisti = [
  "queen",
  "angelinamango",
  "pinguinitatticinucleari",
  "acdc",
  "sigurros",
  "cosmo",
  "fulminacci",
  "billieeilish",
  "videoclub",
  "beatles",
]
let albumID
let albumTitle
let albumArtist
let albumCover

const getAlbumCard = function () {
  dieciArtisti.forEach((artista) => {
    fetch(deezerUrl + "/" + search + "?q=" + artista)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("La RESPONSE non è valida")
        }
      })
      .then((data) => {
        console.log("DATA", data)

        //prendo un numero randomi da 0 a 25 perchè ho notato che gli array delle canzoni sono sempre da 25, e per non prendere sempre la prima pensavo di prendere in maniera randomica così da rendere il  tutto più dinamico

        const randomTrackIndex = Math.floor(Math.random() * 25)
        console.log(randomTrackIndex)
        albumID = data.data[randomTrackIndex].album.id
        albumTitle = data.data[randomTrackIndex].album.title
        albumArtist = data.data[randomTrackIndex].artist.name
        albumCover = data.data[randomTrackIndex].album.cover_medium

        console.log(
          `ALBUM TITLE : ${albumTitle}, ALBUM ID : ${albumID}, ARIST NAME : ${albumArtist}, ALBUM COVER ${albumCover}`
        )

        const albumHome = document.getElementById("album-home")
        const cardAlbum = document.createElement("div")
        cardAlbum.classList.add("card", "border-0", "p-3")
        cardAlbum.innerHTML = `
        <img
                src="${albumCover}"
                class="card-img"
                alt="${albumTitle}-cover"
            
              />
              <div class="card-body py-3 px-0">
                <h5 class="card-title text-white">${albumTitle}</h5>
                <a href="#" class="text-secondary text-decoration-none fs-6"
                  >${albumArtist}</a
                >
              </div>
        `

        albumHome.appendChild(cardAlbum)
      })

      .catch((err) => {
        console.log("Errore", err)
      })
  })
}
getAlbumCard()
