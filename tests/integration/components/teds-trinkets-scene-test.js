import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('teds-trinkets-scene', 'Integration | Component | teds trinkets scene', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{teds-trinkets-scene}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#teds-trinkets-scene}}
      template block text
    {{/teds-trinkets-scene}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
