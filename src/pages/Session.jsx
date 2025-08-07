import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getSessions } from 'wasp/client/operations';

const SessionPage = () => {
  const { sessionId } = useParams();
  const { data: sessions, isLoading, error } = useQuery(getSessions);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const session = sessions.find(session => session.id === parseInt(sessionId));
  if (!session) return 'Session not found.';

  return (
    <div className='p-4 bg-slate-50 rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>Session Details</h1>
      <p><strong>Date:</strong> {new Date(session.date).toLocaleString()}</p>
      <p><strong>Type:</strong> {session.type}</p>
      <p><strong>Tutor ID:</strong> {session.tutorId}</p>
      <p><strong>Student ID:</strong> {session.studentId}</p>
    </div>
  );
}

export default SessionPage;
