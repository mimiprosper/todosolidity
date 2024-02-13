import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TodoList", function () {
  let todoList;

  beforeEach(async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
    await todoList.deployed();
  });

  it("should create a new todo", async function () {
    await todoList.createTodo("Buy groceries");
    const todo = await todoList.readTodo(0);
    expect(todo.content).to.equal("Buy groceries");
    expect(todo.completed).to.equal(false);
  });

  it("should update a todo", async function () {
    await todoList.createTodo("Buy groceries");
    await todoList.updateTodo(0, "Buy vegetables");
    const todo = await todoList.readTodo(0);
    expect(todo.content).to.equal("Buy vegetables");
  });

  it("should toggle todo completion status", async function () {
    await todoList.createTodo("Buy groceries");
    await todoList.toggleCompleted(0);
    let todo = await todoList.readTodo(0);
    expect(todo.completed).to.equal(true);
    await todoList.toggleCompleted(0);
    todo = await todoList.readTodo(0);
    expect(todo.completed).to.equal(false);
  });

  it("should delete a todo", async function () {
    await todoList.createTodo("Buy groceries");
    await todoList.createTodo("Do laundry");
    await todoList.deleteTodo(0);
    const todo = await todoList.readTodo(0);
    expect(todo.content).to.equal("Do laundry");
  });

  it("should not allow reading non-existent todo", async function () {
    await expect(todoList.readTodo(0)).to.be.rejectedWith(
      "Todo does not exist"
    );
  });

  it("should not allow updating non-existent todo", async function () {
    await expect(todoList.updateTodo(0, "Some content")).to.be.rejectedWith(
      "Todo does not exist"
    );
  });

  it("should not allow toggling completion status of non-existent todo", async function () {
    await expect(todoList.toggleCompleted(0)).to.be.rejectedWith(
      "Todo does not exist"
    );
  });

  it("should not allow deleting non-existent todo", async function () {
    await expect(todoList.deleteTodo(0)).to.be.rejectedWith(
      "Todo does not exist"
    );
  });
});
