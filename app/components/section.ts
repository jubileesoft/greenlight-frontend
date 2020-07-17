import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface SectionArgs {
  text: string;
}

export default class Section extends Component<SectionArgs> {
  @tracked isExpanded = true;

  @action
  headerClicked() {
    this.isExpanded = !this.isExpanded;
  }
}
