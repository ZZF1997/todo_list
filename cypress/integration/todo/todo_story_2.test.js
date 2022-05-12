describe('Story 2: Add items to TODO list', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should render empty TODO list initially', () => {
        cy.get('ol').last().children()
            .should('have.length', 0);
    });

    it('should input todo', () => {
        // given
        const todoItem = 'some todo item';

        // when
        cy.get('input').first().clear().type(todoItem);

        // then
        cy.get('input').first().should('have.value', todoItem);
    });

    it('should add item to list', () => {
        // given
        const todoItem = 'some todo item';

        // when
        cy.get('input').first().clear().type(todoItem).next().click();

        // then
        cy.get('ol').last().children('li').as('listed-todos');

        cy.get('@listed-todos').should('have.length', 1);
        cy.get('@listed-todos').first().as('only-listed-todo');
        cy.get('@only-listed-todo')
            .children('input').should('have.attr', 'type', 'checkbox')
            .next()
            .contains(todoItem);
    });

    it('should add multiple items to list', () => {
        // given
        const numbers = [...Array(4).keys()];

        // when
        numbers.forEach(i => {
            cy.get('input').first().clear().type('' + i).next().click();
        });

        // then
        cy.get('ol').last().children('li').should('have.length', numbers.length);
    });

    it('should show error for blank input', () => {
        // given
        const blankTodoItem = '\t  \t ';

        // when
        cy.get('input').first().clear().type(blankTodoItem).next().click();

        // then
        cy.contains('Please input something first.')
            .should('have.length', 1)
            .should('have.css', 'background-color', 'rgb(255, 182, 193)');

        cy.get('ol').last().children('li')
            .should('have.length', 0);
    });

});
