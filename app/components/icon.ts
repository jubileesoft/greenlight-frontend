import Component from '@glimmer/component';

interface IconArgs {
  icon: string;
  size?: string;
  isEnabled?: boolean;
}

export default class Icon extends Component<IconArgs> {
  get size() {
    return this.args.size || 'lg';
  }

  get isEnabled() {
    if (typeof this.args.isEnabled === 'boolean') {
      return this.args.isEnabled;
    }

    return true;
  }
}
