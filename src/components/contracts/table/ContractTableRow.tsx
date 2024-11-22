import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { type Contract } from "./types";
import { type ColumnDefinition } from "./CustomizeColumnsButton";
import { format } from "date-fns";

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
    <>
      <TableRow 
        className="cursor-pointer hover:bg-muted/50"
        onClick={onToggleExpand}
      >
        <TableCell onClick={(e) => e.stopPropagation()}>
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
        <TableCell 
          className="text-right sticky right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/contracts/${contract.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={visibleColumns.filter(col => col.visible).length + 2}>
            <div className="p-4 space-y-4 bg-muted/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Contract Details</h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Contract Name</dt>
                      <dd>{contract.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                      <dd>{contract.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Date Uploaded</dt>
                      <dd>{format(new Date(contract.dateUploaded), "MMM d, yyyy")}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                      <dd>{contract.status}</dd>
                    </div>
                    {contract.parties && contract.parties.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Parties</dt>
                        <dd>{contract.parties.join(", ")}</dd>
                      </div>
                    )}
                    {contract.value !== undefined && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Value</dt>
                        <dd>{contract.currency} {contract.value.toLocaleString()}</dd>
                      </div>
                    )}
                    {contract.restrictions && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Restrictions</dt>
                        <dd>{contract.restrictions}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                {contract.terms && Object.keys(contract.terms).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Additional Terms</h4>
                    <dl className="space-y-2">
                      {Object.entries(contract.terms).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-sm font-medium text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}