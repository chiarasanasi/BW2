const deezerUrl = "https://striveschool-api.herokuapp.com/api/deezer"
const search = "search"

const artisti = [
  "queen",
  "madonna",
  "gorillaz",
  "beatles",
  "eminem",
  "billieeilish",
  "lordes",
  "greenday",
]

const getAlbumCard = function () {
  artisti.forEach((artista) => {
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
        let albumId
        let albumTitle
        let albumArtist
        let albumCover
        let artistID
        //prendo un numero randomi da 0 a 25 perchè ho notato che gli array delle canzoni sono sempre da 25, e per non prendere sempre la prima pensavo di prendere in maniera randomica così da rendere il  tutto più dinamico

        // const randomTrackIndex = Math.floor(Math.random() * 25)
        // console.log(randomTrackIndex)

        albumTitle = data.data[1].album.title
        albumId = data.data[1].album.id
        albumArtist = data.data[1].artist.name
        albumCover = data.data[1].album.cover_medium
        artistID = data.data[1].artist.id

        console.log(
          `ALBUM TITLE : ${albumTitle}, ALBUM ID : ${albumId}, ARIST NAME : ${albumArtist}, ALBUM COVER ${albumCover}`
        )

        const albumHome = document.getElementById("album-home")
        const cardAlbum = document.createElement("div")
        cardAlbum.classList.add(
          "card",
          "border-0",
          "p-3",
          "col-xl-3",
          "col-lg-4",
          "col-md-6",
          "col-12"
        )
        cardAlbum.innerHTML = `
        <img
                src="${albumCover}"
                class="card-img"
                alt="${albumTitle}-cover"
            
              />
              <div class="card-body py-3 px-0">
                <a class="card-title text-white text-decoration-none fs-5 fw-semibold d-block" href="./album2.html?id=${albumId}">${albumTitle}</a>
                <a href="./artist.html?id=${artistID}" class="text-secondary text-decoration-none fs-6"
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
