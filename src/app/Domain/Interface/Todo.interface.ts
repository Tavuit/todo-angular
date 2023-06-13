export interface Todo {
  id?: string,
  name: string,
  description: string,
  dueDate: Date,
  priority: number,
  isShowDetail?: boolean
  isChecked?: boolean
}
