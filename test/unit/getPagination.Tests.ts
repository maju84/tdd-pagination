import { assert } from 'assertthat';
import { getPagination } from '../../lib/getPagination';

suite('getPagination', (): void => {
  const values = [
    { current: 1, total: 1, expected: '(1)' },
    { current: 3, total: 4, expected: '1 2 (3) 4' }
  ];

  for (const { current, total, expected } of values) {
    test(`returns ${expected} for page ${current} of ${total}.`,
      async (): Promise<void> => {
        // Arrange
        const currentPage = current;
        const totalPages = total;

        // Act
        const pagination = getPagination({ currentPage, totalPages });

        // Assert
        assert.that(pagination).is.equalTo(expected);
      });
  }
});
