'use strict';

(function () {
  let student = { name: 'James' };
  
  function createStudent(name) {
    student = { name: name };
    return student;
  }
  
  console.log(createStudent('Ken'));
  console.log(student);
})();