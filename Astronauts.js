import { BASE_URL } from "./api.js";
const container = document.querySelector(".astronauts-container");
const paginationContainer = document.querySelector(".pagination");
const rocketLoader = document.querySelector(".rocket-loader");
const page1 = document.querySelector(".page-container");
const itemsPerPage = 6;
let currentPage = 1;
let page1ContentAdded = false;
let data = [];

async function fetchData() {
  try {
    rocketLoader.style.display = "block";
    const response = await fetch(`${BASE_URL}/astronaut/?limit=100&offset=9`);
    const responseData = await response.json();
    if (
      responseData &&
      responseData.results &&
      responseData.results.length > 0
    ) {
      data = responseData.results;
      renderPage(currentPage);
      renderPagination();
    }
    rocketLoader.style.display = "none";
  } catch (err) {
    console.log("Error:", err.message);
    rocketLoader.style.display = "none";
  }
}

function renderPage(page) {
  if (!page1ContentAdded) {
    const basic = document.createElement("p");
    const title = document.createElement("p");
    title.textContent = `List of Astronauts`;
    basic.textContent = `Astronauts are highly 
        trained individuals who journey into outer space
        to conduct scientific research, explore new 
        frontiers, and advance our
        understanding of the universe. These courageous men and women undergo
        rigorous physical and mental training to prepare for the challenges of
        space travel, including zero-gravity environments, isolation, and
        potential emergencies. Their missions often involve conducting
        experiments in microgravity, maintaining spacecraft systems, and
        sometimes even spacewalks to repair satellites or the International
        Space Station. Astronauts inspire us with their bravery, dedication to
        exploration, and contributions to expanding humanity's presence beyond
        Earth's atmosphere`;
    title.className = "xl";
    basic.className = "basic-text";
    page1.appendChild(basic);
    page1.appendChild(title);
    page1.appendChild(basic);
    page1.appendChild(title);

    page1ContentAdded = true;
  }

  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = data.slice(start, end);
  pageData.forEach((item) => {
    const card = createAstronautCard(item);
    container.appendChild(card);
  });
}
function renderPagination() {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const firstPageButton = document.createElement("button");
  firstPageButton.textContent = "1";
  firstPageButton.className = "button-1";
  firstPageButton.addEventListener("click", () => {
    currentPage = 1;
    renderPage(currentPage);
  });
  //   paginationContainer.appendChild(firstPageButton);

  const prevPageButton = document.createElement("button");
  prevPageButton.textContent = "Prev";
  prevPageButton.className = "button-1";
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  paginationContainer.appendChild(prevPageButton);

  const lastPageButton = document.createElement("button");
  lastPageButton.textContent = "29";
  lastPageButton.className = "button-1";
  lastPageButton.addEventListener("click", () => {
    currentPage = totalPages;
    renderPage(currentPage);
  });

  const nextPageButton = document.createElement("button");
  nextPageButton.textContent = "Next";
  nextPageButton.className = "button-1";
  nextPageButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  paginationContainer.appendChild(nextPageButton);

  //   paginationContainer.appendChild(lastPageButton);
}
function createAstronautCard(item) {
  const card = document.createElement("div");
  card.className = "astronaut-card";

  const title = document.createElement("h2");
  title.textContent = item.name;

  const age = document.createElement("span");
  const ageText = !item.date_of_death ? ` ${item.age}` : "";
  age.textContent = ageText;
  age.className = "age";
  const nationality = document.createElement("p");
  nationality.textContent = item.nationality;

  const image = document.createElement("img");
  image.className = "profile-picture";
  image.src = item.profile_image;

  const bio = document.createElement("p");
  bio.textContent = item.bio;
  bio.className = "bio";

  const text_container = document.createElement("div");
  text_container.className = "text-container";

  const birthDeath = document.createElement("p");
  birthDeath.className = "birth-death";
  birthDeath.textContent = `${item.date_of_birth}➖${
    item.date_of_death ? item.date_of_death : `Present (${ageText} years )`
  } `;

  const socials = document.createElement("div");
  socials.className = "socials";

  if (item.wiki) {
    const wikiLink = document.createElement("a");
    wikiLink.href = item.wiki;
    wikiLink.target = "_blank";
    const wikiIcon = document.createElement("img");
    wikiIcon.src = "/wikipedia.png";
    wikiLink.appendChild(wikiIcon);
    socials.appendChild(wikiLink);
  }

  if (item.twitter) {
    const twitterLink = document.createElement("a");
    twitterLink.href = item.twitter;
    twitterLink.target = "_blank";
    const twitterIcon = document.createElement("img");
    twitterIcon.src = "./twitter.png";
    twitterLink.appendChild(twitterIcon);
    socials.appendChild(twitterLink);
  }

  if (item.instagram) {
    const instagramLink = document.createElement("a");
    instagramLink.href = item.instagram;
    instagramLink.target = "_blank";
    const instagramIcon = document.createElement("img");
    instagramIcon.src = "./instagram.png";
    instagramLink.appendChild(instagramIcon);
    socials.appendChild(instagramLink);
  }

  card.appendChild(image);
  card.appendChild(title);
  text_container.appendChild(birthDeath);
  card.appendChild(nationality);

  card.appendChild(text_container);
  card.appendChild(bio);
  card.appendChild(socials);

  return card;
}

fetchData();
