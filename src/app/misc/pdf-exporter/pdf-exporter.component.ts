import { Component, OnInit, OnDestroy } from '@angular/core';
import { PdfExportService } from '../../common/pdf/pdf-export.service';



@Component({
  selector: 'app-pdf-exporter',
  templateUrl: './pdf-exporter.component.html',
  styleUrls: ['./pdf-exporter.component.scss']
})
export class PdfExporterComponent implements OnInit,OnDestroy{

   data:any;
   visitsFlag:boolean=false;
   purchaseOrdarFlag:boolean=false;
   visitClientsFlag:boolean=false;
   visitTechnicianFlag:boolean=false;
   inventoryFlag:boolean=false;
   inventoryTransferFlag:boolean=false;
   inventorySettlementsFlag:boolean=false;
   cuatomerPointsHistoryRecordFlag:boolean=false;
   carPartHistoryRecordFlag:boolean=false;

  ngOnInit() {

     this.pdfExportService.currentMessage.subscribe((m)=>{

        this.data = m;

        if(this.data.vFlag === true){
          this.visitsFlag=true;
        }
        else if(this.data.pFlag === true){
          this.purchaseOrdarFlag=true;
        }
        else if(this.data.vcFlag === true){
          this.visitClientsFlag= true;
        }
         else if(this.data.vTFlag === true){
          this.visitTechnicianFlag= true;
        }
        else if (this.data.iFlag === true){
          this.inventoryFlag = true;

        }
        else if (this.data.ITFlag === true){
          this.inventoryTransferFlag = true;
        }else if (this.data.CRHFlag === true){
          this.cuatomerPointsHistoryRecordFlag=true;

        }else if (this.data.CPHFlag === true){
          this.carPartHistoryRecordFlag=true;
        }
        else if(this.data.iSRFlag === true){
          this.inventorySettlementsFlag = true;
        }
        else {
            document.getElementById("pdfContentView").appendChild(this.data);
        }

        });


  }

  constructor(private pdfExportService:PdfExportService) {}

   printPDf(){

    setTimeout(()=>{
      window.addEventListener("beforeprint",()=>{
        document.getElementById("printPDF").remove();
      })
    },0)
    setTimeout(()=>{
      window.addEventListener("afterprint",()=>{
        window.history.back();

      })
    },0)
    setTimeout(function () {
      window.print();

    }, 0);


   }

   getPurchaseOrderTotalPartPrice(purchaseOrderCarPart) {
    if (purchaseOrderCarPart.carPartQuantity && purchaseOrderCarPart.carPartUnitPrice) {
      if(purchaseOrderCarPart.carPart.packagingSize ==1){
      return purchaseOrderCarPart.carPartQuantityReceived * purchaseOrderCarPart.carPart.packagingSize * purchaseOrderCarPart.carPartUnitPrice;
      }else {
        return purchaseOrderCarPart.carPartQuantityReceived *purchaseOrderCarPart.carPartUnitPrice;
      }
    }
    return 0;
  }



  getVisitMaintenanceTaskTotalPartsPrice(visitMaintenanceTask) {
    if ((visitMaintenanceTask.carPartQuantity && visitMaintenanceTask.carPartUnitPrice)) {
      return (visitMaintenanceTask.carPartQuantity * visitMaintenanceTask.carPartUnitPrice);
    }
    return 0;
  }

  getVisitMaintenanceTaskTotalPartsPriceAfterDiscount(visitMaintenanceTask) {
    if ((visitMaintenanceTask.carPartQuantity && visitMaintenanceTask.carPartUnitPrice)) {
      return this.getVisitMaintenanceTaskTotalPartsPrice(visitMaintenanceTask) - this.getVisitMaintenanceTaskPartDiscountAmount(visitMaintenanceTask);
    }
    return 0;
  }

  getVisitMaintenanceTaskPartDiscountPercent(visitMaintenanceTask) {
    if(visitMaintenanceTask.carPart)
      return (visitMaintenanceTask.carPartDiscount/100);
    }

    getVisitMaintenanceTaskPartDiscountAmount(visitMaintenanceTask) {
      if ((visitMaintenanceTask.carPartQuantity && visitMaintenanceTask.carPartUnitPrice)) {
        return (this.getVisitMaintenanceTaskTotalPartsPrice(visitMaintenanceTask)) * (this.getVisitMaintenanceTaskPartDiscountPercent(visitMaintenanceTask));
      }
      return 0;
    }

