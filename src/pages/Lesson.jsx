import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getLessons } from 'wasp/client/operations';

const LessonPage = () => {
  const { lessonId } = useParams();
  const { data: lessons, isLoading, error } = useQuery(getLessons);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const lesson = lessons.find(lesson => lesson.id === parseInt(lessonId));
  if (!lesson) return 'Lesson not found';

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p className="mb-4">{lesson.description}</p>
      <div className="flex items-center">
        <span className="mr-2">Progress:</span>
        <progress value={lesson.progress} max="100" className="w-full h-4"></progress>
        <span className="ml-2">{lesson.progress}%</span>
      </div>
    </div>
  );
}

export default LessonPage;
