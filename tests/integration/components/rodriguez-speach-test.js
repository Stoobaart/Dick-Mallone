import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rodriguez-speach', 'Integration | Component | rodriguez speach', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rodriguez-speach}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rodriguez-speach}}
      template block text
    {{/rodriguez-speach}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
