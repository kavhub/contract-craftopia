import { TableHead } from "@/components/ui/table";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

interface ResizableHeaderProps {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
}

export function ResizableHeader({ children, className, fixed }: ResizableHeaderProps) {
  return (
    <TableHead 
      className={cn(
        "min-w-[150px] max-w-[300px]",
        fixed && "sticky left-0 bg-background z-20",
        className
      )}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={100} minSize={20} maxSize={200}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TableHead>
  );
}