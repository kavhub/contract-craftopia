import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Processing() {
  return (
    <div className="container max-w-4xl py-8 space-y-8 animate-fade-in">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Processing Contract</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Processing Your Contract</h1>
        
        <div className="space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <Progress value={33} className="w-full max-w-md mx-auto" />
          <p className="text-muted-foreground">
            This may take a few moments. You will be notified once the extraction is complete.
          </p>
        </div>

        <div className="flex justify-between pt-8">
          <Button variant="outline" asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link to="/contracts">View Contracts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}