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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FilterCondition as FilterConditionComponent } from "../filters/FilterCondition";
import type { FilterCondition, FilterGroup } from "../filters/types";

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
        { field: 'name', operator: 'contains', value: '' },
      ],
    });
  };

  const updateCondition = (index: number, condition: FilterCondition) => {
    const newConditions = [...filters.conditions];
    newConditions[index] = condition;
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
      <SheetContent className="min-w-[400px]">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Build complex filter conditions to refine your search
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label>Combine conditions using</Label>
            <RadioGroup
              value={filters.logic}
              onValueChange={(value) => onFiltersChange({ ...filters, logic: value as 'AND' | 'OR' })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="AND" id="and" />
                <Label htmlFor="and">Match ALL conditions (AND)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="OR" id="or" />
                <Label htmlFor="or">Match ANY condition (OR)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            {filters.conditions.map((condition, index) => (
              'field' in condition && (
                <FilterConditionComponent
                  key={index}
                  condition={condition}
                  onChange={(newCondition) => updateCondition(index, newCondition)}
                  onRemove={() => removeCondition(index)}
                />
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