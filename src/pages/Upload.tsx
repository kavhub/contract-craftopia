import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Upload as UploadIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [contractType, setContractType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    setIsProcessing(true);
    toast({
      title: "Success",
      description: "Contract uploaded successfully",
    });
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={handleClickOutside}>
      <div className="container flex items-center justify-center min-h-screen">
        <div className="relative w-full max-w-2xl glass-panel p-8 rounded-lg animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => navigate(-1)}
          >
            <X className="h-4 w-4" />
          </Button>

          {!isProcessing ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Upload New Contract</h1>
                <p className="text-muted-foreground">
                  Upload your signed contract to extract key terms and clauses. Supported formats: PDF, DOCX.
                </p>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="space-y-4">
                  <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Drag and drop your file here</p>
                    <p className="text-sm text-muted-foreground">or</p>
                  </div>
                  <label className="inline-block">
                    <Input
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                    <Button type="button" variant="secondary">
                      Choose File
                    </Button>
                  </label>
                </div>
                {file && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="contractType" className="text-sm font-medium">
                    Contract Type
                  </label>
                  <Select value={contractType} onValueChange={setContractType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Contract Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nda">NDA</SelectItem>
                      <SelectItem value="service">Service Agreement</SelectItem>
                      <SelectItem value="employment">Employment Contract</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload}>Upload</Button>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}