import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

@customElement('input-phone')
export class PhoneInputComponent extends LitElement {
  @query("#Phone1")
  phone1Element!: HTMLElement;
  @query("#Phone2")
  phone2Element!: HTMLElement;
  @query("#Phone3")
  phone3Element!: HTMLElement;

  @property()
  value = "";

  _value1 = "";
  _value2 = "";
  _value3 = "";

  static styles = css`
    .input-phone{
      border: 1px solid #dfdfdf; width:60px;
      padding: 5px 15px 5px 15px; color:#5f5f5f;
    }
    .input-phone:focus{
      outline:none;
      box-shadow: 0px 0px 12px 0px #cfcfcf;
      border-color: rgba(110, 0, 255, .5);
      text-decoration: #007fe !important;
    }
  `;

  inputPhone1(e: KeyboardEvent){
    const target = e.currentTarget as HTMLInputElement;
    if(target.value.length>=3){this.phone2Element.focus()}
    this._value1 = target.value;
    this.value = this._value1.toString() + this._value2.toString() + this._value3.toString();
  }

  inputPhone2(e: KeyboardEvent){
    const target = e.currentTarget as HTMLInputElement;
    if(target.value.length>=4){this.phone3Element.focus()}
    this._value2 = target.value;
    this.value = this._value1.toString() + this._value2.toString() + this._value3.toString();
  }

  inputPhone3(e: KeyboardEvent){
    const target = e.currentTarget as HTMLInputElement;
    this._value3 = target.value;
    this.value = this._value1.toString() + this._value2.toString() + this._value3.toString();
  }
  
  render(){
    return html`
    <div>
      <input id="Phone1" @input=${this.inputPhone1} class="input-phone" style="width:60px" maxlength="3" .value=${this._value1}>
      <input id="Phone2" @input=${this.inputPhone2} class="input-phone" style="width:80px" maxlength="4" .value=${this._value2}>
      <input id="Phone3" @input=${this.inputPhone3} class="input-phone" style="width:80px" maxlength="4" .value=${this._value3}>
    </div>
    `;
  }
}