import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('tag-component')
export class TagComponent extends LitElement { 
    @property()
    height= "";

    @property({type: Boolean})
    small = false;

    static styles = css`
        .tag { 
            display:inline-block;
            background:#f9f0ff;
            padding: 2px 4px 2px 4px;
            color: #531dab;
            border: 1px solid #d3adf7;
            margin-right:4px;
        }

        .small {
            font-size: .7em;
        }
    `

    render(){
        return html`
            <div class="tag ${this.small? "small" : "" }" style="${this.height ? `height: ${this.height}` : ""}">
                <slot></slot>
            </div>`
    }
}