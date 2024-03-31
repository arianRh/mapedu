import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const tasksStore = (set) => ({
  tasks: [],
  addTask: (task) => {
    set((state) => ({
      tasks: [task, ...state.tasks],
    }));
  },
  removeTodo: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((todo) => todo.id !== id),
    }));
  },
  inc: (event) =>
    set((state) => {
      const nextShapes = state.tasks.map((shape) => {
        if (shape.id === event.id) {
          return {
            ...shape,
            title: event.title,
            description: event.description,
            priority: event.priority,
            date: event.date,
            condition: event.condition,
            type: event.type,
          };
        } else {
          return shape;
        }
      });
      return {
        tasks: nextShapes,
      };
    }),
});

const useTasksStore = create(devtools(persist(tasksStore, { name: "tasks" })));

export default useTasksStore;
