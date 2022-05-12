describe('Story 3: Filter TODO list items', () => {
    const radioButtons = ['All', 'Active', 'Finished'];

    beforeEach(() => {
        cy.visit('/');
    });

    describe('Item filters rendering', () => {
        it('should render filters', () => {
            cy.get('input').filter('[type="radio"]').should('have.length', 3)
                .parent()
                .within(() => {
                    radioButtons.forEach(radio =>
                        cy.get(`input[value="${radio}"]`).type(`${radio}`).should('exist').next().contains(radio));
                });
        });

        it('should render `All` as selected by default', () => {
            cy.get('input').filter('[type="radio"][value="All"]').should('be.checked');
            cy.get('input').filter('[type="radio"][value="Active"]').should('not.be.checked');
            cy.get('input').filter('[type="radio"][value="Finished"]').should('not.be.checked');
        });

        it('should only one radio button be checked', () => {
            radioButtons.reverse().forEach(toBeSelected => {
                cy.get('input').filter(`[type="radio"][value="${toBeSelected}"]`).click();
                radioButtons.filter(unselected => toBeSelected !== unselected)
                    .forEach(unselected =>
                        cy.get('input').filter(`[type="radio"][value="${unselected}"]`).should('not.be.checked'),
                    );
            });
        });
    });

    describe('Item filters', () => {
        const todoItems = [
            'active todo item 1',
            'finished todo item 1',
            'active todo item 2',
            'finished todo item 2',
        ];

        beforeEach(() => {
            todoItems.forEach(todoItem =>
                cy.get('input').first().clear().type(todoItem).next().click(),
            );
            cy.get('ol').last().children('li')
                .filter(':contains(finished)')
                .each(finished => cy.wrap(finished).children('input').click());
        });

        it('should show all todo items', () => {
            // when
            cy.get('input').filter('[type="radio"][value="All"]').click();

            // then
            cy.get('ol').last().children('li')
                .should('have.length', todoItems.length).as('todo-items');
            cy.get('@todo-items')
                .first().contains('active todo item 1')
                .parent().next().contains('finished todo item 1')
                .parent().next().contains('active todo item 2')
                .parent().next().contains('finished todo item 2');
        });

        it('should show only active items', () => {
            // when
            cy.get('input').filter('[type="radio"][value="Active"]').click();

            // then
            cy.get('ol').last().children('li')
                .should('have.length', 2)
                .first().contains('active todo item 1')
                .parent().next().contains('active todo item 2');
        });

        it('should show only finished items', () => {
            // when
            cy.get('input').filter('[type="radio"][value="Finished"]').click();

            // then
            cy.get('ol').last().children('li')
                .should('have.length', 2)
                .first().contains('finished todo item 1')
                .parent().next().contains('finished todo item 2');
        });

        it('should removed item from active view when marked as finished', () => {
            // given
            cy.get('input').filter('[type="radio"][value="Active"]').click();

            // when
            cy.get('ol').last().children('li')
                .filter(':contains(active todo item 1)').first().children('input').click();

            // then
            cy.get('ol').last().children('li')
                .should('have.length', 1)
                .first().contains('active todo item 2');
        });

        it('should removed item from finished view when marked as active', () => {
            // given
            cy.get('input').filter('[type="radio"][value="Finished"]').click();

            // when
            cy.get('ol').last().children('li')
                .filter(':contains(finished todo item 1)').first().children('input').click();

            // then
            cy.get('ol').last().children('li')
                .should('have.length', 1)
                .first().contains('finished todo item 2');
        });
    });
});
