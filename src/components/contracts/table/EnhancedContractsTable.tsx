import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { Download, Eye, ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type ColumnDefinition } from "./CustomizeColumnsButton";
import { useState } from "react";
import { TableCellWithTooltip } from "./TableCellWithTooltip";
import { ResizableHeader } from "./ResizableHeader";

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
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (contractId: number) => {
    setExpandedRows(prev =>
      prev.includes(contractId)
        ? prev.filter(id => id !== contractId)
        : [...prev, contractId]
    );
  };

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

    return content || "-";
  };

  return (
    <div className="border rounded-lg">
      <ScrollArea className="w-full overflow-x-auto" type="always">
        <div className="min-w-[800px]">
          <Table>
            <thead className="bg-background">
              <TableRow>
                <ResizableHeader fixed className="w-[40px]">
                  Actions
                </ResizableHeader>
                {visibleColumns
                  .filter((col) => col.visible)
                  .map((column, index) => (
                    <ResizableHeader 
                      key={column.id}
                      fixed={index < 2} // First two columns are fixed
                    >
                      {column.label}
                    </ResizableHeader>
                  ))}
                <ResizableHeader className="w-[100px] text-right">
                  Actions
                </ResizableHeader>
              </TableRow>
            </thead>
            <TableBody>
              {contracts.length === 0 ? (
                <TableRow>
                  <TableCellWithTooltip
                    content="No contracts found. Try adjusting your filters."
                    className="text-center py-8 text-muted-foreground"
                    colSpan={visibleColumns.length + 2}
                  />
                </TableRow>
              ) : (
                contracts.map((contract) => (
                  <>
                    <TableRow key={contract.id}>
                      <TableCellWithTooltip
                        fixed
                        content={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => toggleRow(contract.id)}
                          >
                            {expandedRows.includes(contract.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        }
                      />
                      {visibleColumns
                        .filter((col) => col.visible)
                        .map((column, index) => (
                          <TableCellWithTooltip
                            key={column.id}
                            fixed={index < 2}
                            content={renderCellContent(contract, column.id)}
                          />
                        ))}
                      <TableCellWithTooltip
                        content={
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
                        }
                      />
                    </TableRow>
                    {expandedRows.includes(contract.id) && (
                      <TableRow>
                        <TableCellWithTooltip
                          content={
                            <div className="p-4 bg-muted/50">
                              <h4 className="font-medium mb-2">Additional Details</h4>
                              <dl className="grid grid-cols-2 gap-4">
                                {Object.entries(contract)
                                  .filter(([key]) => !["id"].includes(key))
                                  .map(([key, value]) => (
                                    <div key={key}>
                                      <dt className="text-sm font-medium text-muted-foreground capitalize">
                                        {key}
                                      </dt>
                                      <dd className="text-sm">
                                        {Array.isArray(value)
                                          ? value.join(", ")
                                          : String(value)}
                                      </dd>
                                    </div>
                                  ))}
                              </dl>
                            </div>
                          }
                          colSpan={visibleColumns.length + 2}
                        />
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}