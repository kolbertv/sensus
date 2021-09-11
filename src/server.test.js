const http = require("http");

describe("server starting", () => {
  const server = {
    listen: jest.fn(),
    on: jest.fn(),
  };

  http.createServer = jest.fn(() => server);
  require("./server");

  it("create server", () => {
    expect(http.createServer).toBeCalled();
  });

  it("server listen", () => {
    expect(server.listen).toBeCalledWith(expect.any(Number), expect.any(Function));
  });

  it("server request event", () => {
    expect(server.on).toBeCalledWith("request", expect.any(Function));
  });
});
