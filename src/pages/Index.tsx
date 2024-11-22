import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  Plus,
} from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const contracts = [
    {
      id: 1,
      name: "Service Agreement - Tech Solutions Inc",
      status: "Active",
      dueDate: "2024-04-15",
      priority: "High",
    },
    {
      id: 2,
      name: "License Agreement - Software Corp",
      status: "Pending",
      dueDate: "2024-03-30",
      priority: "Medium",
    },
    {
      id: 3,
      name: "NDA - Project Phoenix",
      status: "Draft",
      dueDate: "2024-04-01",
      priority: "Low",
    },
  ];

  const handleNewContract = () => {
    toast({
      title: "Creating new contract",
      description: "This feature will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Contract Management</h1>
          <p className="text-muted-foreground">
            Manage and track all your contracts in one place
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search contracts..."
              className="pl-10 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleNewContract} className="hover-card">
            <Plus className="mr-2 h-4 w-4" /> New Contract
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 glass-panel hover-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Contracts</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 glass-panel hover-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 glass-panel hover-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Contracts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Recent Contracts</h2>
          <div className="grid gap-4">
            {contracts.map((contract) => (
              <Card
                key={contract.id}
                className="p-6 glass-panel hover-card cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{contract.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Due: {contract.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        contract.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : contract.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {contract.status}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        contract.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : contract.priority === "Medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {contract.priority}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;