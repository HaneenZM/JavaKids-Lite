import { HttpError } from 'wasp/server'

export const getLessons = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Lesson.findMany({
    where: { userId: context.user.id }
  });
}

export const getSessions = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Session.findMany({
    where: {
      OR: [
        { tutorId: context.user.id },
        { studentId: context.user.id }
      ]
    }
  });
}

export const getMicrotasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Microtask.findMany({
    where: {
      assignedTo: null
    }
  });
}
