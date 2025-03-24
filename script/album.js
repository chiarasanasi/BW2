const deezerUrl = "https://striveschool-api.herokuapp.com/api/deezer"
const search = "search"
const album = "album"
const artist = "artist"
const artista1 = "queen"
let albumID
let albumTitle

const getAlbumID = function () {
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
      albumID = data.data[randomTrackIndex].album.id
      albumTitle = data.data[randomTrackIndex].album.title

      console.log("album ID e title", albumID, albumTitle)
      return albumID, albumTitle
    })

    .catch((err) => {
      console.log("Errore", err)
    })
}
getAlbumID()

setTimeout(() => {
  const createAlbumPage = function () {
    fetch(deezerUrl + "/" + album + "/" + albumID)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella response della tracklistAlbum")
        }
      })
      .then((data) => {
        console.log(
          "Queste sono tutte le canzoni presenti nell'album " +
            albumTitle +
            " con ID " +
            albumID
        )
        data.tracks.data.forEach((song) => {
          console.log(song.title)
        })
      })
      .catch((err) => {
        console.log("Errore", err)
      })
  }
  createAlbumPage()
}, 1000)
