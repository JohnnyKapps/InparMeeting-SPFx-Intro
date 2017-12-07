import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ShowAllListsWebPart.module.scss';
import * as strings from 'ShowAllListsWebPartStrings';

export interface IShowAllListsWebPartProps {
  description: string;
}

import * as pnp from 'sp-pnp-js';

export default class ShowAllListsWebPartWebPart extends BaseClientSideWebPart<IShowAllListsWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.showAllLists}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">${this.description}</span>
              <ul id="lists">

              </ul>
            </div>
          </div>
        </div>
      </div>`;

      this._getAllLists();
  }

  protected _getAllLists(){
    let html:string;
    pnp.sp.web.lists.get()
    .then((lists) => {
      for(let i = 0; i < lists.length; i++){
        html += `
        <li>
          <p>${lists[i].Title}</p>
        </li>`;
      }
      this.domElement.querySelector('#lists').innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
    })
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
