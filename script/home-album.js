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
        // console.log("DATA", data)

        //prendo un numero randomi da 0 a 25 perchè ho notato che gli array delle canzoni sono sempre da 25, e per non prendere sempre la prima pensavo di prendere in maniera randomica così da rendere il  tutto più dinamico

        const randomTrackIndex = Math.floor(Math.random() * 25)
        console.log(randomTrackIndex)
        albumID = data.data[randomTrackIndex].album.id
        albumTitle = data.data[randomTrackIndex].album.title
        albumArtist = data.data[randomTrackIndex].artist.name

        console.log(
          `ALBUM TITLE : ${albumTitle}, ALBUM ID : ${albumID}, ARIST NAME : ${albumArtist}`
        )
        return albumID, albumTitle, albumArtist
      })

      .catch((err) => {
        console.log("Errore", err)
      })
  })
}
getAlbumCard()
