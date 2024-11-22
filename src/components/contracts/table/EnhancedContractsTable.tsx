import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Eye, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type ColumnDefinition } from "./CustomizeColumnsButton";

interface Contract {
  id: number;
  name: string;
  type: string;
  dateUploaded: string;
  status: string;
  currency?: string;
  value?: number;
  parties?: string[];
  restrictions?: string;
  terms?: Record<string, string>;
}

interface EnhancedContractsTableProps {
  contracts: Contract[];
  visibleColumns: ColumnDefinition[];
}

export function EnhancedContractsTable({
  contracts,
  visibleColumns,
}: EnhancedContractsTableProps) {
  const renderCellContent = (contract: Contract, columnId: string) => {
    const content = (() => {
      switch (columnId) {
        case "name":
          return contract.name;
        case "type":
          return contract.type;
        case "dateUploaded":
          return format(new Date(contract.dateUploaded), "MMM d, yyyy");
        case "status":
          return (
            <Badge
              variant={
                contract.status === "Active"
                  ? "default"
                  : contract.status === "Pending"
                  ? "secondary"
                  : "outline"
              }
            >
              {contract.status}
            </Badge>
          );
        case "currency":
          return contract.currency;
        case "value":
          return contract.value?.toLocaleString();
        case "parties":
          return contract.parties?.join(", ");
        case "restrictions":
          return contract.restrictions;
        default:
          return contract.terms?.[columnId];
      }
    })();

    return content ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="truncate max-w-[200px]">{content}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      "-"
    );
  };

  return (
    <div className="border rounded-lg">
      <ScrollArea className="w-full" type="always">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]" />
                {visibleColumns
                  .filter((col) => col.visible)
                  .map((column) => (
                    <TableHead key={column.id} className="min-w-[150px]">
                      {column.label}
                    </TableHead>
                  ))}
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length + 2}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No contracts found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    {visibleColumns
                      .filter((col) => col.visible)
                      .map((column) => (
                        <TableCell key={column.id}>
                          {renderCellContent(contract, column.id)}
                        </TableCell>
                      ))}
                    <TableCell className="text-right">
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}