import { Link } from "react-router-dom";
import { LogOut, HelpCircle, Settings, Upload, FileText, Home } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="font-bold">ContractManager</span>
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/contracts" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <FileText className="h-4 w-4" />
            <span>Contracts</span>
          </Link>
          <Link to="/upload" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Link>
          <Link to="/help" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}