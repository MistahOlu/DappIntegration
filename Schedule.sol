// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;



contract Schedule{
    struct Todo{
        string todo;
        bool isCompleted;
        uint lastUpdated;
    }

    Todo[] private todos;
    event CreateTodo(uint);
    event ToggleTodo(uint);

    function createTodo(string calldata _name) public {
        Todo memory todo;
        todo.todo = _name;
        todo.lastUpdated = block.timestamp;
        todos.push(todo);
        emit CreateTodo(todos.length - 1);
    }

    function toggleTodo(uint index) external {
        Todo storage todo = todos[index];
        todo.isCompleted = !todo.isCompleted;
        todo.lastUpdated = block.timestamp;
        emit ToggleTodo(index);
    }

    function getAllTodos() public view returns (Todo[] memory) {
        return todos;
    }
}
