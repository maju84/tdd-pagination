import { assert } from 'assertthat';
import { getPagination } from '../../lib/getPagination';

suite('getPagination', (): void => {
  test(`returns '(1)' for page 1 of 1.`,
    async (): Promise<void> => {

      // Arrange
      const currentPage = 1;
      const totalPages = 1;

      // Act
      const pagination = getPagination({ currentPage, totalPages });

      // Assert
      assert.that(pagination).is.equalTo('(1)');
    });

   test(`returns '1 2 (3) 4' for page 3 of 4.`,
    async (): Promise<void> => { 
      // Arrange
      const currentPage = 3,
            totalPages = 4;

      // Act
      const pagination = getPagination({ currentPage, totalPages });

      // Assert
      assert.that(pagination).is.equalTo('1 2 (3) 4');
    });
});
