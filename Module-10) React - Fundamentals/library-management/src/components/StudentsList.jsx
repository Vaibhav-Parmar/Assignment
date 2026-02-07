import React from 'react';

const StudentsList = () => {
  const students = [
    { id: 1, name: 'Alice Johnson', grade: '10th', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', grade: '11th', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', grade: '9th', email: 'charlie@example.com' },
  ];

  return (
    <div>
      <h2>Students List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <strong>{student.name}</strong> - Grade: {student.grade}, Email: {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;