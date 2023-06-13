export interface Todo {
  id?: number,
  name: string,
  description: string,
  dueDate: Date,
  priority: string,
  isShowDetail?: boolean
  isChecked?: boolean
}
