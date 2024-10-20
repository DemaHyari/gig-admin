import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
export class LocalizedViewPaginator extends MatPaginatorIntl {

    constructor(private translateService: TranslateService) {
        super();

        this.setLabels();
        translateService.onLangChange.subscribe(newLang => {
            this.setLabels();
        });
    }

    itemsPerPageLabel;
    nextPageLabel;
    previousPageLabel;
    firstPageLabel;
    lastPageLabel;
    pageRangeOfLabel = "of";

    setLabels() {

        this.translateService.get('layout_text.items_per_page').subscribe(translatedValue => {
            this.itemsPerPageLabel = translatedValue;
            if (document.getElementsByClassName("mat-paginator-page-size-label")[0]) {
                document.getElementsByClassName("mat-paginator-page-size-label")[0].innerHTML = translatedValue;
            }
        });

        this.translateService.get('layout_text.first_page').subscribe(translatedValue => {
            this.firstPageLabel = translatedValue;
        });

        this.translateService.get('layout_text.last_page').subscribe(translatedValue => {
            this.lastPageLabel = translatedValue;
        });

        this.translateService.get('layout_text.next_page').subscribe(translatedValue => {
            this.nextPageLabel = translatedValue;
        });

        this.translateService.get('layout_text.previous_page').subscribe(translatedValue => {
            this.previousPageLabel = translatedValue;
        });

        this.translateService.get('layout_text.of').subscribe(translatedValue => {
            this.pageRangeOfLabel = translatedValue;
        });

    }


    getRangeLabel = function (page, pageSize, length) {
        if (length === 0 || pageSize === 0) {
            return '0 ' + this.pageRangeOfLabel + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return ' (' + (1 + startIndex) + ' - ' + endIndex + ')' + ' ' + this.pageRangeOfLabel + ' ' + length;
    };

}