import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('modal-component')
export class URLShortnerModal extends LitElement {

  @property()
  maxwidth = "680px";
  @property()
  minWidth = "680px";
  @property()
  maxHeight= "540px";
  @property()
  minHeight = "540px";

  @property()
  url = "";
  @property()
  _visiable = false;
  @property()
  _option = false;
  @property()
  _inputUrl = false;
  @property()
  _urlFocus = false;
  @property()
  type = "direct";
  @property({type: Boolean})
  hideButton = false;

  @property()
  titleName = "Default";
  @property()
  buttonName = "Default"

  static styles = css`
    .input-none:focus{
      outline:none;
      text-decoration: none !important;
    }
    .input-none{
      border: none;
      text-decoration: none;
      background: none;
    }
    .input-none::placeholder {
      color: #777;
    }
    .input-active{
      border-color: rgba(110, 0, 255, .5) !important;
      box-shadow: inset 0 1px 1px rgb(31 45 61 / 8%), 0 0 20px rgb(110 0 255 / 10%);
    }
    .a-none {
      color: inherit;
      text-decoration: none;
    }
    .custom-button{
      display:flex; padding:10px 15px 10px 15px; 
      height:30px; 
      box-sizing:border-box; 
      align-items:center;
      justify-content:center;
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
    .link-button {
      padding: 4px 16px 4px 16px;
      color: #fff;
      cursor: pointer;
      background: #ff4081;
      border: 1px solid rgba(0,0,0,.12);
      border-radius: 5px;
    }
    .link-button:hover {
      background: #d6336a;
    }
    .no-visible {
      height: 0px;
      visibility: hidden;
      transform: scaleX(.8) scaleY(.8) translateY(-50px);
    }
    .modal-animation {
      opacity: 1;
      transition: visibility 0.2s linear, opacity 0.2s linear, transform 0.2s linear;
    }
    .draw-animation {
      transition: visibility 0.2s linear, height 0.2s linear;
    }
    .no-visible.modal-animation {
      opacity:0;
    }
    .option-description {
      min-height: 85px;
    }
  `;


  closeClick(){
    this._visiable = false;
  }

  openClick = () => this._visiable = true;

  render(){     
    return html`
      ${!this.hideButton ? html`
        <div @click=${this.openClick} class="link-button" style="text-align:center;">
          ${this.buttonName}
        </div>
      ` : ``}

      <!--  Modal  -->
      <div class="${this._visiable ? '': 'no-visible'} modal-animation" style="display:inline; position:fixed; top:100px; z-index: 9999; min-width:${this.minWidth}; max-width:${this.maxwidth}; max-height:${this.maxHeight}; justify-content:center; left:50%; transform:translateX(-50%); overflow:auto;" tabindex="-1">
        <div class="" style="background: #fff; border: 1px solid #efefef; border-radius: 8px; padding: 14px 32px 14px 32px; ">

          <!--  Modal Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <span style="font-size: 1m; font-weight:700; color:black;">${this.titleName}</span>
            <img @click=${this.closeClick} src="/static/img/xmark-solid.svg" style="width:12px; cursor:pointer;">
          </div> 

          <slot></slot>

        </div>
      </div>

      <!-- Modal Background  -->
      <div @click=${this.closeClick} class="${this._visiable ? '': 'no-visible'}" style="width:100%; height:100%; position:fixed; background:rgba(0,0,0, .5);left:0;top:0;z-index: 999;"></div>
    `;
  }

  firstUpdated(){
    window.addEventListener("show_modal", (e:any)=>{
      if(e.detail.id == this.id){
        this.openClick();
      }
    })
    this.addEventListener("modal_close", (e:any)=>{
      this.closeClick();
      return e.stopPropagation();
    })
  }
  
}