import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | protected/admin-apps', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:protected/admin-apps');
    assert.ok(controller);
  });
});
