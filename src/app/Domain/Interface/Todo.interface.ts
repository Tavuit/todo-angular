export interface Todo {
  id?: string,
  name: string,
  description: string,
  dueDate: Date,
  priority: string,
  isShowDetail?: boolean
  isChecked?: boolean
}
