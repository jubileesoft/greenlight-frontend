import Component from '@glimmer/component';

interface NavbarIconArgs {
  icon: string;
  size?: string;
}

export default class NavbarIcon extends Component<NavbarIconArgs> {
  get size() {
    return this.args.size || '2x';
  }
}
