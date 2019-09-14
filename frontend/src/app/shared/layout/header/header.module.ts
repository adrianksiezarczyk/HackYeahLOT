import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { PopoverModule } from "ngx-popover";

import { CollapseMenuComponent } from "./collapse-menu/collapse-menu.component";
import { RecentProjectsComponent } from "./recent-projects/recent-projects.component";
import { FullScreenComponent } from "./full-screen/full-screen.component";


import { HeaderComponent } from "./header.component";

import { UtilsModule } from "../../utils/utils.module";
import { I18nModule } from "../../i18n/i18n.module";
import { UserModule } from "../../user/user.module";
import { BsDropdownModule } from "ngx-bootstrap";
import { SmartadminInputModule } from '../../forms/input/smartadmin-input.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    UtilsModule, I18nModule, UserModule, PopoverModule,
    SmartadminInputModule
  ],
  declarations: [
    RecentProjectsComponent,
    FullScreenComponent,
    CollapseMenuComponent,
    HeaderComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