  getVisitMaintenanceTaskTotalPrice(visitMaintenanceTask){
    return this.getVisitMaintenanceTaskTotalPartsPriceAfterDiscount(visitMaintenanceTask) + (visitMaintenanceTask.laborCost?visitMaintenanceTask.laborCost:0);

  }

  getVisitMaintenanceTaskTotalPriceAfterTax(visitMaintenanceTask){
    return this.getVisitMaintenanceTaskTotalPartsPriceAfterDiscount(visitMaintenanceTask) + (visitMaintenanceTask.laborCost?visitMaintenanceTask.laborCost:0) +this.getSalesTaxAmountForMaintenanceTask(visitMaintenanceTask);

  }

  getSalesTaxAmountForMaintenanceTask(visitMaintenanceTask) {
    return this.getVisitMaintenanceTaskTotalPrice(visitMaintenanceTask) * 0.05;
  }

  getTotalAmountForMaintenanceTask(visitMaintenanceTask) {
    return this.getVisitMaintenanceTaskTotalPartsPrice(visitMaintenanceTask) + this.getSalesTaxAmountForMaintenanceTask(visitMaintenanceTask) +  (visitMaintenanceTask.laborCost?visitMaintenanceTask.laborCost:0);
  }



  getTotalPartsPriceForVisit(visit) {
    var totalPartsPrice = 0;
    if (visit.visitMaintenanceTasks) {
      visit.visitMaintenanceTasks.forEach(visitMaintenanceTask => {
        totalPartsPrice += this.getVisitMaintenanceTaskTotalPartsPriceAfterDiscount(visitMaintenanceTask);
      });
    }
    return totalPartsPrice;
  }

  getTotalPartsPriceForMaintenanceTask(visitMaintenanceTask) {
    var totalPartsPrice = 0;
    if (visitMaintenanceTask) {
        totalPartsPrice += this.getVisitMaintenanceTaskTotalPartsPrice(visitMaintenanceTask);

    }
    return totalPartsPrice;
  }

  getTotalLaborCostForMaintenanceTask(visitMaintenanceTask) {
    var totalLaborCost = 0;
    if (visitMaintenanceTask) {
        if (visitMaintenanceTask.laborCost) {
          var discountPercent = visitMaintenanceTask.taskDiscount/100;
          totalLaborCost += visitMaintenanceTask.laborCost*(1-discountPercent);
        }
    }
    return totalLaborCost;
  }






  getTotalLaborCostForVisit(visit) {
    var totalLaborCost = 0;
    if (visit.visitMaintenanceTasks) {
      visit.visitMaintenanceTasks.forEach(visitMaintenanceTask => {
        if (visitMaintenanceTask.laborCost) {
          var discountPercent = visitMaintenanceTask.taskDiscount/100;
          totalLaborCost += visitMaintenanceTask.laborCost*(1-discountPercent);
        }
      });
    }
    return totalLaborCost;
  }

  getSubtotalAmountForVisit(visit) {
    return this.getTotalPartsPriceForVisit(visit) + this.getTotalLaborCostForVisit(visit);
  }

  getVisitDiscountPercent(visit) {
      return (visit.visitDiscount/100);
  }

  getDiscountAmount(visit){
    return this.getSubtotalAmountForVisit(visit) * this.getVisitDiscountPercent(visit);
  }

  getSubtotalAmountAfterDiscountForVisit(visit) {
    return this.getSubtotalAmountForVisit(visit) - this.getDiscountAmount(visit);
  }

  getSalesTaxAmountForVisit(visit) {
    return this.getSubtotalAmountAfterDiscountForVisit(visit) * 0.05;
  }

  getTotalAmountForVisit(visit) {
    return this.getSubtotalAmountAfterDiscountForVisit(visit) + this.getSalesTaxAmountForVisit(visit);
  }

  getTotalOfVisitsBeforeTax(){

    var totalAmountForVisitsBeforeTax = 0;
    this.data.forEach(visit => {
      totalAmountForVisitsBeforeTax += this.getSubtotalAmountAfterDiscountForVisit(visit);
    });

    return totalAmountForVisitsBeforeTax;

  }

  getTotalSalesTaxOfVisits(){

    var totalSalesTaxForVisits = 0;
    this.data.forEach(visit => {
      totalSalesTaxForVisits += this.getSalesTaxAmountForVisit(visit);
    });

    return totalSalesTaxForVisits;

  }

  getTotalOfVisits(){

    var totalAmountForVisits = 0;
    this.data.forEach(visit => {
      totalAmountForVisits += this.getTotalAmountForVisit(visit);
    });

    return totalAmountForVisits;

  }


  ngOnDestroy(){

    setTimeout(()=>{
      location.reload()
    },500)
  }
}
