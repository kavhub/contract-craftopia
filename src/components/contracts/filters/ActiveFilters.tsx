import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FILTER_FIELDS, type FilterCondition, type FilterGroup } from "./types";

interface ActiveFiltersProps {
  filters: FilterGroup;
  onRemoveCondition: (index: number) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemoveCondition, onClearAll }: ActiveFiltersProps) {
  if (filters.conditions.length === 0) return null;

  const getFieldLabel = (fieldId: string) => {
    return FILTER_FIELDS.find(f => f.id === fieldId)?.label || fieldId;
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {filters.conditions.map((condition, index) => {
        if ('field' in condition) {
          return (
            <Badge key={index} variant="secondary" className="gap-1">
              {getFieldLabel(condition.field)} {condition.operator} {condition.value}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => onRemoveCondition(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        }
        return null;
      })}
      <Button variant="ghost" size="sm" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  );
}