export type Todo = {
  id: string;
  title: string;
  description?: string | null;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodoPayload = {
  title: string;
  description?: string;
};
