const searchBtn = document.querySelector("#search_btn");
const searchBox = document.querySelector("#search_box");
const simpleBtn = document.querySelector(".simple_btn");

//* showing result
const showingResults = (receivedData, titles, singers, buttons) => {
  for (i = 0; i < titles.length; i++) {
    const songTitle = titles[i];
    const singer = singers[i];
    const lyricsButton = buttons[i];

    songTitle.innerText = receivedData.data[i].title;
    singer.innerText = receivedData.data[i].artist.name;

    lyricsButton.setAttribute("data-title", `${songTitle.innerText}`);
    lyricsButton.setAttribute("data-singer", `${singer.innerText}`);
  }
};

//* showing lyrics
const showingLyrics = (singer, title, lyricsContainer, heading) => {
  fetch(`https://api.lyrics.ovh/v1/${singer}/${title}`)
    .then((response) => response.json())
    .then((data) => {
      lyricsContainer.innerText = data.lyrics;
      heading.innerText = `${title}--${singer}`;
    });
};

searchBtn.addEventListener("click", () => {
  const searchValue = searchBox.value;
  //*simple results declaration
  const songTitles = document.querySelectorAll(".song_title");
  const singers = document.querySelectorAll(".singer");
  const lyricsButtons = document.querySelectorAll(".getting_lyrics_btn");
  //* fancy results declaretion
  const fancyLyricsButtons = document.querySelectorAll(".fancy_lyrics_button");
  const fancyLyricsNames = document.querySelectorAll(".fancy_lyrics_names");
  const fancySingers = document.querySelectorAll(".fancy_singers");

  fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      showingResults(data, songTitles, singers, lyricsButtons);
      showingResults(data, fancyLyricsNames, fancySingers, fancyLyricsButtons);
    });
});

simpleBtn.addEventListener("click", (e) => {
  const targetBtn = e.target;
  if (!targetBtn.matches("button")) return;
  const lyrics = document.querySelector(".lyrics");
  const lyricsHeading = document.querySelector(".lyrics_heading");
  const dataTitleAttribute = targetBtn.getAttribute("data-title");
  const dataSingerAttribute = targetBtn.getAttribute("data-singer");
  showingLyrics(dataSingerAttribute, dataTitleAttribute, lyrics, lyricsHeading);
});

//*/ fancy result started
const fancyButton = document.querySelector("#fancy_button");
const fancyLyricsButtons = document.querySelectorAll(".fancy_lyrics_button");
const fancyLyricsNames = document.querySelectorAll(".fancy_lyrics_names");
const fancySingers = document.querySelectorAll(".fancy_singers");
const fancyLyricsHeading = document.querySelectorAll(".fancy_lyrics_heading");
const fancyLyrics = document.querySelectorAll(".fancy_lyrics");

// console.log(fancyButton);
// console.log(fancyLyricsButtons);
// console.log(fancyLyricsNames);
// console.log(fancySingers);
// console.log(fancyLyricsHeading);
// console.log(fancyLyrics);

for (let i = 0; i < fancyLyricsButtons.length; i++) {
  const fancyLyricsButton = fancyLyricsButtons[i];
  const fancySingleLyrics = fancyLyrics[i];
  const fancySingleHeading = fancyLyricsHeading[i];
  fancyLyricsButton.addEventListener("click", (e) => {
    const targetButton = e.target;
    const fancyTitle = targetButton.getAttribute("data-title");
    const fancySinger = targetButton.getAttribute("data-singer");
    showingLyrics(
      fancySinger,
      fancyTitle,
      fancySingleLyrics,
      fancySingleHeading
    );
  });
}
