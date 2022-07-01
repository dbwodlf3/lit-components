import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('button-component')
export class ButtonComponent extends LitElement {

  @property()
  label = "None";
  
  /* medium */
  @property()
  size = "";

  /** purple, red, blue*/
  @property()
  color="default";

  @property()
  active = false;

  @property()
  hover = false;

  @query("#Button")
  buttonElement!:HTMLElement;

  static styles = css`
    .custom-button{
      display:flex; padding:10px 15px 10px 15px; 
      height:30px; 
      box-sizing:border-box; 
      align-items:center;
      border:1px solid rgba(0,0,0,.12); font-size:.75em; box-shadow: 0 1px 2px 0 rgb(0 0 0 / .05); background:#fff;
      user-select:none; cursor:pointer;

      transition: color, background 0.05s ease;
    }
    .custom-button-active{
      background:#00c73c;
      color:white; font-weight:bold;
    }
    .custom-button:hover{
      color:white;
      background:#6129a2;
    }
    .color-purple{
      background:#6129a2;
      color: #fff;
    }
    .color-purple:hover {
      color:#fff;
      background:#56258f;
    }
    .color-red{
      color:#fff;
      background-color: #ff4081;
    }
    .color-red:hover{
      background-color: #ff0a5d;
    }
    .color-blue{
      background: #0075ff;
      color:#fff;
    }
    .color-blue:hover{
      background: #004ba2;
    }
    .medium {
      font-size: 1.2em;
      padding: 20px 40px 20px 40px;
    }
  `;

  render(){
    return html`
      <div style="display:flex; align-items:center;">
        <span id="Button" class="custom-button ${this.active ? "custom-button-active": ""} color-${this.color} ${this.size}">${this.label}</span>
      </div>
    `;
  }
  
}
