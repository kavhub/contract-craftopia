import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Upload as UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [contractName, setContractName] = useState("");
  const [contractType, setContractType] = useState("");
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
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Contract uploaded successfully",
    });
  };

  return (
    <div className="container max-w-4xl py-8 space-y-8 animate-fade-in">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Upload New Contract</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Upload New Contract</h1>
        <p className="text-muted-foreground">
          Upload your signed contract to extract key terms and clauses. Supported formats: PDF, DOCX.
        </p>
      </div>

      <div className="space-y-6">
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
            <label htmlFor="contractName" className="text-sm font-medium">
              Contract Name
            </label>
            <Input
              id="contractName"
              placeholder="Optional: Enter contract name"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
            />
          </div>

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
          <Button variant="outline" asChild>
            <Link to="/">Cancel</Link>
          </Button>
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </div>
    </div>
  );
}