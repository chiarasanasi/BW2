
const deezerUrl = "https://striveschool-api.herokuapp.com/api/deezer"
const album = "album"

const URLparameters = new URLSearchParams(location.search)
const albumId = URLparameters.get("id")

if (!albumId) {
  console.log("ID dell'album mancante nell'URL")
} else {
  console.log("ID ALBUM", albumId)
}

//FUNZIONE PER CALCOLARE LA MEDIA DEI COLORI DELLA COVER DELL'ALBUM
const getColorBg = function (albumCover, albumTitle) {
  // const colorThief = new ColorThief()
  console.log(albumCover)
  // if (albumCover.complete) {
  //   const dominantColor = colorThief.getColor(albumCover)
  //   console.log(
  //     `QUESTO E' IL COLORE PREDOMINANTE DELLA COVER DELL'ALBUM ${albumTitle} -->${dominantColor}`
  //   )
  //   // Puoi usare il colore per cambiare lo sfondo o fare altre cose
  // } else {
  //   albumCover.addEventListener("load", function () {
  //     const dominantColor = colorThief.getColor(albumCover)
  //     console.log(
  //       `QUESTO E' IL COLORE PREDOMINANTE DELLA COVER DELL'ALBUM ${albumTitle} -->${dominantColor}`
  //     )
  //   })
  // }
}

const getAlbumPage = function () {
  fetch(deezerUrl + "/" + album + "/" + albumId)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dell'album")
      }
    })
    .then((data) => {
      console.log("DATI DELL'ALBUM", data)

      //identifichiamo elementi dell'HTML
      const albumTitle = document.getElementById("album-title")
      const artistName = document.getElementById("artist")
      const albumCover = document.getElementById("cover-album")
      const albumTime = document.getElementById("time")

      //mettere la media del colore della cover dell'album come bg
      //viene usato COLOR-THIEF una libreria che ho messo negli script in fondo al body del file album2.html

      albumTitle.innerText = data.title
      artistName.innerText = data.artist.name
      albumCover.setAttribute("src", data.cover_medium)
      albumTime.innerText = data.duration + " min"
      getColorBg()
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI CONCERTO", err)
    })
}
getAlbumPage()
