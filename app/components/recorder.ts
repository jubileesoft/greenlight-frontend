import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import RecorderService, {
  RecordType,
} from 'greenlight-frontend/services/recorder';

interface RecorderArgs {}

export default class Recorder extends Component<RecorderArgs> {
  @service recorder!: RecorderService;

  get isError() {
    return this.recorder.record?.type === RecordType.ERROR;
  }

  get isWarning() {
    return this.recorder.record?.type === RecordType.WARNING;
  }

  get isInfo() {
    return this.recorder.record?.type === RecordType.INFO;
  }
}
