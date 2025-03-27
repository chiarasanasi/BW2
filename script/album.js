const deezerUrl = "https://striveschool-api.herokuapp.com/api/deezer"
const album = "album"

const URLparameters = new URLSearchParams(location.search)
const albumId = URLparameters.get("id")

if (!albumId) {
  console.log("ID dell'album mancante nell'URL")
} else {
  console.log("ID ALBUM", albumId)
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

      //identifichiamo elementi dell'HTML della parte alta della pagina
      const albumTitle = document.getElementById("album-title")
      const artistName = document.getElementById("artist")
      const artistId = data.artist.id
      console.log("ARTISTI ID -->", artistId)

      artistName.setAttribute("href", `./artist.html?id=${artistId}`)
      const albumCover = document.getElementById("cover-album")
      const albumTime = document.getElementById("time")

      albumTitle.innerText = data.title
      artistName.innerText = data.artist.name
      albumCover.setAttribute("src", data.cover_medium)
      albumTime.innerText = data.duration + " min"

      //FUNZIONE PER CALCOLARE LA MEDIA DEI COLORI DELLA COVER DELL'ALBUM

      //con il getColor si prende il colore più preponderante
      //con il getPalette ti ridà un array con una palette di tot colori. io ho pre
      const getColorBg = function () {
        const colorBox = document.getElementById("album-details")

        const colorThief = new ColorThief()
        if (albumCover.complete) {
          setColor()
        } else {
          albumCover.addEventListener("load", setColor)
        }

        function setColor() {
          const dominantColor = colorThief.getPalette(albumCover)
          console.log("DOMINANT COLOR -->", dominantColor)

          const color = dominantColor[2] // Primo colore dominante
          colorBox.style.background = `linear-gradient(0deg, rgba(23, 23, 23,1) 65%, rgba(${color[0]},${color[1]},${color[2]},1) 100%)`
        }
      }
      getColorBg()

      //identifichiamo elementi dell'HTML della lista di brani
      const tracce = document.getElementById("tracks")

      const tracklistTitle = [] //tracklist vuota
      const tracklistNumber = []
      const tracklistTime = []
      console.log("TRACKLIST VUOTA -->", tracklistTitle)
      console.log("TRACKLISTNUMBERS VUOTA -->", tracklistNumber)
      console.log("TRACKLISTTIME VUOTA -->", tracklistTime)

      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
      }

      data.tracks.data.forEach((song, i) => {
        tracklistTitle.push(song.title)
        tracklistNumber.push(i + 1)
        tracklistTime.push(formatTime(song.duration))
        const artistTrackId = song.artist.id

        //riempiamo il div con id tracks
        tracce.innerHTML =
          tracce.innerHTML +
          `<div class="row align-content-center my-3">
                <div class="col-1" >${tracklistNumber[i]}</div>
                <div class="d-flex flex-column col-5">
                  <div class="fw-semibold">${tracklistTitle[i]}</div>
                  <a class="text-secondary-emphasis text-decoration-none" href="./artist.html?id=${artistTrackId}">${artistName.innerText}</a>
                </div>

                <div class="col-6 d-flex justify-content-end" >
                  ${tracklistTime[i]}
                </div>`
      })
      console.log("TRACKLIST PIENA -->", tracklistTitle) //tracklist piena
      console.log("TRACKLISTNUMBERS PIENA -->", tracklistNumber) //tracklist piena
      console.log("TRACKLISTTIME PIENA -->", tracklistTime) //tracklist piena
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI ALBUM", err)
    })
}
getAlbumPage()
