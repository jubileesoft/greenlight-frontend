import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { next } from '@ember/runloop';

interface TagsInputArgs {
  tags: string[];
  selectedTags: string[];
  onChange?(selectedTabs: string[]): void;
  isReadOnly?: boolean;
}

export default class TagsInput extends Component<TagsInputArgs> {
  @tracked isEditMode: boolean = false;
  addButtonIconId = guidFor(this);

  get isReadOnly() {
    if (typeof this.args.isReadOnly !== 'boolean') {
      return false;
    }
    return this.args.isReadOnly;
  }

  @action
  addTag() {
    this.isEditMode = true;
  }

  @action
  onRemoveTag(tag: string) {
    const workingArray = Array.from(this.args.selectedTags);
    const index = workingArray.indexOf(tag);
    if (index === -1) {
      return;
    }

    workingArray.splice(index, 1);
    if (!this.args.onChange) {
      return;
    }
    this.args.onChange(workingArray);
  }

  @action
  onAddTag(tag: string) {
    this.isEditMode = false;

    if (tag) {
      const returnArray = Array.isArray(this.args.selectedTags)
        ? this.args.selectedTags.concat(tag).sort()
        : [tag];

      if (this.args.onChange) {
        this.args.onChange(returnArray);
      }
    }

    next(this, () => {
      const element = document.getElementById(this.addButtonIconId);
      if (!element) {
        return;
      }
      console.log('ok');
      element.focus();
    });
  }
}
