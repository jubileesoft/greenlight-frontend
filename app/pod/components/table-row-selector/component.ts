import Component from '@glimmer/component';
import { action } from '@ember/object';
import { A } from '@ember/array';

interface TableRowSelectorArgs {
  size?: string;
  index: number;
  selectedIndexes: number[];
}

export default class TableRowSelector extends Component<TableRowSelectorArgs> {
  get size() {
    return this.args.size || '1x';
  }

  get sizeClass() {
    switch (this.size) {
      case '1x':
        return 'size-1x';

      default:
        return 'size-2x';
    }
  }

  get isChecked() {
    return this.args.selectedIndexes.includes(this.args.index);
  }

  @action
  onClick(event: KeyboardEvent) {
    const checked = (event.target as HTMLInputElement).checked;
    console.log(checked);

    if (checked) {
      // add this.args.index to this.args.selectedIndexes
      if (this.args.selectedIndexes.includes(this.args.index)) {
        return; // do nothing
      }
      this.args.selectedIndexes.pushObject(this.args.index);
    } else {
      // remove this.args.index from this.args.selectedIndexes
      if (!this.args.selectedIndexes.includes(this.args.index)) {
        return; // do nothing
      }
      this.args.selectedIndexes.removeObject(this.args.index);
    }
  }
}
