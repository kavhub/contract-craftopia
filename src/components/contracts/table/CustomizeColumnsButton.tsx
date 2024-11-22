import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Columns } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ColumnDefinition = {
  id: string;
  label: string;
  visible: boolean;
};

interface CustomizeColumnsButtonProps {
  columns: ColumnDefinition[];
  onColumnsChange: (columns: ColumnDefinition[]) => void;
}

export function CustomizeColumnsButton({
  columns,
  onColumnsChange,
}: CustomizeColumnsButtonProps) {
  const [localColumns, setLocalColumns] = useState(columns);

  const handleColumnToggle = (columnId: string) => {
    const updatedColumns = localColumns.map((col) =>
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    setLocalColumns(updatedColumns);
    onColumnsChange(updatedColumns);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Columns className="h-4 w-4 mr-2" />
          Customize Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] p-2">
        <div className="space-y-2">
          {localColumns.map((column) => (
            <div key={column.id} className="flex items-center space-x-2">
              <Checkbox
                id={column.id}
                checked={column.visible}
                onCheckedChange={() => handleColumnToggle(column.id)}
              />
              <label
                htmlFor={column.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {column.label}
              </label>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}