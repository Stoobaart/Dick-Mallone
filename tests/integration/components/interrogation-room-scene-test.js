import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('interrogation-room-scene', 'Integration | Component | interrogation room scene', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{interrogation-room-scene}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#interrogation-room-scene}}
      template block text
    {{/interrogation-room-scene}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
