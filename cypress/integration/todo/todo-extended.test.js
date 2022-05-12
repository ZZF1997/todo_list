describe('Story 3: Filter TODO list items', () => {
  const radioButtons = ['All', 'Active', 'Finished'];

  beforeEach(() => {
    cy.visit('/');
  });

  it('should clear input box after adding', () => {
    // given
    const todoItem = 'some todo item';

    // when
    cy.get('input').first().clear().type(todoItem).next().click();

    // then
    cy.get('input').first().should('have.value', '');
  });

  it('should trim todo on adding', () => {
    // given
    const untrimmedTodoItem = '\tsome todo item\t';

    // when
    cy.get('input').first().clear().type(untrimmedTodoItem).next().click();

    // then
    cy.get('ol').last().children('li').first().children('input').next()
      .contains(untrimmedTodoItem.trim())
      .contains(/^\S.*\S$/);
  });

  it('should not show new added items directly on finished view', () => {
    // given
    [
      'active todo item 1',
      'finished todo item 1',
      'active todo item 2',
      'finished todo item 2',
    ].forEach(todoItem =>
      cy.get('input').first().clear().type(todoItem).next().click(),
    );
    cy.get('ol').last().children('li')
      .filter(':contains(finished)')
      .each(finished => cy.wrap(finished).children('input').click());

    const todoItem = 'some todo item';
    cy.get('input').filter('[type="radio"][value="Finished"]').click();

    // when
    cy.get('input').first().clear().type(todoItem).next().click();

    // then
    cy.get('ol').last().children('li')
      .should('have.length', 2)
      .first().contains('finished todo item 1')
      .parent().next().contains('finished todo item 2');

    // when
    cy.get('input').filter('[type="radio"][value="Active"]').click();
    cy.get('ol').last().children('li')
      .should('have.length', 3)
      .first().contains('active todo item 1')
      .parent().next().contains('active todo item 2')
      .parent().next().contains(todoItem);
  });

  it('should hide error for non-blank input', () => {
    const blankTodoItem = '\t  \t ';
    const todoItem = 'some todo item';

    // when
    cy.get('input').first().clear().type(blankTodoItem).next().click();
    cy.get('input').first().clear().type(todoItem).next().click();

    // then
    cy.contains('Please input something first.').should('not.exist');
    cy.get('ol').last().children('li')
      .should('have.length', 1);
  });
});
