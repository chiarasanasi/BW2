const deezerUrl = "https://striveschool-api.herokuapp.com/api/deezer"
const search = "search"
const album = "album"
const artist = "artist"
const artista1 = "pinguini"

let trackListAlbum

// class ALBUM(title, _cover, _tracklist)
const searchAPI = function () {
  fetch(deezerUrl + "/" + search + "?q=" + artista1)
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
      const albumID = data.data[randomTrackIndex].album.id
      const albumTitle = data.data[randomTrackIndex].album.title
      trackListAlbum = data.data[randomTrackIndex].album.tracklist
      console.log("album ID e title", albumID, albumTitle)
      console.log("Tracklist dell'album", trackListAlbum)
      return albumID, albumTitle, trackListAlbum
    })

    .catch((err) => {
      console.log("Errore", err)
    })
}
searchAPI()

setTimeout(() => {
  console.log("API TRACKLIST fuori dalla funzione searchAPI:", trackListAlbum)

  const createAlbumPage = function () {
    fetch("https://cors-anywhere.herokuapp.com/" + trackListAlbum)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella response della tracklistAlbum")
        }
      })
      .then((data) => {
        console.log("DATA TRACKLIST", data)
      })
      .catch((err) => {
        console.log("Errore", err)
      })
  }
  createAlbumPage()
}, 1000)
