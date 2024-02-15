class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      
      <style>
        nav {
          font-family: "Archivo", sans-serif;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: black;
        }
        
        img {
          max-height: 60px;
          width: auto;
        }
        ul {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          list-style: none;
          margin-right:"5px";
        }
        li {
          margin: 0 25px;
        }
        a {
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          position: relative;
        }
        a::after {
          content: '';
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #fff;
          transition: width 0.3s ease;
        }
        a:hover::after {
          width: 100%;
        }
        .hamburger-menu {
          display: none; 
        }
        @media (max-width: 768px) {
          ul {
            display: none;
          }
          .hamburger-menu {
            display: block; 
          }
        }
      </style>
      <header>
        <nav>
          <img src="./astrowold.png">
          <ul class="nav-links">
            <li><a href="./home.html">Home</a></li>
            <li><a href="./astronauts.html">Astronauts</a></li>
            <li><a href="./spaceships.html">Spaceships</a></li>
            <li><a href="./agencies.html">Agencies</a></li>
            <li><a href="./contact.html">Contact</a></li>
            <div id="google_translate_element"></div>
           
          </ul>
          <div class="hamburger-menu">&#9776;</div>
        </nav>
      </header>
    `;

    const hamburgerMenu = this.querySelector(".hamburger-menu");
    const navLinks = this.querySelector(".nav-links");
    hamburgerMenu.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "block" ? "none" : "block";
    });

    // Google Translate API integration
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);

    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }
}

customElements.define("custom-navbar", Navbar);
