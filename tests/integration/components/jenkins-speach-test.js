import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jenkins-speach', 'Integration | Component | jenkins speach', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jenkins-speach}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#jenkins-speach}}
      template block text
    {{/jenkins-speach}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
