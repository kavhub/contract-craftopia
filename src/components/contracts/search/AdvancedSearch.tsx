import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { SlidersHorizontal, Plus } from "lucide-react";
import { FilterCondition as FilterConditionComponent } from "../filters/FilterCondition";
import type { FilterCondition, FilterGroup } from "../filters/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdvancedSearchProps {
  filters: FilterGroup;
  onFiltersChange: (filters: FilterGroup) => void;
}

export function AdvancedSearch({ filters, onFiltersChange }: AdvancedSearchProps) {
  const addCondition = () => {
    onFiltersChange({
      ...filters,
      conditions: [
        ...filters.conditions,
        { field: 'name', operator: 'contains', value: '', logic: 'AND' },
      ],
    });
  };

  const updateCondition = (index: number, condition: FilterCondition) => {
    const newConditions = [...filters.conditions];
    newConditions[index] = condition;
    onFiltersChange({ ...filters, conditions: newConditions });
  };

  const updateLogic = (index: number, logic: 'AND' | 'OR') => {
    const newConditions = [...filters.conditions];
    if ('field' in newConditions[index]) {
      newConditions[index] = { ...newConditions[index], logic };
    }
    onFiltersChange({ ...filters, conditions: newConditions });
  };

  const removeCondition = (index: number) => {
    onFiltersChange({
      ...filters,
      conditions: filters.conditions.filter((_, i) => i !== index),
    });
  };

  const clearFilters = () => {
    onFiltersChange({ logic: 'AND', conditions: [] });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[440px]">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Build complex filter conditions to refine your search
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-4">
            {filters.conditions.map((condition, index) => (
              'field' in condition && (
                <div key={index} className="space-y-2">
                  {index > 0 && (
                    <Select
                      value={condition.logic || 'AND'}
                      onValueChange={(value) => updateLogic(index, value as 'AND' | 'OR')}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <FilterConditionComponent
                    condition={condition}
                    onChange={(newCondition) => updateCondition(index, newCondition)}
                    onRemove={() => removeCondition(index)}
                  />
                </div>
              )
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={addCondition}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Condition
          </Button>
        </div>

        <SheetFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <Button type="submit" onClick={() => {}}>
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}