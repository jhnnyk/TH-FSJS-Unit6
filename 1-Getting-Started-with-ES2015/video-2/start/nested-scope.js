'use strict';

(function () {
  const student = { name: 'James' };
  
  function createStudent(name) {
    const student = { name: name };
    return student;
  }
  
  console.log(createStudent('Ken'));
  console.log(student);
})();