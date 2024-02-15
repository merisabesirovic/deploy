import { BASE_URL } from "./api.js";

const container = document.querySelector(".group");
const wrapper = document.querySelector(".wrapper");

const rocketLoader = document.querySelector(".rocket-loader");

let searchAppended = false;

async function fetchData(searchQuery = "") {
  try {
    rocketLoader.style.display = "block";
    console.log(BASE_URL);
    const response = await fetch(`${BASE_URL}/agencies?search=${searchQuery}`);
    const responseData = await response.json();
    console.log(responseData);
    if (
      responseData &&
      responseData.results &&
      responseData.results.length > 0
    ) {
      renderAgencies(responseData.results);
      if (!searchAppended) {
        renderSearchInput();
        searchAppended = true;
      }
    }
    rocketLoader.style.display = "none";
  } catch (err) {
    console.log("Error:", err.message);
    rocketLoader.style.display = "none";
  }
}

function renderAgencies(agencies) {
  container.innerHTML = "";

  agencies.forEach((agency) => {
    const card = createAgencyCard(agency);
    container.appendChild(card);
  });
}

function renderSearchInput() {
  const searchInput = document.createElement("input");
  const searchBox = document.createElement("div");
  searchBox.className = "search";
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("id", "searchInput");
  searchInput.setAttribute("placeholder", "Browse more or filter agencies...");
  const searchButton = document.createElement("button");

  if (window.innerWidth <= 768) {
    searchButton.textContent = "🔍";
  } else {
    searchButton.textContent = "Search";
  }

  searchButton.addEventListener("click", searchAgencies);
  searchButton.className = "button-2";

  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);
  wrapper.appendChild(searchBox);
}

function createAgencyCard(agency) {
  const card = document.createElement("div");
  card.className = "astronaut-card";
  const title = document.createElement("h2");
  title.textContent = agency.name;
  title.className = "title";
  card.appendChild(title);

  const logo = document.createElement("img");
  logo.className = "profile-picture";
  logo.src = agency.logo_url;
  const altText = document.createElement("p");
  altText.textContent = "No picture available";
  altText.className = "alt";
  agency.logo_url ? card.appendChild(logo) : card.appendChild(altText);

  const agencyBox = document.createElement("div");
  agencyBox.className = "agency-box";

  const description = document.createElement("p");
  description.textContent = agency.description
    ? agency.description
    : `Space agencies are organizations dedicated to the exploration, research, and utilization of outer space. These agencies play a crucial role in advancing our understanding of the universe, developing technologies for space exploration, and fostering international cooperation in space endeavors. From launching satellites for communication and scientific research to sending humans beyond Earth's atmosphere, space agencies push the boundaries of human knowledge and capability. They engage in missions to study planets, moons, stars, and other celestial bodies, unraveling the mysteries of the cosmos. With a blend of cutting-edge technology, scientific expertise, and global collaboration, space agencies inspire generations and pave the way for humanity's future in space exploration and discovery.`;
  description.className = "bio";
  card.appendChild(description);

  const launchers = document.createElement("p");
  launchers.textContent = `Launchers: ${
    agency.launchers ? agency.launchers : "No data"
  }`;
  launchers.className = "age";
  agencyBox.appendChild(launchers);

  const countryCode = document.createElement("p");
  countryCode.textContent = `Country Code: ${
    agency.country_code ? agency.country_code : "No data"
  }`;
  countryCode.className = "age";
  agencyBox.appendChild(countryCode);

  const administrator = document.createElement("p");
  administrator.textContent = `Administrator: ${
    agency.administrator ? agency.administrator : "No data"
  }`;
  administrator.className = "age";
  agencyBox.appendChild(administrator);

  const foundingYear = document.createElement("p");
  foundingYear.textContent = `Founding Year: ${
    agency.founding_year ? agency.founding_year : "No data"
  }`;
  foundingYear.className = "age";
  agencyBox.appendChild(foundingYear);

  const type = document.createElement("p");
  type.textContent = `Type: ${agency.type ? agency.type : "No data"}`;
  type.className = "age";
  agencyBox.appendChild(type);

  card.appendChild(agencyBox);
  return card;
}

function searchAgencies() {
  const searchInput = document.getElementById("searchInput");
  const searchQuery = searchInput.value.trim();
  console.log(searchQuery);
  fetchData(searchQuery);
}

fetchData();
