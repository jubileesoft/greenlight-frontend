import Component from '@glimmer/component';

interface ActionArgs {
  side?: string;
}

export default class Action extends Component<ActionArgs> {
  get side() {
    return this.args.side || 'right';
  }
}
