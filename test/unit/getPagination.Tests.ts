import { assert } from 'assertthat';
import { getPagination } from '../../lib/getPagination';

suite('getPagination', (): void => {
  suite('simple cases without ellipsis', (): void => {
    const values = [
      { current: 1, total: 1, expected: '(1)' },
      { current: 3, total: 4, expected: '1 2 (3) 4' },
      { current: 1, total: 7, expected: '(1) 2 3 4 5 6 7' },
      { current: 3, total: 7, expected: '1 2 (3) 4 5 6 7' },
      { current: 7, total: 7, expected: '1 2 3 4 5 6 (7)' }
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

  suite('more complex cases with ellipsis', (): void => {
    const values = [
      { current: 42, total: 103, expected: '1 ... 41 (42) 43 ... 103' },
      { current: 23, total: 87, expected: '1 ... 22 (23) 24 ... 87' }
    ];

    for (const { current, total, expected } of values) {
      test(`returns ${expected} for page ${current} of ${total}.`,
        async (): Promise<void> => {
          // Arrange
          const currentPage = current,
                totalPages = total;

          // Act
          const pagination = getPagination({ currentPage, totalPages });

          // Assert
          assert.that(pagination).is.equalTo(expected);
        });
    }
  });

  suite('error cases', (): void => {
    test('throws exception if totalPages is 0.',
      async (): Promise<void> => {
        // Arrange
        const currentPage = 1,
              totalPages = 0;

        // Act + Assert
        assert.that((): void => {
          getPagination({ currentPage, totalPages });
        }).is.throwing('totalPages must be at least 1.');
      });

    test('throws exception if totalPages is less than 0.',
      async (): Promise<void> => {
        // Arrange
        const currentPage = 1,
              totalPages = -1;

        // Act + Assert
        assert.that((): void => {
          getPagination({ currentPage, totalPages });
        }).is.throwing('totalPages must be at least 1.');
      });

    test('throws exception if currentPage is 0.',
      async (): Promise<void> => {
        // Arrange
        const currentPage = 0,
              totalPages = 1;

        // Act + Assert
        assert.that((): void => {
          getPagination({ currentPage, totalPages });
        }).is.throwing('currentPage must be at least 1.');
      });

    test('throws exception if currentPage is less than 0.',
      async (): Promise<void> => {
        // Arrange
        const currentPage = -1,
              totalPages = 1;

        // Act + Assert
        assert.that((): void => {
          getPagination({ currentPage, totalPages });
        }).is.throwing('currentPage must be at least 1.');
      });

    test('throws exception if currentPage is greater than totalPages.',
      async (): Promise<void> => {
        // Arrange
        const currentPage = 42,
              totalPages = 1;

        // Act + Assert
        assert.that((): void => {
          getPagination({ currentPage, totalPages });
        }).is.throwing('currentPage must be lower or equal to totalPages.');
      });
  });
});
