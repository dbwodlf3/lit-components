import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

@customElement('input-text')
export class TextInputComponent extends LitElement {
  @property()
  placeholder = "";
  @property()
  value = "";
  @property()
  label = "제목";

  @query("#CustomInputLabel")
  customLabel!: HTMLInputElement;
  @query("#CustomInput")
  customInput!: HTMLInputElement;
  
  static styles = css`
    * {
      box-sizing: border-box;
    }
    .input-none:focus{
      outline:none;
      text-decoration: none !important;
    }
    .input-none{
      text-decoration: none;
      background: none;
    }
    .custom-input-label {
      font-size: .9em;
      color: #4f4f4f;
      transition: color 0.1s ease;
    }
    .custom-input-label-active {
      color: #00a130;
    }
    
    .custom-input-a {
      font-size: .9em;
      border: none;
      border-bottom: 1px solid #cfcfcf;
      padding: 8px 0px 8px 0px;
      color: #1f1f1f;
      transition: border-bottom-color 0.1s ease;
    }
    .custom-input-a-active {
      border-bottom-color: #00a130;
    }
  `;

  protected firstUpdated(){
    this.addEventListener("clear", ()=>{
      this.customInput.value="";
    })
  }

  updated(){
    this.customInput.value = this.value;
  }

  focusIn(e: Event){
    this.customLabel.classList.add("custom-input-label-active");
    this.customInput.classList.add("custom-input-a-active");
  }

  focusOut(e: Event){
    this.customLabel.classList.remove("custom-input-label-active");
    this.customInput.classList.remove("custom-input-a-active");
  }

  inputValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  render(){
    return html`
      <div style="display: flex; align-items:center; ">
        <span id="CustomInputLabel" class="custom-input-label">${this.label}</span>
        <input id="CustomInput" size="1" @input=${this.inputValue} @focus=${this.focusIn} @focusout=${this.focusOut} class="custom-input-a input-none" style="margin-left:8px; flex-grow:1"
        .value=${this.value}
        placeholder=${this.placeholder}
        >
      </div>
    `;
  }
}
