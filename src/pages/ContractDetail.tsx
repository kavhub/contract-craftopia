import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Download, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ContractDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<Record<string, { accurate: boolean; comment: string }>>({});
  
  // Mock data - in a real app, this would come from an API
  const contract = {
    id,
    name: "Service Agreement - Tech Solutions Inc",
    type: "Service Agreement",
    dateUploaded: "2024-02-20",
    status: "Active",
    terms: [
      {
        id: "effective-date",
        title: "Effective Date",
        content: "March 1, 2024",
      },
      {
        id: "governing-law",
        title: "Governing Law",
        content: "This agreement shall be governed by the laws of the State of California.",
      },
      {
        id: "confidentiality",
        title: "Confidentiality",
        content: "All information shared between parties shall be kept strictly confidential.",
      },
    ],
  };

  const handleFeedback = (termId: string, isAccurate: boolean) => {
    setFeedback((prev) => ({
      ...prev,
      [termId]: { accurate: isAccurate, comment: "" },
    }));
  };

  const handleComment = (termId: string, comment: string) => {
    setFeedback((prev) => ({
      ...prev,
      [termId]: { ...prev[termId], comment },
    }));
  };

  const submitFeedback = (termId: string) => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container py-8 space-y-8 animate-fade-in">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/contracts">Contracts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{contract.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">{contract.name}</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Original Document
          </Button>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Extracted Terms</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {contract.terms.map((term) => (
              <AccordionItem key={term.id} value={term.id}>
                <AccordionTrigger>{term.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>{term.content}</p>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Is this information accurate?</p>
                      
                      <div className="flex gap-2">
                        <Button
                          variant={feedback[term.id]?.accurate ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleFeedback(term.id, true)}
                        >
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Yes
                        </Button>
                        <Button
                          variant={feedback[term.id]?.accurate === false ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleFeedback(term.id, false)}
                        >
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          No
                        </Button>
                      </div>

                      {feedback[term.id]?.accurate === false && (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Please provide details about the inaccuracy..."
                            value={feedback[term.id]?.comment}
                            onChange={(e) => handleComment(term.id, e.target.value)}
                          />
                          <Button
                            size="sm"
                            onClick={() => submitFeedback(term.id)}
                          >
                            Submit Feedback
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}