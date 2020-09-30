import Component from '@glimmer/component';
import { action } from '@ember/object';

interface SubmitButtonArgs {
  type?: string;
  isEnabled?: boolean;
  onClick?: () => void;
}

export default class SubmitButton extends Component<SubmitButtonArgs> {
  get type() {
    return this.args.type || 'secondary';
  }

  get isEnabled(): boolean {
    return typeof this.args.isEnabled === 'boolean'
      ? this.args.isEnabled
      : true;
  }

  @action
  onClick() {
    if (!this.args.onClick || !this.isEnabled) {
      return; // do nothing
    }

    this.args.onClick();
  }
}
