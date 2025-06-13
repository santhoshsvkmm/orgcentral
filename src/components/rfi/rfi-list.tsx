
'use client';

import type { RFI, RfiStatus } from '@/types/rfi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, MoreHorizontal, Trash2, Eye, CalendarDays, User, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/date-utils";
import { RfiForm } from './rfi-form';

interface RfiListProps {
  rfis: RFI[];
  projectId: string;
  onUpdateRfi: (updatedRfi: RFI) => void;
  onDeleteRfi: (rfiId: string) => void;
  onCreateRfi: (newRfi: RFI) => void; // Added for the "Create RFI" button
}

export function RfiList({ rfis, projectId, onUpdateRfi, onDeleteRfi, onCreateRfi }: RfiListProps) {
  const { toast } = useToast();

  const getStatusVariant = (status: RfiStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Open": return "default"; 
      case "In Progress": return "secondary"; 
      case "Needs Clarification": return "outline"; 
      case "Closed": return "outline"; 
      default: return "outline";
    }
  };

  const getStatusColorClass = (status: RfiStatus): string => {
    switch (status) {
      case "Open": return "bg-blue-500 hover:bg-blue-600";
      case "In Progress": return "bg-yellow-500 hover:bg-yellow-600";
      case "Needs Clarification": return "bg-orange-500 hover:bg-orange-600";
      case "Closed": return "bg-green-500 hover:bg-green-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };


  const handleDelete = (rfi: RFI) => {
    onDeleteRfi(rfi.id);
    toast({
      title: "RFI Deleted",
      description: `RFI "${rfi.rfiNumber}: ${rfi.title}" has been deleted.`,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>All RFIs</CardTitle>
          <CardDescription>List of Requests for Information for this project.</CardDescription>
        </div>
        <RfiForm
            mode="create"
            projectId={projectId}
            onSave={onCreateRfi}
            triggerButton={
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New RFI
            </Button>
            }
        />
      </CardHeader>
      <CardContent>
        {(!rfis || rfis.length === 0) ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No RFIs match the current filters, or no RFIs have been created yet.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or create a new RFI.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RFI No.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden md:table-cell">
                      <div className="flex items-center gap-1"><User className="h-4 w-4"/>Raised By</div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                      <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4"/>Created</div>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                      <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4"/>Due Date</div>
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rfis.map((rfi) => (
                  <TableRow key={rfi.id}>
                    <TableCell className="font-medium">{rfi.rfiNumber}</TableCell>
                    <TableCell>
                      <Link href={`/projects/${projectId}/communication/rfi/${rfi.id}`} className="hover:underline">
                        {rfi.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(rfi.status)} className={`${getStatusColorClass(rfi.status)} text-white`}>{rfi.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rfi.priority === 'High' ? 'destructive' : rfi.priority === 'Medium' ? 'default' : 'outline'}>
                        {rfi.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{rfi.raisedByUserName}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(rfi.createdAt, 'yyyy-MM-dd')}</TableCell>
                    <TableCell className="hidden lg:table-cell">{formatDate(rfi.dueDate, 'yyyy-MM-dd')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/projects/${projectId}/communication/rfi/${rfi.id}`}><Eye className="mr-2 h-4 w-4" />View Details</Link>
                          </DropdownMenuItem>
                          <RfiForm
                            mode="edit"
                            projectId={projectId}
                            rfiData={rfi}
                            onSave={onUpdateRfi}
                            triggerButton={
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex items-center w-full">
                                <Edit className="mr-2 h-4 w-4" />Edit
                              </DropdownMenuItem>
                            }
                          />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10 w-full flex items-center">
                                <Trash2 className="mr-2 h-4 w-4" />Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete RFI "{rfi.rfiNumber}: {rfi.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(rfi)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
