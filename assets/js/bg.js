document.addEventListener("DOMContentLoaded", function () {
  var image1 = new Image();
  var image2 = new Image();
  const bgs = [
    {
      type: "image",
      src: "./assets/images/original-1.png",
    },
    {
      type: "video",
      src: "./assets/video/original.mp4",
    },
    {
      type: "image",
      src: "./assets/images/original.png",
    },
  ];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async function preloadBgs() {
    image1.src = bgs[0].src;
    image2.src = bgs[2].src;
    var req = new XMLHttpRequest();
    req.open("GET", bgs[1].src, true);
    req.responseType = "blob";
    req.onload = function () {
      if (req.status === 200) {
        var videoBlob = this.response;
        URL.createObjectURL(videoBlob);
      }
    };
    req.send();
  }
  async function setbg() {
    await preloadBgs();
    const num = getRandomNumber(0, 2);
    const bg = bgs[num];
    if (bg.type === "video") {
      document.getElementById("myVideo").style.display = "block";
    } else {
      document.body.style.backgroundImage = `url(${bg.src})`;
    }
  }

  setbg();
});
