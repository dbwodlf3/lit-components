import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

@customElement('input-number')
export class CustomInputComponent extends LitElement {

  @property()
  value = "";

  @property()
  unit = "";

  @property()
  right = "30px";

  @property()
  max = "";
  @property()
  min = "";

  static styles = css`
    .input-none {
      text-align: right;
      border: none;
    }
    
    .input-none:focus{
      outline: none;
    }
    
    .input-none::-webkit-outer-spin-button,
    .input-none::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  `;

  inputValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  render(){
    return html`
      <div class="custom-input" style="
        text-align: right;
        border: 1px solid #bbb;
        padding-top:5px;
        padding-bottom:5px;
        padding-right: ${this.right};
        padding-left: 5px;
        position:relative;
        ">
        <input id="HotspotDialogMarkerHeightInput" @input=${this.inputValue} class="input-none" type="number" style="width: 100%;" .value=${this.value}>
        <span style="
          position:absolute;
          top: 4px;
          right: 8px;
          color: #777;
          font-size:12px;
          ">${this.unit}</span>
      </div>
    `;
  }
}