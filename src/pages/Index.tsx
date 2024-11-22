import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Upload, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Index() {
  const userName = "John"; // This would come from your auth system
  const recentContracts = [
    {
      id: 1,
      name: "Service Agreement - Tech Solutions Inc",
      status: "Active",
      date: "2024-02-20",
    },
    {
      id: 2,
      name: "NDA - Project Phoenix",
      status: "Pending",
      date: "2024-02-19",
    },
    {
      id: 3,
      name: "Employment Contract - Jane Smith",
      status: "Draft",
      date: "2024-02-18",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container py-8 space-y-8 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Hello, {userName}
          </h1>
          <p className="text-muted-foreground">
            What would you like to do today?
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/upload">
            <Card className="p-6 hover:bg-accent transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Upload New Contract</h3>
                  <p className="text-sm text-muted-foreground">
                    Add a new contract to your collection
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/contracts">
            <Card className="p-6 hover:bg-accent transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">View Contracts</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse and manage your contracts
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
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

          <Card className="p-6">
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

          <Card className="p-6">
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

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Recent Activity</h2>
          <div className="grid gap-4">
            {recentContracts.map((contract) => (
              <Card key={contract.id} className="p-6 hover:bg-accent transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{contract.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contract.date}
                      </p>
                    </div>
                  </div>
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
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 ContractManager. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}