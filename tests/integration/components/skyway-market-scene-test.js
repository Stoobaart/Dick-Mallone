import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('skyway-market-scene', 'Integration | Component | skyway markets scene', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{skyway-market-scene}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#skyway-markets-scene}}
      template block text
    {{/skyway-markets-scene}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
