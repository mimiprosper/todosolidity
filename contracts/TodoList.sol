// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    // Todo struct
    struct Todo {
        uint256 id;
        string content;
        bool completed;
    }

    // Todo array
    Todo[] public todos;
    uint256 public nextId;

    // events
    event TodoCreated(uint256 id, string content, bool completed);
    event TodoCompleted(uint256 id, bool completed);
    event TodoUpdated(uint256 id, string content);
    event TodoDeleted(uint256 id);

    // create function
    function createTodo(string memory _content) external {
        todos.push(Todo(nextId, _content, false));
        emit TodoCreated(nextId, _content, false);
        nextId++;
    }

    //read function
    function readTodo(
        uint256 _id
    )
        external
        view
        returns (uint256 id, string memory content, bool completed)
    {
        require(_id < todos.length, "Todo does not exist");
        Todo memory todo = todos[_id];
        return (todo.id, todo.content, todo.completed);
    }

    // update function
    function updateTodo(uint256 _id, string memory _content) external {
        require(_id < todos.length, "Todo does not exist");
        Todo storage todo = todos[_id];
        todo.content = _content;
        emit TodoUpdated(_id, _content);
    }

    // delete function
    function deleteTodo(uint256 _id) external {
        require(_id < todos.length, "Todo does not exist");
        uint256 lastIndex = todos.length - 1;
        if (_id != lastIndex) {
            todos[_id] = todos[lastIndex];
        }
        todos.pop();
        emit TodoDeleted(_id);
    }

    // toggle function
    function toggleCompleted(uint256 _id) external {
        require(_id < todos.length, "Todo does not exist");
        Todo storage todo = todos[_id];
        todo.completed = !todo.completed;
        emit TodoCompleted(_id, todo.completed);
    }
}
