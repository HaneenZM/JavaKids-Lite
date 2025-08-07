import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getLessons, getSessions, getMicrotasks } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: lessons, isLoading: lessonsLoading, error: lessonsError } = useQuery(getLessons);
  const { data: sessions, isLoading: sessionsLoading, error: sessionsError } = useQuery(getSessions);
  const { data: microtasks, isLoading: microtasksLoading, error: microtasksError } = useQuery(getMicrotasks);

  if (lessonsLoading || sessionsLoading || microtasksLoading) return 'Loading...';
  if (lessonsError || sessionsError || microtasksError) return 'Error loading data.';

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Lessons</h2>
        {lessons.map(lesson => (
          <div key={lesson.id} className="bg-blue-100 p-4 mb-2 rounded">
            <h3 className="font-bold">{lesson.title}</h3>
            <p>{lesson.description}</p>
            <p>Progress: {lesson.progress}%</p>
            <Link to={`/lesson/${lesson.id}`} className="text-blue-500 hover:underline">View Lesson</Link>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Sessions</h2>
        {sessions.map(session => (
          <div key={session.id} className="bg-green-100 p-4 mb-2 rounded">
            <p>Tutor ID: {session.tutorId}</p>
            <p>Student ID: {session.studentId}</p>
            <p>Date: {new Date(session.date).toLocaleString()}</p>
            <p>Type: {session.type}</p>
            <Link to={`/session/${session.id}`} className="text-green-500 hover:underline">View Session</Link>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Available Microtasks</h2>
        {microtasks.map(microtask => (
          <div key={microtask.id} className="bg-yellow-100 p-4 mb-2 rounded">
            <h3 className="font-bold">{microtask.title}</h3>
            <p>{microtask.description}</p>
            <p>Reward: {microtask.reward} points</p>
            <Link to={`/microtask/${microtask.id}`} className="text-yellow-500 hover:underline">View Microtask</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
