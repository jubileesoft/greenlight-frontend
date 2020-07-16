import Component from '@glimmer/component';
import { action } from '@ember/object';

const MODE = {
  DISPLAY: 'display',
  EDIT: 'edit',
};

interface TagsInputArgs {
  mode?: string;
  value?: string;
  onRemove(tag?: string): void;
  onAdd(tag: string): void;
}

export default class TagsInput extends Component<TagsInputArgs> {
  get mode() {
    return this.args.mode || MODE.EDIT;
  }

  @action
  onDidInsertInputEditMode(element: HTMLInputElement) {
    element.focus();
  }

  @action
  triggerOnAdd(event: KeyboardEvent) {
    if (!this.args.onAdd) {
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    this.args.onAdd(value);
  }

  @action
  onRemove() {
    if (!this.args.onRemove) {
      return;
    }

    this.args.onRemove(this.args.value);
  }
}
