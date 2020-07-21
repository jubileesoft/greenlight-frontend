import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface SectionArgs {
  text: string;
  showExpander?: boolean;
}

export default class Section extends Component<SectionArgs> {
  @tracked isExpanded = true;

  get showExpander() {
    return typeof this.args.showExpander === 'undefined'
      ? false
      : this.args.showExpander;
  }

  @action
  headerClicked() {
    this.isExpanded = !this.isExpanded;
  }
}
