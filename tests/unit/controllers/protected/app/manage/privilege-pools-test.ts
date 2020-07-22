import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | protected/app/manage/privilege-pools', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:protected/app/manage/privilege-pools');
    assert.ok(controller);
  });
});
