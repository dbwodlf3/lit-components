import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

@customElement('input-img')
export class CustomImgInputComponent extends LitElement {
  static styles? = css`
    .custom-button{
      display:flex; padding:10px 15px 10px 15px; height:30px; box-sizing:border-box; align-items:center;
      border:1px solid rgba(0,0,0,.12); font-size:.75em; box-shadow: 0 1px 2px 0 rgb(0 0 0 / .05); background:#fff;
      user-select:none; cursor:pointer;
      ;
    }
    .custom-button-active{
      background:#00c73c;
      color:white; font-weight:bold;
    }
  `

  @query("#ImageInput")
  imageInputElement!: HTMLInputElement;

  @property()
  value = "http://via.placeholder.com/150x150";

  change(e: Event){
    const target = e.currentTarget as HTMLInputElement;

    if(!target.files) return;
    if(target.files.length < 1) return this.value = "http://via.placeholder.com/150x150";

    const img = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => { 
      this.value = reader.result as string
      const event = new CustomEvent('change', {bubbles: true, composed: true, detail: {src: this.value }});
      this.dispatchEvent(event);
    }
  }

  clickInput(e: Event){
    this.imageInputElement.click();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("openDialog", ()=>{
      this.imageInputElement.click();
    })
  }

  render(){
    return html`
      <div id="ImageInterfaceTab" style="display:flex; flex-direction:column; align-items:center;">
        <img id="ImagePreview" @click=${this.clickInput} src=${this.value} style="width:150px;height:150px;"></img>
        <div style="margin-top:8px; display:flex; justify-content:center;">
          <span @click=${this.clickInput} class="custom-button">이미지 선택</span>
          <input id="ImageInput" style="display:none;" @change=${this.change} type="file">
        </div>
      </div>
    `;
  }
}