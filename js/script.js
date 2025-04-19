(function drawProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    let productContainer = document.querySelector("#productContainer");
  
    let ProductsUi = products.map((item, index) => {
      let images = Array.isArray(item.imgUrl) ? item.imgUrl : [item.imgUrl];
      let carouselItems = images
        .map(
          (img, i) => `
          <div class="carousel-item ${i === 0 ? "active" : ""}">
            <img src="${img}" class="d-block w-100" style="height:300px; object-fit:fill;" alt="Product image">
          </div>
        `
        )
        .join("");
  
      let carouselId = `carousel-${index}`;
  
      return `
        <div class="col">
          <div class="card product-card" data-index="${index}">
            <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${carouselItems}
              </div>
              <button class="carousel-control-prev carousel-nav" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button class="carousel-control-next carousel-nav" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
            <div class="card-body">
              <h5 class="card-title fs-4 text-center">${item.title}</h5>
              <p class="card-text text-center">${item.size}</p>
              <p class="card-price fs-3 fw-bold text-center">${item.price} L.E</p>
            </div>
          </div>
        </div>
      `;
    });
  
    productContainer.innerHTML = ProductsUi.join("");
  
    // Make product card clickable
    document.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", function () {
        const index = this.dataset.index;
        localStorage.setItem("selectedProduct", index);
        window.location.href = "product.html";
      });
    });
  
    // Prevent carousel buttons from bubbling up the click
    document.querySelectorAll(".carousel-nav").forEach(btn => {
      btn.addEventListener("click", e => e.stopPropagation());
    });
  })();
  