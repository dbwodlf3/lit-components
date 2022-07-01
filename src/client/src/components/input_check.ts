import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('input-check')
export class CheckBoxItemComponent extends LitElement {
  @property()
  top = "";

  @property()
  value = false;

  @property()
  purple = false;

  @query("#CheckBox")
  checkboxElement!: HTMLElement

  static styles = css`
    .custom-checkbox{
      position: relative;
      padding-left: 29px;
      cursor: pointer;
    }

    .custom-checkbox:before {
      content: "";
      box-sizing:border-box;
      position: absolute;
      width: 18px;
      height: 18px;
      border: 1px solid #cfcfcf;
      border-radius: 3px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
      background: #f9f7f5;
      cursor:pointer;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    
    .custom-checkbox.custom-checkbox-active:before{
      background: #6300e6;
    }
    .custom-checkbox-active:after {
      content: "";
      position: absolute;
      left: 6px;
      top: -5px;
      width: 3px;
      height: 5px;
      border: 1px solid #fff;
      border-width: 0 2px 3px 0;
      transform: rotate(45deg);
    }
  `;
  
  clickCheckBox(){
    if(this.checkboxElement.classList.contains("custom-checkbox-active")){
      this.checkboxElement.classList.remove("custom-checkbox-active");
      this.value = false;
    }
    else {
      this.checkboxElement.classList.add("custom-checkbox-active");
      this.value = true;
    }
  }

  firstUpdated(){ 
    this.addEventListener("click", this.clickCheckBox);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("checkAll", ()=>{
      this.click();
    });
  }

  render(){
    return html`
      <div style="display:flex; align-items:center; flex-grow:1; width:100%;">
        <div id="CheckBox" class="custom-checkbox"></div>
      </div>
    `;
  }

}