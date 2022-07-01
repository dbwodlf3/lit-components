import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('input-tag')
export class TagInputComponent extends LitElement {

  @query("#TagInput")
  tagInputElement!:HTMLInputElement;

  @property()
  tags: string[]=[];

  static styles = css`
    .input-none:focus{
      outline:none;
      text-decoration: none !important;
    }
    .input-none{
      border: none;
      text-decoration: none;
      background: none;
    }
    .input-active{
      border-color: rgba(110, 0, 255, .5) !important;
      box-shadow: inset 0 1px 1px rgb(31 45 61 / 8%), 0 0 20px rgb(110 0 255 / 10%);
    }
    .a-none {
      color: inherit;
      text-decoration: none;
    }
    .tag {
      display:inline-block;
      background:#f9f0ff;
      padding: 2px 4px 2px 4px;
      color: #531dab;
      border: 1px solid #d3adf7;
      margin-right:4px;
    }
    .tag-remove {
      cursor: pointer;
    }
`;

  render(){
    const tag_templates = [];

    for(const tag of this.tags){
      tag_templates.push(this.renderTagLabels(tag));
    }

    return html`
    <div>
      <div style="display:flex; border: 1px solid #cfcfcf; margin-bottom:16px; align-items:center; padding:4px 0px 4px 0px;">
        <img src="/static/img/tags-solid.svg" style="width:14px; font-size: 1em; padding: 8px 8px 8px 16px;">
        <input id="TagInput"
          @keypress=${this.keypressTag} @input=${this.inputTag}
          id="UsernameInput" class="input-none" type="text" placeholder="태그" 
          style="flex-grow:1; padding-left:16px; font-size:1em;"
        >
      </div>
      <div>
        ${tag_templates}
      </div>
    </div>
    `;
  }

  keypressTag(e: KeyboardEvent){
    if(e.code == "Space" || e.code == "Enter" || e.code=="Comma") {
      e.preventDefault();
    }

    if((e.code == "Space" || e.code == "Enter" || e.code=="Comma") && this.tagInputElement.value.trim()!="") {
      if(this.tags.indexOf(this.tagInputElement.value)>-1) return window.alert("이미 존재하는 태그입니다.");
        this.tags.push(this.tagInputElement.value);
        this.tagInputElement.value = "";
        const event = new CustomEvent("changetags", {detail: {tags: this.tags}, bubbles: true, composed: true});
        this.dispatchEvent(event);
        this.requestUpdate();
    }
  }

  inputTag(){
    this.tagInputElement.value = this.tagInputElement.value.replace(/,/g, "");
    this.tagInputElement.value = this.tagInputElement.value.trim();
  }

  removeTag(e: MouseEvent){
    const target = e.currentTarget as HTMLElement;

    this.tags.splice(this.tags.indexOf(target.parentElement?.textContent || ''), 1);
    const event = new CustomEvent("changetags", {detail: {tags: this.tags}, bubbles: true, composed: true});
    this.dispatchEvent(event);
    this.requestUpdate();
  }

  renderTagLabels(tagName:string){
    return html`<span class="tag"> ${tagName} <span class="tag-remove" @click=${this.removeTag}>x</span></span>`
  }
  
}
