import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Columns } from "lucide-react";
import { useState } from "react";

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
  };

  const handleApply = () => {
    onColumnsChange(localColumns);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Columns className="h-4 w-4 mr-2" />
          Customize Columns
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Columns</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] px-4">
          <div className="space-y-4">
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
        </ScrollArea>
        <div className="flex justify-end">
          <Button onClick={handleApply}>Apply Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}