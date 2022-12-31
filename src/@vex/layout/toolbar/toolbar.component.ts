import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import icBookmarks from '@iconify/icons-ic/twotone-bookmarks';
import emojioneUS from '@iconify/icons-emojione/flag-for-flag-united-states';
import emojioneDE from '@iconify/icons-emojione/flag-for-flag-germany';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { ConfigService } from '../../services/config.service';
import { map } from 'rxjs/operators';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icAssignmentTurnedIn from '@iconify/icons-ic/twotone-assignment-turned-in';
import icBallot from '@iconify/icons-ic/twotone-ballot';
import icDescription from '@iconify/icons-ic/twotone-description';
import icAssignment from '@iconify/icons-ic/twotone-assignment';
import icReceipt from '@iconify/icons-ic/twotone-receipt';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import { NavigationService } from '../../services/navigation.service';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import { PopoverService } from '../../components/popover/popover.service';
import { MegaMenuComponent } from '../../components/mega-menu/mega-menu.component';
import icSearch from '@iconify/icons-ic/twotone-search';
import { Location } from '@angular/common';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { MatSlideToggle , MatSlideToggleChange } from '@angular/material/slide-toggle';
// import { BotPagosService } from '../../../app/services/bot-pagos.service';
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'vex-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() mobileQuery: boolean;

  @Input()
  @HostBinding('class.shadow-b')
  hasShadow: boolean;

  showSlideToggle = false;
  public syncIsActive: boolean = null;

  navigationItems = this.navigationService.items;

  isHorizontalLayout$ = this.configService.config$.pipe(map(config => config.layout === 'horizontal'));
  isVerticalLayout$ = this.configService.config$.pipe(map(config => config.layout === 'vertical'));
  isNavbarInToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'in-toolbar'));
  isNavbarBelowToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'below-toolbar'));

  icSearch = icSearch;
  icBookmarks = icBookmarks;
  emojioneUS = emojioneUS;
  emojioneDE = emojioneDE;
  icMenu = icMenu;
  icPersonAdd = icPersonAdd;
  icAssignmentTurnedIn = icAssignmentTurnedIn;
  icBallot = icBallot;
  icDescription = icDescription;
  icAssignment = icAssignment;
  icReceipt = icReceipt;
  icDoneAll = icDoneAll;
  icArrowDropDown = icArrowDropDown;

  constructor(private layoutService: LayoutService,
              private router : Router,
              private location: Location,
              private configService: ConfigService,
              private navigationService: NavigationService,
              // private botPagosService: BotPagosService,
              private spinner: NgxSpinnerService,
              private popoverService: PopoverService) 
              { 
                this.initSlideToogleSync()   
                this.initShowSlideToggleSync()      
                      
              }

  ngOnInit() {
    
    this.updateShowSlideToggleSync()
 
  }

  openQuickpanel() {
    this.layoutService.openQuickpanel();
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  openMegaMenu(origin: ElementRef | HTMLElement) {
    this.popoverService.open({
      content: MegaMenuComponent,
      origin,
      position: [
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });
  }

  openSearch() {
    this.layoutService.openSearch();
  }

  updateShowSlideToggleSync(){
    this.router.events.subscribe(
      (event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        if(event.url == '/sincronizacion'){
          this.showSlideToggle = true;
        }else{
          this.showSlideToggle = false;
        }
      }
    });
  }

  initShowSlideToggleSync(){
    this.showSlideToggle = false;
    if(this.router.url=='/sincronizacion' && this.syncIsActive !=null){
      this.showSlideToggle = true;
    }

  }

  initSlideToogleSync(){
    // this.botPagosService.botPagosCurrentState().subscribe((res)=>{
    //   this.syncIsActive = res.stateToggle== "0"? false:true
    //   this.initShowSlideToggleSync()
    // })
  }

  onChangeSlideToogleSync(event: MatSlideToggleChange ){

    if(!this.syncIsActive){
      event.source.checked = this.syncIsActive

      Swal.fire({
                  title: "¿Realmente deseas Activar la sincronización del Bot de Pagos?",
                  text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. .",
                  icon: "warning",
                  showCancelButton: true,
                  focusCancel: true,
                  confirmButtonText: "confirmar",
                  cancelButtonText: "cancelar",
                }).then((result) => {
                                      // if (result.isConfirmed) {
                                      //   this.spinner.show();
                                        
                                      //   this.botPagosService
                                      //     .botPagosChangeState()
                                      //     .subscribe(
                                      //       (res) => {         
                                      //         event.source.checked = true;
                                      //         this.syncIsActive = true;
                                      //         this.spinner.hide();
                                      //       },
                                      //       (err) => this.spinner.hide()
                                      //     ),
                                      //     (err) => this.spinner.hide();
                                      // }
                  
                });
      
      


    }else{
      event.source.checked = this.syncIsActive
      Swal.fire({
                  title: "¿Realmente deseas Desactivar la sincronización del Bot de Pagos?",
                  text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. .",
                  icon: "warning",
                  showCancelButton: true,
                  focusCancel: true,
                  confirmButtonText: "confirmar",
                  cancelButtonText: "cancelar",
                }).then((result) => {
                                      // if (result.isConfirmed) {
                                      //   this.spinner.show();
                                        
                                      //   this.botPagosService
                                      //     .botPagosChangeState()
                                      //     .subscribe(
                                      //       (res) => {
                                      //         event.source.checked = false;
                                      //         this.syncIsActive = false;
                                      //         this.spinner.hide();
                                      //       },
                                      //       (err) => this.spinner.hide()
                                      //     ),
                                      //     (err) => this.spinner.hide();
                                      // }
                  
                });

    }
    
  }
}
