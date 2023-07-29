let addCard = document.getElementById("addCard");
let displayCard = document.getElementById("displayCard");
let loadingCard = document.getElementById("loadingCard");
let downloadCard = document.getElementById("downloadCard");
let fileInput = document.getElementById("fileInput");

let activee = (s) => {
  addCard.style.display = "none";
  displayCard.style.display = "none";
  loadingCard.style.display = "none";
  downloadCard.style.display = "none";
  s.style.display = "flex";
};

activee(addCard);
const reader = new FileReader();

fileInput.addEventListener("input", () => {
  console.log(fileInput.files[0]);
  reader.readAsDataURL(fileInput.files[0]);
  reader.onloadend = () => {
    console.log(reader.result);
    document.getElementById("display-img").src = reader.result;
  };
  // activee(loadingCard);
  // setTimeout(3000)
  activee(displayCard);
});
const apiURL = "https://api.remove.bg/v1.0/removebg";
const key = "NT42CJbWUnY6yZd9uwBdFNBV";
//constractor to control the files data not strings
const data = new FormData();

document.getElementById("startBtn").addEventListener("click", () => {
  data.append("image_file", fileInput.files[0]);
  activee(loadingCard);
  fetch(apiURL, {
    method: "post",
    headers: { "X-Api-Key": key },
    body: data,
  }) //blob is the extention of files
    .then((res) => res.blob())
    .then((blob) => {
      console.log(blob);
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        console.log(reader.result);
        document.getElementsByClassName("image-after")[0].src = reader.result;
        //to make it download by the download buttom
        document
          .getElementById("downloadHref")
          .setAttribute("href", reader.result);
      };
      //document.getElementById(image-after).src=
      activee(downloadCard);
    });
});

//upload anthor
document.getElementById("uploadAnother").addEventListener("click", () => {
  activee(addCard);
  window.location.reload();
});

//download
