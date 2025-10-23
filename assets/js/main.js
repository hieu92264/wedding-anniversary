$(document).ready(function () {
  const images = [
    "assets/images/story2/anh14.jpg",
    "assets/images/story2/anh12.jpg",
    "assets/images/story2/anh16.jpg",
    "assets/images/story2/anh21.jpg",
    "assets/images/story2/anh17.jpg",
    "assets/images/story2/anh24.jpg",
    "assets/images/story2/anh18.jpg",
    "assets/images/story2/anh19.jpg",
    "assets/images/story2/anh20.jpg",
    "assets/images/story2/anh21.jpg",
    "assets/images/story2/anh22.jpg",
    "assets/images/story2/anh31.jpg",
    "assets/images/story2/anh33.jpg",
    "assets/images/story2/anh39.jpg",
    "assets/images/story2/anh41.jpg",
    "assets/images/story2/anh1.jpg",
    "assets/images/story2/anh2.jpg",
    "assets/images/story2/anh3.jpg",
    "assets/images/story2/anh4.jpg",
    "assets/images/story2/anh6.jpg",
    "assets/images/story2/anh7.jpg",
    "assets/images/story2/anh8.jpg",
    "assets/images/story2/anh45.jpg",
  ];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const shuffledImages = shuffle(images);
  const $container = $("#galleryContainer").addClass("carousel");

  // Thêm ảnh và dots
  $.each(shuffledImages, function (i, src) {
    const $img = $("<img>", {
      src,
      alt: "Our memory",
      class: i === 0 ? "active" : "",
    });
    $container.append($img);
  });

  $container.append(`
      <button class="nav-btn prev-btn">&#10094;</button>
      <button class="nav-btn next-btn">&#10095;</button>
      <div class="dots"></div>
    `);

  const $images = $container.find("img");
  const $dots = $container.find(".dots");

  $.each(shuffledImages, function (i) {
    $dots.append(
      `<div class="dot ${i === 0 ? "active" : ""}" data-index="${i}"></div>`
    );
  });

  let current = 0;
  const total = $images.length;

  function showImage(index) {
    $images.removeClass("active").eq(index).addClass("active");
    $dots.find(".dot").removeClass("active").eq(index).addClass("active");
    current = index;
  }

  // Tự động chạy
  let timer = setInterval(nextImage, 4000);

  function nextImage() {
    const next = (current + 1) % total;
    showImage(next);
  }

  function prevImage() {
    const prev = (current - 1 + total) % total;
    showImage(prev);
  }

  // Nút điều hướng
  $container.on("click", ".next-btn", function () {
    clearInterval(timer);
    nextImage();
    timer = setInterval(nextImage, 4000);
  });

  $container.on("click", ".prev-btn", function () {
    clearInterval(timer);
    prevImage();
    timer = setInterval(nextImage, 4000);
  });

  // Chuyển ảnh khi click dot
  $dots.on("click", ".dot", function () {
    clearInterval(timer);
    const index = $(this).data("index");
    showImage(index);
    timer = setInterval(nextImage, 4000);
  });
});
