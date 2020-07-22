import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | protected/app/manage/privilege-pools/new', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:protected/app/manage/privilege-pools/new');
    assert.ok(controller);
  });
});
