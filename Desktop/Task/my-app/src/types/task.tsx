export interface Task {
  id: number;
  text: string;
  done: boolean;
  category?: string; // Optional category field
}