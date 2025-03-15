import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, GestureController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  @ViewChild('swipeArea', { read: ElementRef }) swipeArea!: ElementRef;

  constructor(private navCtrl: NavController, private gestureCtrl: GestureController, private animationCtrl: AnimationController) {}

  ionViewDidEnter() {
    this.setupSwipeGesture();
  }

  setupSwipeGesture() {
    const gesture = this.gestureCtrl.create({
      el: this.swipeArea.nativeElement,
      gestureName: 'swipe-gesture',
      onStart: () => {},
      onMove: () => {},
      onEnd: (detail) => {
        if (detail.deltaX < -100) { // Swipe left threshold
            this.navigateToDetails();
        }
      },
    });

    gesture.enable();
  }

  navigateToDetails() {
    const enterAnimation = (baseEl: any) => {
      const root = baseEl.shadowRoot || baseEl;

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0', '1');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('.modal-wrapper')!)
        .fromTo('transform', 'translateX(100%)', 'translateX(0%)');

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('cubic-bezier(0.36, 0.66, 0.04, 1)')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    this.navCtrl.navigateForward('/details', {
      animated: true,
      animation: enterAnimation,
    });
  }
}
