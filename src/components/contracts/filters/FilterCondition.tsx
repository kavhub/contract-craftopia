import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { FILTER_FIELDS, OPERATORS, type FilterCondition as IFilterCondition } from "./types";

interface FilterConditionProps {
  condition: IFilterCondition;
  onChange: (condition: IFilterCondition) => void;
  onRemove: () => void;
}

export function FilterCondition({ condition, onChange, onRemove }: FilterConditionProps) {
  const selectedField = FILTER_FIELDS.find(f => f.id === condition.field);
  const applicableOperators = Object.entries(OPERATORS)
    .filter(([_, op]) => selectedField && op.appliesTo.includes(selectedField.type))
    .map(([key, op]) => ({ value: key, label: op.label }));

  return (
    <div className="flex gap-2 items-center">
      <Select
        value={condition.field}
        onValueChange={(value) => onChange({ ...condition, field: value })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {FILTER_FIELDS.map((field) => (
            <SelectItem key={field.id} value={field.id}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={condition.operator}
        onValueChange={(value) => onChange({ ...condition, operator: value as IFilterCondition['operator'] })}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select operator" />
        </SelectTrigger>
        <SelectContent>
          {applicableOperators.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type={selectedField?.type === 'number' ? 'number' : 'text'}
        value={condition.value}
        onChange={(e) => onChange({ ...condition, value: e.target.value })}
        className="w-[200px]"
      />

      <Button variant="ghost" size="icon" onClick={onRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}