import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | protected/app/manage/privilege-pools/id/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:protected/app/manage/privilege-pools/id/index');
    assert.ok(route);
  });
});
