import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

@customElement('radio-group')
export class RadioGroup extends LitElement {
  @property()
  selectedValue = "None";
  @property()
  dataPath = "";
  @property({attribute: false})
  selectData: {value: string, text: string}[] = [];
  @property()
  observerId = "";

  @query("#Radio")
  RadioElement!: HTMLElement;

  value = "";

  static styles = css`
    ::slotted(.box){
      padding: 5px 0px 5px 0px;
      display:flex;
      position: relative;
      justify-content: center;
      align-items: center;
      background-color: #f5f5ff;
      cursor:pointer;

      margin-left: 4px;

      flex-grow: 1;
      min-width: 100px;

      border-radius: 8px;
      opacity: 0.9;

      font-family: 'Nanum Gothic', sans-serif;
      background-color: #efefef;
      color:gray;


      user-select:none;
    }
    
    ::slotted(.box.selected){
      background-color:#7A81EB;
      color: #fff;
      opacity: 1.0;
    }
  `;

  constructor() {
    super();
    this.addEventListener('change', (e)=>{ console.log(e.type, e.target)})
  }

  render(){
    return html`
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@700&display=swap" rel="stylesheet">
    <div id="" style="display:flex; width:100%;">
      <slot @slotchange=${this.slotChange}>None</slot>
    </div>
    `;
  }

  firstUpdated(){
    if(this.RadioElement)if(this.RadioElement.children)if(this.RadioElement.children[0]){(this.RadioElement.children[0] as HTMLElement).click();}
  }

  clickBox = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    const parent = target.parentElement;
    const sibilings = parent?.getElementsByClassName("box") as HTMLCollectionOf<HTMLElement>;

    for(const sibiling of sibilings) {
      sibiling.classList.remove("selected");
    }
    target.classList.add("selected");

    this.selectedValue = target.dataset.value || "";

    this.value = this.selectedValue;
    const event = new CustomEvent('select', {bubbles: true, composed: true, detail: {value: this.selectedValue }});
    this.dispatchEvent(event);
  }

  slotChange(e: Event){ 
    const slot = e.target as HTMLSlotElement;
    const child_elements = slot.assignedElements({flatten: true});
    child_elements.map((element)=>{
      element.classList.add("box");
      element.addEventListener("click", this.clickBox);
    });
    const first_element = child_elements[0] as HTMLElement
    first_element.click();
  }
}
