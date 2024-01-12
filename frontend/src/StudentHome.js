import React from 'react'

const StudentHome = ({userInfo}) => {
  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <p>Your role: Student</p>
      {/* Other content for the TeacherHome page */}
    </div>
  );
}

export default StudentHome