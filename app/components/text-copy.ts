import Component from '@glimmer/component';
import { action } from '@ember/object';

interface TextCopyArgs {
  text: string;
}

export default class TextCopy extends Component<TextCopyArgs> {
  @action
  copyToClipboard() {
    navigator.clipboard.writeText(this.args.text);
  }
}
