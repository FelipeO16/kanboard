export type ID = string;

export interface Board {
  id: ID;
  title: string;
}

export interface Column {
  title: string;
  id: ID;
  tasks: Task[];
  color: string;
}


export interface Task {
  id: ID;
  title: string;
  createdAt: Date;
  color?: string;
  tasks?: Task[];
}
