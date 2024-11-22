import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Download, Eye, ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Contract } from "./types";
import { type ColumnDefinition } from "./CustomizeColumnsButton";

interface ContractTableRowProps {
  contract: Contract;
  visibleColumns: ColumnDefinition[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  renderCellContent: (contract: Contract, columnId: string) => React.ReactNode;
}

export function ContractTableRow({
  contract,
  visibleColumns,
  isExpanded,
  onToggleExpand,
  renderCellContent,
}: ContractTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onToggleExpand}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </TableCell>
      {visibleColumns
        .filter((col) => col.visible)
        .map((column) => (
          <TableCell key={column.id}>
            {renderCellContent(contract, column.id)}
          </TableCell>
        ))}
      <TableCell className="text-right sticky right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to={`/contracts/${contract.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}