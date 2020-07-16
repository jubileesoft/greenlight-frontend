import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface InlineInputArgs {
  onChange(value: any): Promise<void>;
  value: any;
}

export default class InlineInput extends Component<InlineInputArgs> {
  @tracked isOnChangeError = false;
  @tracked isOnChange = false;

  @action
  async onBlur(event) {
    console.log('blur');
    if (!this.args.onChange || event.target.value === this.args.value) {
      return;
    }

    try {
      this.isOnChange = true;
      await this.args.onChange(event.target.value);
      this.isOnChange = false;

      this.isOnChangeError = false;
    } catch (error) {
      debugger;
      this.isOnChange = false;
      this.isOnChangeError = true;
      throw error;
    }
  }
}
