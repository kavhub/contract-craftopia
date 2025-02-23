import React, { useState } from "react";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { type ColumnDefinition } from "./CustomizeColumnsButton";
import { ContractTableRow } from "./ContractTableRow";
import { TableHeader } from "./components/TableHeader";
import type { Contract } from "./types";
import * as XLSX from 'xlsx';
import { format } from "date-fns";

interface EnhancedContractsTableProps {
  contracts: Contract[];
  visibleColumns: ColumnDefinition[];
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export function EnhancedContractsTable({
  contracts,
  visibleColumns,
}: EnhancedContractsTableProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const toggleRow = (contractId: number) => {
    setExpandedRows((prev) =>
      prev.includes(contractId)
        ? prev.filter((id) => id !== contractId)
        : [...prev, contractId]
    );
  };

  const handleSort = (key: string) => {
    setSortConfig((currentSort) => {
      if (currentSort?.key === key) {
        return currentSort.direction === 'asc'
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedContracts = React.useMemo(() => {
    if (!sortConfig) return contracts;

    return [...contracts].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Contract];
      const bValue = b[sortConfig.key as keyof Contract];

      if (aValue === undefined || bValue === undefined) return 0;

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [contracts, sortConfig]);

  const handleExport = () => {
    const exportData = sortedContracts.map(contract => {
      const row: Record<string, any> = {};
      visibleColumns
        .filter(col => col.visible && col.id !== 'status')
        .forEach(col => {
          if (col.id === 'dateUploaded') {
            row[col.label] = format(new Date(contract[col.id]), "MMM d, yyyy");
          } else {
            row[col.label] = contract[col.id as keyof Contract];
          }
        });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contracts");
    XLSX.writeFile(wb, "contracts.xlsx");
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
      <div className="truncate max-w-[200px]">{content}</div>
    ) : (
      "-"
    );
  };

  return (
    <div className="relative border rounded-lg">
      <div className="p-4 border-b">
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>
      <ScrollArea className="w-full overflow-auto" type="always">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader 
              visibleColumns={visibleColumns}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <TableBody>
              {sortedContracts.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleColumns.filter(col => col.visible).length + 2}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No contracts found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                sortedContracts.map((contract) => (
                  <ContractTableRow
                    key={contract.id}
                    contract={contract}
                    visibleColumns={visibleColumns.filter(col => col.id !== 'status')}
                    isExpanded={expandedRows.includes(contract.id)}
                    onToggleExpand={() => toggleRow(contract.id)}
                    renderCellContent={renderCellContent}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}
