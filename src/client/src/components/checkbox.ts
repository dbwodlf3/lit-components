import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

@customElement('checkbox-component')
export class CustomCheckBoxComponent extends LitElement {
  static styles = css`
    ::slotted(.custom-checkbox){
      position: relative;
      padding-left: 29px;
      cursor: pointer;
    }

    ::slotted(.custom-checkbox):before {
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
    
    ::slotted(.custom-checkbox.custom-checkbox-active):before{
      background: #6300e6;
    }
    ::slotted(.custom-checkbox-active):after {
      content: "";
      position: absolute;
      left: 6px;
      top: 6px;
      width: 3px;
      height: 5px;
      border: 1px solid #fff;
      border-width: 0 2px 3px 0;
      transform: rotate(45deg);
    }
  `;

  @property()
  top = "";

  @property()
  value = "";

  @property()
  purple = false;

  render(){
    return html`
      <div style="display:flex; align-items:center; flex-grow:1; width:100%;">
        <slot @slotchange=${this.slotChange}>None</slot>
      </div>
    `;
  }
  
  clickCheckBox(e: Event){
    const box = e.currentTarget as HTMLElement;
    if(box.classList.contains("custom-checkbox-active")){
      box.classList.remove("custom-checkbox-active");
    }
    else {
      box.classList.add("custom-checkbox-active");
    }
  }

  slotChange(e: Event){
    const slot = e.target as HTMLSlotElement;
    const child_elements = slot.assignedElements({flatten:true});
    child_elements.map((element)=>{
      const el = element as HTMLElement
      el.classList.add("custom-checkbox");
      element.addEventListener("click", this.clickCheckBox);
      if(el.dataset.check) {el.click();}
    })
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("checkAll", ()=>{
      for(const child of this.children) {
        (child as HTMLElement).click();
      }
    })
  }

}