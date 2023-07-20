import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnDestroy {
  private _subscriptions = new Subscription();

  public set subs(subscription: Subscription) {
    this._subscriptions.add(subscription);
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
