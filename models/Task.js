var db = require('../dbconnection'); //reference of dbconnection.js

function ObjToArray(obj) {
  var arr = obj instanceof Array;

  return (arr ? obj : Object.keys(obj)).map(function(i) {
    var val = arr ? i : obj[i];
    if(typeof val === 'object')
      return ObjToArray(val);
    else
      return val;
  });
}

var Task = {

  getAllTasks: function (callback) {

    return db.query("Select * from task", callback);

  },
  getTaskById: function (id, callback) {

    return db.query("select * from task where Id=?", [id], callback);
  },
  addTask: function (Task, callback) {
  var responseJson = ObjToArray(Task.tasks);
  var sql = "INSERT INTO task (task, status) VALUES ?";
    return db.query(sql, [responseJson], callback);
  },
  deleteTask: function (id, callback) {
    return db.query("delete from task where Id=?", [id], callback);
  },
  updateTask: function (id, Task, callback) {
    return db.query("update task set Title=?,Status=? where Id=?", [Task.Title, Task.Status, id], callback);
  }

};
module.exports = Task;