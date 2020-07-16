import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export enum RecordType {
  INFO,
  WARNING,
  ERROR,
}

export interface Record {
  at: Date;
  type: RecordType;
  text: string;
}

export default class Recorder extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @tracked show = false;
  @tracked record: Record | null = null;
  records: Record[] = [];
  timer: NodeJS.Timeout | null = null;
  timeout: number = 4000;

  addRecord(type: RecordType, text: string) {
    const record: Record = {
      at: new Date(),
      type,
      text,
    };

    this.records.push(record);
    this.record = record;

    this.show = true;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (type === RecordType.ERROR) {
      return;
    }

    this.timer = setTimeout(() => {
      this.show = false;
      this.timer = null;
    }, this.timeout);
  }

  @action
  unshow() {
    this.show = false;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    recorder: Recorder;
  }
}
