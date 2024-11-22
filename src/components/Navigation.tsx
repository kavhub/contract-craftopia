import { Link } from "react-router-dom";
import { Bell, HelpCircle, Settings, Upload, FileText, Home } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "./ui/progress";

export function Navigation() {
  const notifications = [
    {
      type: "processing",
      title: "Service Agreement.pdf",
      progress: 45,
      time: "2 minutes ago"
    },
    {
      type: "uploaded",
      title: "NDA Contract.pdf",
      time: "5 minutes ago"
    }
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-muted-foreground" />
          <span className="font-bold">Contract Analysis</span>
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span>Dashboard</span>
          </Link>
          <Link to="/contracts" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>Contracts</span>
          </Link>
          <Link to="/upload" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span>Upload</span>
          </Link>
          <Link to="/help" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span>Help</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span>Settings</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <div className="p-2 space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-muted-foreground">{notification.time}</span>
                    </div>
                    {notification.type === "processing" && (
                      <Progress value={notification.progress} className="h-2" />
                    )}
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}