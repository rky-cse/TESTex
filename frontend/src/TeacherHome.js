import React from 'react';

const TeacherHome = ({ userInfo }) => {
  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <p>Your role: Teacher</p>
      {/* Other content for the TeacherHome page */}
    </div>
  );
};

export default TeacherHome;
