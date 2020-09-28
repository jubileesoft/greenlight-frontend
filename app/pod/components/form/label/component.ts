import Component from '@glimmer/component';

interface FormLabelArgs {
  text: string;
  isMandatory?: boolean;
}

export default class FormLabel extends Component<FormLabelArgs> {
  get isMandatory() {
    return this.args.isMandatory ?? false;
  }
}
