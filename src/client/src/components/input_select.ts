import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('input-select')
export class SelectBoxComponent extends LitElement {
  @property()
  width = "92px";
  @property()
  height = "32px";
  @property()
  selectHeight = "68px";
  @property({type:Number})
  top=0

  @property()
  value = "";

  _value?:string = undefined;

  @property({attribute: false})
  flagOpenSelectBox = false;

  selectedText = "";
  
  @query("#SelectBox")
  SelectBoxElement!: HTMLElement;
  @query("#SelectBoxOptions")
  SelectBoxOptionsElement!: HTMLElement;
  @query("#Selected")
  SelectedElement!: HTMLElement;

  selectItems: HTMLElement[] = [];

  static styles = css`
    .my-select .select{
      box-sizing:border-box;
      display:none;
      position:absolute;
      top: 0px;
      cursor: pointer;
    }

    ::slotted(*){
      user-select: none;

      padding-left: 10px;
      box-sizing:border-box;
      padding-top: 5px;
      padding-bottom:5px;  

      border-radius: 5px; border: 1px solid #efefef; background:#fefefe;
      border-top: none; border-bottom: none;
      background:#fff;
      z-index:999;
    }

    ::slotted(*:hover){
      background:#efefef;
      color: #6342E5;
    }
    
    .my-select-option::-webkit-scrollbar {
      width: 6px;
    }
    .my-select-option::-webkit-scrollbar-track {
      background-color: transparent;
    }
    .my-select-option::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: gray;
    }
    .my-select-option::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }  
  `

  clickOpenSelectBox(e: Event){
    e.stopPropagation();
    this.flagOpenSelectBox = !this.flagOpenSelectBox;
  }

  clickOption = (e: Event)=>{
    const target = e.currentTarget as HTMLElement;
    this.setRender(target);
    this._value = target.dataset.value || "";
    this.flagOpenSelectBox = false;

    this._value = this._value 
    const event = new CustomEvent('select', {bubbles: true, composed: true, detail: {value: target.dataset.value || "" }});
    this.dispatchEvent(event);
    this.value = target.dataset.value || "";

    e.stopPropagation();
  }

  setRender(target: HTMLElement){
    this.selectedText = target.textContent || "";
  }

  setValue(value: string){
    for(const item of this.selectItems){
      if(item.dataset.value == value) return item.click();
    }
  }

  slotChange(e: Event){ 
    const slot = e.target as HTMLSlotElement;
    const child_elements = slot.assignedElements({flatten: true});
    child_elements.map((element)=>{
      element.classList.add("select-item");
      element.addEventListener("click", this.clickOption);
    });

    this.selectItems = child_elements as HTMLElement[];

    if(!this._value && !this.value) {
      this._value = this.value || "";
      for(const item of this.selectItems) {
        if(item.dataset.value == this.value) return item.click();
      }
      this.selectItems[0].click();
    }

    this.requestUpdate();
  }


  firstUpdated(){
    this.addEventListener("setSelect", (e: any)=>{
      const value = e.detail.value;
      for(const item of this.selectItems) {
        if(item.dataset.value == value) return item.click();
      }
    })
  }

  render(){
    return html`
      <div id="SelectBox" @click=${this.clickOpenSelectBox} class="my-select" style="
        display: flex; position: relative; align-items:center;
        height: ${this.height}; width: ${this.width};
        box-sizing:border-box; 
        text-overflow: '';
        border-radius: 5px; border: 1px solid #cfcfcf; background:#fefefe;
        ">
        <svg style="width:10px;height:10px;position: absolute; top:${15+this.top}px; right:5px">
          <path fill="none" stroke="black" stroke-width="1"
                d="M 0, 0
                  L 4, 4
                  M 8, 0
                  L 4, 4
                  "/>
        </svg>
        <div id="Selected" class="my-selected" style="position:absolute; left:10px; top:${5+this.top}px; user-select:none; cursor:default;">${this.selectedText}</div>
        <div id="SelectBoxOptions" class="select my-select-option" style="
          ${this.flagOpenSelectBox ? "display:flex;" : "display:none;"}
          flex-direction:column; top:${30+this.top}px; left:-1px; overflow-y: auto; max-height:${this.selectHeight};
          width: ${this.width};
        ">
          <div id="SlotContainer"></div>
            <slot @slotchange=${this.slotChange}></slot>
        </div>
      </div>
    `
  }
  
}
