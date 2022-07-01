import { LitElement, html, css, render } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit-html/directives/repeat';

@customElement('toast-component')
export class ToastComponent extends LitElement {
  _innerId=0;
  toastItems: any = [];

  @property()
  position = "top-left";

  @property({type:Number})
  time = 3000;

  firstUpdated(){
    let top="", bottom="", left="", right="";
    if(this.position == "top-left") { top = "10px"; left= "10px"; }
    else if(this.position == "top-right") { top = "10px"; right="10px"; }
    else if(this.position == "bottom-left") { bottom = "10px"; left="10px"}
    else if(this.position == "bottom-right") { bottom = "10px"; right= "10px"}
    
    this.style.zIndex = "99999";
    this.style.position = "sticky";
    this.style.top = top;
    this.style.left = left;
    this.style.right = right;
    this.style.bottom = bottom;

    this.requestUpdate();
  }

  connectedCallback(){
    super.connectedCallback();
    window.addEventListener("toast_message",(e: any)=>{
      console.log("!! RUN EVENT !!", e);
      const type = e.detail.type;
      const text = e.detail.text;
      this.toastItems.push({type: type, text: text});
      this.requestUpdate();
      setTimeout(()=>{this.toastItems.shift(); this.requestUpdate();}, this.time)

      console.log(this.toastItems);
    });
  }

  render(){
    return html`
        ${repeat(this.toastItems, item=>item, (item:any)=>html`<toast-item type=${item.type}>${item.text}</toast-item>`)}
      `;
  }
  
}

@customElement('toast-item')
export class ToastItem extends LitElement {

  static styles = css`
    .default {
      padding: 20px 35px 20px 25px;
      background: #fff;
      box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
    }
    
    @keyframes progress_bar {
      from { width: 100%; } to { width: 0%; }
    }
    
    .progress-bar {
      transform: translateY(-3px);
      border-radius: 12px;
      animation: 3s linear 0s alternate progress_bar;
    }
  `;

  @property()
  type = "info";

  clickRemove(){
    this.style.display = "none";
  }

  render(){
    let render_text = "";
    if(this.type =="success") render_text = "Success";
    else if(this.type =="info") render_text = "Info";
    return html`
      <div style="user-select:none;">
        <div class="default">
          <div style="display:flex; justify-content:space-between">
            <div style="font-size:1em; font-weight:700;">${render_text}</div>
            <div style="cursor:pointer;" @click=${this.clickRemove}> X </div>
          </div>
          <div style="font-size:.9em;"><slot></slot></div>
        </div>
        <div class="progress-bar" style="height:2px; background:#0000ff; width:0%;"></div>
      </div>
    `;
  }
}
