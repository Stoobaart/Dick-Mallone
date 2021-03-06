import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('drummer-speach', 'Integration | Component | drummer speach', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{drummer-speach}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#drummer-speach}}
      template block text
    {{/drummer-speach}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
