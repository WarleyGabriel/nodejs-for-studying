const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const { createSandbox } = require("sinon");
const Todo = require("../src/todo");

describe("todo", () => {
  before(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("#isValid", () => {
    it("should return invalid when creating an object without text", () => {
      const data = {
        text: "",
        when: new Date("2020-12-01"),
      };

      const todo = new Todo(data);
      const result = todo.isValid();
      expect(result).to.be.not.ok;
    });

    it("should return invalid when creating an object using the 'when' property invalid", () => {
      const data = {
        text: "Hello World",
        when: new Date("20-12-01"),
      };

      const todo = new Todo(data);
      const result = todo.isValid();
      expect(result).to.be.not.ok;
    });

    it("should have 'id, 'text, 'when' and 'status' properties after creating object", () => {
      const data = {
        text: "Hello World",
        when: new Date("2020-12-01"),
      };

      const exepectedId = "00003";

      const uuid = require("uuid");
      const fakeUUID = sandbox.fake.returns(exepectedId);
      sandbox.replace(uuid, uuid.v4.name, fakeUUID);

      const todo = new Todo(data);

      const expected = { ...data, status: "", id: exepectedId };

      const result = todo.isValid();
      expect(result).to.be.ok;

      expect(uuid.v4.calledOnce).to.be.ok;
      expect(todo).to.be.deep.equal(expected);
    });
  });
});
