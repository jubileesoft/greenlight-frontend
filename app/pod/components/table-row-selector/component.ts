import Component from '@glimmer/component';

interface TableRowSelectorArgs {
  size?: string;
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
}
