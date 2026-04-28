// logic untuk sidebar navigation


// logic untuk bottom naviagation
const items = document.querySelectorAll(".list");

items.forEach(item => {
  item.addEventListener("click", function () {

    // hapus semua active
    items.forEach(i => {
      i.classList.remove("active");

      // reset icon ke non-active
      const img = i.querySelector("img");
      img.src = img.src.replace("-active", "");
    });

    // set active ke yg diklik
    this.classList.add("active");

    // ubah icon jadi active
    const img = this.querySelector("img");
    if (!img.src.includes("-active")) {
      img.src = img.src.replace(".png", "-active.png");
    }
  });
});