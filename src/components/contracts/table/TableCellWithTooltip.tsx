import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TableCellWithTooltipProps {
  content: React.ReactNode;
  className?: string;
  fixed?: boolean;
}

export function TableCellWithTooltip({ content, className, fixed }: TableCellWithTooltipProps) {
  const isString = typeof content === 'string';
  const shouldTruncate = isString && content.length > 50;

  return (
    <TableCell 
      className={cn(
        "min-w-[150px] max-w-[300px]",
        fixed && "sticky left-0 bg-background z-10",
        className
      )}
    >
      {shouldTruncate ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="truncate">{content}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs break-words">{content}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        content
      )}
    </TableCell>
  );
}