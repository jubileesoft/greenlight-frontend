import Component from '@glimmer/component';

interface SubmitButtonArgs {
  type: string;
}

export default class SubmitButton extends Component<SubmitButtonArgs> {
  get type() {
    return this.args.type || 'secondary';
  }
}
