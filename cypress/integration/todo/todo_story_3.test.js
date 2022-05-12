describe('Story 3: Mark item as done', () => {
    const todoItems = ['first todo item', 'second todo item'];

    beforeEach(() => {
        cy.visit('/');
        todoItems.forEach(todoItem =>
            cy.get('input').first().clear().type(todoItem).next().click(),
        );
    });

    it('should mark item as finished', () => {
        // given
        cy.get('ol').last().children('li').first().as('first-listed-todo');

        // when
        cy.get('@first-listed-todo').children('input').click();

        // then
        cy.get('@first-listed-todo')
            .children('input')
            .should('be.checked')
            .next()
            .should('have.css', 'text-decoration', 'line-through solid rgb(128, 128, 128)');

        cy.get('@first-listed-todo').next()
            .children('input')
            .should('not.be.checked')
            .next()
            .should('not.have.css', 'text-decoration', 'line-through solid rgb(128, 128, 128)');
    });

    it('should uncheck item to active', () => {
        // given
        cy.get('ol').last().children('li').as('listed-todos');

        // when
        cy.get('@listed-todos').first().children('input').click();
        cy.get('@listed-todos').first().children('input').click();

        // then
        cy.get('@listed-todos').each(item => {
            cy.wrap(item)
                .children('input').should('not.be.checked')
                .next()
                .should('not.have.css', 'text-decoration', 'line-through solid rgb(128, 128, 128)');
        });
    });
});
