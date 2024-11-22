import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SearchBar } from "@/components/contracts/search/SearchBar";
import { AdvancedSearch } from "@/components/contracts/search/AdvancedSearch";
import { EnhancedContractsTable } from "@/components/contracts/table/EnhancedContractsTable";
import { CustomizeColumnsButton, type ColumnDefinition } from "@/components/contracts/table/CustomizeColumnsButton";

export default function Contracts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const [columns, setColumns] = useState<ColumnDefinition[]>([
    { id: "name", label: "Contract Name", visible: true },
    { id: "type", label: "Type", visible: true },
    { id: "dateUploaded", label: "Date Uploaded", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "currency", label: "Currency", visible: true },
    { id: "value", label: "Value", visible: true },
    { id: "parties", label: "Parties", visible: false },
    { id: "restrictions", label: "Restrictions", visible: false },
  ]);

  const contracts = [
    {
      id: 1,
      name: "Service Agreement - Tech Solutions Inc",
      type: "Service Agreement",
      dateUploaded: "2024-02-20",
      status: "Active",
      currency: "USD",
      value: 50000,
      parties: ["Tech Solutions Inc", "Our Company"],
      restrictions: "Non-transferable without consent",
    },
    {
      id: 2,
      name: "NDA - Project Phoenix",
      type: "NDA",
      dateUploaded: "2024-02-19",
      status: "Pending",
      parties: ["Phoenix Corp", "Our Company"],
      restrictions: "Strictly confidential",
    },
    {
      id: 3,
      name: "Employment Contract - Jane Smith",
      type: "Employment",
      dateUploaded: "2024-02-18",
      status: "Draft",
      currency: "EUR",
      value: 75000,
      parties: ["Jane Smith", "Our Company"],
    },
  ];

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = contract.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || contract.type.toLowerCase() === selectedType.replace("-", " ");
    const matchesStatus = selectedStatus === "all" || contract.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesDate = !selectedDate || format(new Date(contract.dateUploaded), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container py-8 space-y-8 animate-fade-in">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link className="transition-colors hover:text-foreground" to="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="font-normal text-foreground">Contracts</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Contracts Database</h1>
          <Button asChild>
            <Link to="/upload">Upload New Contract</Link>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <AdvancedSearch
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <CustomizeColumnsButton
              columns={columns}
              onColumnsChange={setColumns}
            />
          </div>

          <EnhancedContractsTable
            contracts={filteredContracts}
            visibleColumns={columns}
          />
        </div>
      </main>
    </div>
  );
}