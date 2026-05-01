import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~components/ui/select'

export function DepartmentButton() {
  return (
    <Select defaultValue="greenhouses" disabled>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Направление" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="greenhouses">Направление Теплицы</SelectItem>
      </SelectContent>
    </Select>
  )
}
