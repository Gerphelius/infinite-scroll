import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import JsonData from '../../scroll-data.json';
import { ScrollReachBottomDirective } from '../scroll-reach-bottom.directive';

interface IUser {
  name: string;
  age: number;
}

@Component({
  selector: 'app-infinite-scroll-list',
  templateUrl: './infinite-scroll-list.component.html',
  styleUrls: ['./infinite-scroll-list.component.css'],
  standalone: true,
  imports: [CommonModule, ScrollReachBottomDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollListComponent implements OnInit {
  public loadedUsers: IUser[] = [];

  private _data: IUser[] = JsonData;
  private _itemsPerLoad = 100;

  ngOnInit(): void {
    this.loadedUsers = this._data.slice(0, this._itemsPerLoad);
  }

  public trackByFn(index: number): number {
    return index;
  }

  public loadMoreUsers(): void {
    const newUsers = this._data.slice(
      this.loadedUsers.length,
      this.loadedUsers.length + this._itemsPerLoad
    );

    this.loadedUsers = this.loadedUsers.concat(newUsers);
  }
}
