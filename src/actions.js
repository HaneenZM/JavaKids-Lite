import { HttpError } from 'wasp/server'

export const createLesson = async ({ title, description }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const newLesson = await context.entities.Lesson.create({
    data: {
      title,
      description,
      progress: 0,
      userId: context.user.id
    }
  });
  return newLesson;
}

export const bookSession = async ({ tutorId, studentId, date, type }, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Ensure the user is either the tutor or the student
  if (context.user.id !== tutorId && context.user.id !== studentId) {
    throw new HttpError(403);
  }

  // Create a new session
  const newSession = await context.entities.Session.create({
    data: {
      tutorId,
      studentId,
      date: new Date(date),
      type
    }
  });

  return newSession;
}

export const assignMicrotask = async ({ microtaskId, userId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });
  if (!user || user.age < 16) { throw new HttpError(403, 'User must be 16 or older to be assigned a microtask.') };

  const microtask = await context.entities.Microtask.findUnique({
    where: { id: microtaskId }
  });
  if (!microtask) { throw new HttpError(404, 'Microtask not found.') };

  const updatedMicrotask = await context.entities.Microtask.update({
    where: { id: microtaskId },
    data: { assignedToId: userId }
  });

  return updatedMicrotask;
}
