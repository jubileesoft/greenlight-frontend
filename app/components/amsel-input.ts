import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface AmselInputArgs {
  value?: string;
  items?: any[];
  displayPropertyName?: string;
  delay?: number;
  onSelect?(itemIndex: number): void;
  onChange?(newValue: string): void;
}

export default class AmselInput extends Component<AmselInputArgs> {
  @tracked foundItems = A();
  foundItemsToItems: Map<number, number> = new Map<number, number>();
  @tracked selectedIndex: number | null = null;

  get hasFoundItems() {
    return this.foundItems.length > 0;
  }

  get delay() {
    return this.args.delay || 0;
  }

  @(task(function* (event) {
    yield timeout(this.delay);
    this.handleOnInput(event);
  }).restartable())
  onInputTask;

  handleOnInput(event: UIEvent) {
    if (!Array.isArray(this.args.items) || !this.args.displayPropertyName) {
      return;
    }

    this.selectedIndex = null;

    const searchString = (event.target as HTMLInputElement).value.toLowerCase();
    if (!searchString) {
      return; // do nothing on empty search
    }

    const resultArray: any[] = [];
    this.foundItemsToItems.clear();

    for (let index = 0; index < this.args.items.length; index++) {
      const element = this.args.items[index];
      if (element[this.args.displayPropertyName!].toLowerCase().includes(searchString)) {
        resultArray.push(element);
        this.foundItemsToItems.set(resultArray.length - 1, index);
      }
    }

    // this.args.items.forEach((item) => {
    //   if (item[this.args.displayPropertyName!].toLowerCase().includes(searchString)) {
    //     resultArray.push(item);
    //   }
    // });
    this.foundItems = A(resultArray);
  }

  @action
  onKeyDown(event: UIEvent) {
    if (!Array.isArray(this.foundItems) || this.foundItems.length === 0) {
      return;
    }

    const keyboardEvent = event as KeyboardEvent;
    const target = keyboardEvent.target as HTMLInputElement;

    // 38 - CURSOR UP
    // 40 - CURSOR DOWN
    // 13 - RETURN
    const relevantKeyCodes = [38, 40, 13];
    if (!relevantKeyCodes.includes(keyboardEvent.keyCode)) {
      return;
    }

    let selectedIndexHasChanged = false;
    switch (keyboardEvent.keyCode) {
      case 38:
        if (!this.selectedIndex || this.selectedIndex === 0) {
          break;
        }
        this.selectedIndex = this.selectedIndex - 1;
        selectedIndexHasChanged = true;
        break;

      case 40:
        if (this.selectedIndex === this.foundItems.length - 1) {
          break;
        }
        this.selectedIndex = this.selectedIndex == null ? 0 : this.selectedIndex + 1;
        selectedIndexHasChanged = true;
        break;

      case 13:
        if (this.selectedIndex == null) {
          break;
        }
        //target.value = this.foundItems[this.selectedIndex][this.args.displayPropertyName!];
        const itemsIndex = this.foundItemsToItems.get(this.selectedIndex);
        if (this.args.onSelect && typeof itemsIndex !== 'undefined') {
          this.args.onSelect(itemsIndex);
        }
        break;
    }
  }

  @action
  onChange(event: UIEvent) {
    if (!this.args.onChange) {
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.args.onChange(value);
  }
}
