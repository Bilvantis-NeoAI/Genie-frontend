jest.mock('axios', () => ({
    create: jest.fn(() => ({
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
      get: jest.fn(),
      post: jest.fn(),
    })),
  }));
  