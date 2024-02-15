class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
         nav{
            background-color:black;
            height:70px;
            width:100%;
            display:flex;
            align-items:center;
            z-index: 10;
            
         }
         img{
            max-height:60px;
            width:auto;
         }

        </style>
        <header>
          <nav>
          <img src="./astrowold.png">
          </nav>
        </header>
      `;
  }
}

customElements.define("header-component", Header);
