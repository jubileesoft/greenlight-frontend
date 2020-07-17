import Component from '@glimmer/component';

interface FormInputArgs {
  size: string;
}

export default class FormInput extends Component<FormInputArgs> {
  get size() {
    return this.args.size || '1x';
  }
}
