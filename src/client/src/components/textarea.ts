import { LitElement, html, css, } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('textarea-component')
export class TextAreaComponent extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }
    .input-none:focus {
      outline:none;
    }
    .input-none {
      border : none;
      background: none;
    }
    .custom-label {
      transition: color 0.5s ease;
      color: #606060;
    }
    .custom-label-active {
      color: #00a130;
    }
  `;

  @query("#CustomInputLabel")
  customLabel!: HTMLInputElement;

  @query("#CustomInput")
  customInput!: HTMLInputElement;

  @property()
  value = "";

  @property()
  label = "Title(Required)";

  render(){
    return html`
      <div style="
        display:inline-flex; flex-direction:column; padding:5px 10px 5px 10px;
        margin-bottom:25px; border: 1px solid rgba(0 0 0 / .2);
        width:100%; height:100%;
      ">
        <div id="CustomInputLabel" class="custom-label" style="font-size:.7em;">${this.label}</div>
        <textarea id="CustomInput" value=${this.value}
          @input=${this.input}
          size="1" @focus=${this.focusIn} @focusout=${this.focusOut} type="text" class="input-none" placeholder="" style="resize:none;" ></textarea>
      </div>
    `;
  }

  input(e: InputEvent){
    const target = e.currentTarget as HTMLInputElement;
    this.value = target.value;
  }

  focusIn(e: Event){
    this.customLabel.classList.add("custom-label-active");
  }

  focusOut(e: Event){
    this.customLabel.classList.remove("custom-label-active");
  }
}
