const deezerUrl = "https://striveschool-api.herokuapp.com/api/deezer"
const album = "album"
const search = "search"

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
      albumCover.setAttribute("src", data.cover_xl)
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

      //FUNZIONE PER TRASFORMARE SECONDI IN MINUTI
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
      }

      //FUNZIONE PER CREARE LA LISTA DI CANZONI PRESENTE NELL'ALBUM CORRENTE
      data.tracks.data.forEach((song, i) => {
        tracklistTitle.push(song.title)
        tracklistNumber.push(i + 1)
        tracklistTime.push(formatTime(song.duration))
        const artistTrackId = song.artist.id
        const trackAudio = song.preview

        tracce.innerHTML += `
          <div class="row align-content-center my-3 div-tracks">
            <a class="col-1 px-2 numero-play text-decoration-none text-white-50 position-relative">
              ${tracklistNumber[i]}
              <button class="btn-custom3small d-none numero-play-button position-absolute" style="left: 0px; top: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </button>
            </a>
      
            <div class="d-flex flex-column col-5 px-3">
              <div class="fw-semibold tracklisttitolo">${tracklistTitle[i]}</div>
              <a class="text-white-50 text-decoration-none" href="./artist.html?id=${artistTrackId}">${song.artist.name}</a>
            </div>
      
            <div class="col-6 d-flex justify-content-end">${tracklistTime[i]}</div>
            
          </div>
        `

        // songTitlePlayNav.innerText = song.title
        // artistNamePlayNav.innerText = song.artist.name
        // durationTimePlayNav.innerText = formatTime(song.duration)

        // const divTracks = document.querySelectorAll(".div-tracks")
        // console.log(divTracks)
        // divTracks.forEach((elemento) => {
        //   const button = elemento.querySelector(".numero-play-button")
        //   //console.log("QUESTO è IL BOTTONE VERDE DEL PLAY", button)
        //   const audio = document.querySelectorAll("audio")
        // })
      })
      setTimeout(() => {
        //FUNZIONE PER FAR APPARIRE IL PLAY VERDE
        const numeroPlay = document.querySelectorAll(".numero-play")
        const albumCoverPlayNav = document.getElementById("albumcover-playnav")

        numeroPlay.forEach((numero) => {
          numero.addEventListener("mouseenter", () => {
            const button = numero.querySelector(".numero-play-button")
            if (button) {
              button.classList.toggle("d-none")
            }
          })
          numero.addEventListener("mouseleave", () => {
            const button = numero.querySelector(".numero-play-button")
            if (button) {
              button.classList.toggle("d-none")
            }
          })
        })

        albumCoverPlayNav.setAttribute("src", `${data.cover_xl}`)
        const audioPlayer = document.getElementById("audio-player")
        const buttonsPlay = document.querySelectorAll(".numero-play-button")
        console.log(buttonsPlay)

        // const getBranoName = function () {
        //   fetch(
        //     deezerUrl +
        //       "/" +
        //       search +
        //       "?q=" +
        //       `${button.parentElement.parentElement.children[1].children[0].innerText}`
        //   )
        //     .then((response) => {
        //       if (response.ok) {
        //         return response.json()
        //       } else {
        //         throw new Error("Errore nel recupero dell'album")
        //       }
        //     })
        //     .then((data) => {
        //       console.log("DATI DELL'ALBUM", data)
        //       //console.log(audioPlayer)
        //       if (audioPlayer.pause) {
        //         const navPlayer = document.getElementById("nav-player")
        //         navPlayer.classList.remove("d-none")
        //         audioPlayer.removeAttribute("src")

        //         //cambio i dati della navbar in base al brano che è in PLAY
        //         const albumCoverPlayNav =
        //           document.getElementById("albumcover-playnav")
        //         const songTitlePlayNav =
        //           document.getElementById("songTitle-playnav")
        //         const artistNamePlayNav =
        //           document.getElementById("artistname-playnav")
        //         const currentTimePlayNav = audioPlayer.currentTime
        //         const durationTimePlayNav =
        //           document.getElementById("duration-time")
        //         const numeroPlay = document.querySelectorAll(".numero-play")

        //         const progressBar = document.getElementById("progressbar")

        //         audioPlayer.addEventListener("loadedmetadata", () => {
        //           progressBar.max = audioPlayer.duration
        //         })

        //         audioPlayer.addEventListener("timeupdate", () => {
        //           progressBar.value = audioPlayer.currentTime
        //         })

        //         progressBar.addEventListener("input", () => {
        //           audioPlayer.currentTime = progressBar
        //         })

        //         albumCoverPlayNav.setAttribute(
        //           "src",
        //           data.data[0].album.cover_xl
        //         )
        //         songTitlePlayNav.innerText = `${data.data[0].title}`
        //         artistNamePlayNav.innerText = `${data.data[0].artist.name}`
        //         durationTimePlayNav.innerText = `${formatTime(
        //           data.data[0].duration
        //         )}`

        //         audioPlayer.setAttribute("src", `${data.data[0].preview}`)
        //         audioPlayer.play()
        //       } else if (!audioPlayer.play) {
        //         audioPlayer.pause()
        //       }
        //     })
        //     .catch((err) => {
        //       console.log("ERRORE", err)
        //     })
        // }

        buttonsPlay.forEach((button) => {
          button.addEventListener("click", () => {
            const getBranoName = function () {
              fetch(
                deezerUrl +
                  "/" +
                  search +
                  "?q=" +
                  `${button.parentElement.parentElement.children[1].children[0].innerText}`
              )
                .then((response) => {
                  if (response.ok) {
                    return response.json()
                  } else {
                    throw new Error("Errore nel recupero dell'album")
                  }
                })
                .then((data) => {
                  console.log("DATI DELL'ALBUM", data)
                  const navPlayer = document.getElementById("nav-player")
                  const navPlayerPlayBtn = document.getElementById(
                    "button-play-bar-play"
                  )
                  const navPlayerPausedBtn = document.getElementById(
                    "button-play-bar-paused"
                  )
                  //console.log(audioPlayer)
                  if (audioPlayer.paused) {
                    console.log("ENTRATI NELL'IF")
                    console.log(audioPlayer.paused)

                    navPlayerPlayBtn.classList.add("d-none")

                    navPlayerPausedBtn.classList.remove("d-none")
                    navPlayer.classList.remove("d-none")
                    audioPlayer.removeAttribute("src")

                    //cambio i dati della navbar in base al brano che è in PLAY
                    const albumCoverPlayNav =
                      document.getElementById("albumcover-playnav")
                    const songTitlePlayNav =
                      document.getElementById("songTitle-playnav")
                    const artistNamePlayNav =
                      document.getElementById("artistname-playnav")
                    const currentTimePlayNav = audioPlayer.currentTime
                    const durationTimePlayNav =
                      document.getElementById("duration-time")
                    const numeroPlay = document.querySelectorAll(".numero-play")

                    const progressBar = document.getElementById("progressbar")

                    audioPlayer.addEventListener("loadedmetadata", () => {
                      progressBar.max = audioPlayer.duration
                    })

                    audioPlayer.addEventListener("timeupdate", () => {
                      progressBar.value = audioPlayer.currentTime
                    })

                    progressBar.addEventListener("input", () => {
                      audioPlayer.currentTime = progressBar
                    })

                    albumCoverPlayNav.setAttribute(
                      "src",
                      data.data[0].album.cover_xl
                    )
                    songTitlePlayNav.innerText = `${data.data[0].title}`
                    artistNamePlayNav.innerText = `${data.data[0].artist.name}`
                    durationTimePlayNav.innerText = `${formatTime(
                      data.data[0].duration
                    )}`

                    audioPlayer.setAttribute("src", `${data.data[0].preview}`)
                    audioPlayer.play()
                  } else {
                    console.log("ENTRATI NELL'ELSE IF")
                    navPlayerPlayBtn.classList.remove("d-none")

                    navPlayerPausedBtn.classList.add("d-none")
                    audioPlayer.removeAttribute(
                      "src",
                      `${data.data[0].preview}`
                    )
                    audioPlayer.pause()
                  }
                })
                .catch((err) => {
                  console.log("ERRORE", err)
                })
            }
            getBranoName()
          })
        })
      }, 300)
      //FUNZIONE PER COLLEGARE IL NUMERO/PLAYBUTTON AL PLAY DELLA TRACCIA AUDIO CORRISPONTE A QUEL BRANO

      console.log("TRACKLIST PIENA -->", tracklistTitle) //tracklist piena
      console.log("TRACKLISTNUMBERS PIENA -->", tracklistNumber) //tracklist piena
      console.log("TRACKLISTTIME PIENA -->", tracklistTime) //tracklist piena
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI ALBUM", err)
    })
}
getAlbumPage()

/* <audio controls style="height: 50px;">
              <source src="${trackAudio}" type="audio/mpeg">
            </audio> */
