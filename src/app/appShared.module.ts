import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocalizationPipe } from "./common/localization/localization.pipe";
import { LanguagesPipe } from "./common/localization/languages.pipe";
import { ElementPermissionDirective } from "./security/element-permission.directive";
import { TranslateModule } from "@ngx-translate/core";
import { DialogModule } from "primeng/dialog";
import { FormsModule } from "@angular/forms";
  
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
    ],
    declarations: [
        LocalizationPipe,
        LanguagesPipe,
        ElementPermissionDirective
    ],
    providers: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        DialogModule,
        LocalizationPipe,
        LanguagesPipe,
        ElementPermissionDirective
    ]
})
export class AppSharedModule { }
