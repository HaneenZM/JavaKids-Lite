import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getMicrotasks, assignMicrotask } from 'wasp/client/operations';

const MicrotaskPage = () => {
  const { microtaskId } = useParams();
  const { data: microtasks, isLoading, error } = useQuery(getMicrotasks);
  const assignMicrotaskFn = useAction(assignMicrotask);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const microtask = microtasks.find(task => task.id === parseInt(microtaskId));
  if (!microtask) return 'Microtask not found';

  const handleAssignMicrotask = () => {
    assignMicrotaskFn({ microtaskId: microtask.id, userId: 1 }); // Replace 1 with actual user ID
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{microtask.title}</h1>
      <p className="mb-4">{microtask.description}</p>
      <p className="mb-4">Reward: {microtask.reward} points</p>
      <button
        onClick={handleAssignMicrotask}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Accept Microtask
      </button>
    </div>
  );
};

export default MicrotaskPage;
