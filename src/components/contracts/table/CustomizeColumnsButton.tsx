import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Columns } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleColumnToggle = (columnId: string) => {
    const updatedColumns = localColumns.map((col) =>
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    setLocalColumns(updatedColumns);
  };

  const handleApply = () => {
    onColumnsChange(localColumns);
    setOpen(false);
    toast({
      title: "Columns updated",
      description: "Your column preferences have been saved.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Columns className="h-4 w-4 mr-2" />
          Customize Columns
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Customize Columns</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {localColumns
                .filter(col => col.id !== 'status')
                .map((column) => (
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
        </div>
        <DialogFooter>
          <Button onClick={handleApply} className="w-full">Apply Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}