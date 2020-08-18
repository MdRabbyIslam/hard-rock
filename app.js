const searchBtn_button = document.querySelector("#search_btn");
const searchBox_input = document.querySelector("#search_box");
const songTitles_strong = document.querySelectorAll(".song_title");
const singers_span = document.querySelectorAll(".singer");
const lyricsButtons_button = document.querySelectorAll(".getting_lyrics_btn");
const lyrics_pre = document.querySelector(".lyrics");
const lyricsheading_h2 = document.querySelector(".lyrics_heading");
const simpleBtn_div = document.querySelector(".simple_btn");

//* showing result
function showingResult(receivedData) {
  for (i = 0; i < songTitles_strong.length; i++) {
    const songTitle = songTitles_strong[i];
    const singer = singers_span[i];
    const lyricsButton = lyricsButtons_button[i];

    songTitle.innerText = receivedData.data[i].title;
    singer.innerText = receivedData.data[i].artist.name;

    lyricsButton.setAttribute("data-title", `${songTitle.innerText}`);
    lyricsButton.setAttribute("data-singer", `${singer.innerText}`);
  }
}

//* showing lyrics
function showingLyrics(singer, title) {
  fetch(`https://api.lyrics.ovh/v1/${singer}/${title}`)
    .then((response) => response.json())
    .then((data) => {
      lyrics_pre.innerText = data.lyrics;
      lyricsheading_h2.innerText = `${title}--${singer}`;
    });
}

searchBtn_button.addEventListener("click", () => {
  const searchValue = searchBox_input.value;
  fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      showingResult(data);
    });
});

simpleBtn_div.addEventListener("click", (e) => {
  const targetBtn = e.target;
  const dataTitleAttribute = targetBtn.getAttribute("data-title");
  const dataSingerAttribute = targetBtn.getAttribute("data-singer");
  if (!targetBtn.matches("button")) return;
  showingLyrics(dataSingerAttribute, dataTitleAttribute);
});
