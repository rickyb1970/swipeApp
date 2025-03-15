import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, GestureController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild('swipeArea',{'read': ElementRef}) swipeArea!: ElementRef;

  constructor(private navCtrl: NavController, private gestureCtrl: GestureController, private animationCtrl: AnimationController) { }

  ionViewDidEnter(){
    this.setupSwipegesture();
  }

  setupSwipegesture(){

  }

}
