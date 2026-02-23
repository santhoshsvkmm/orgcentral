
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Link as LinkIcon,
  MoreVertical,
  Download,
  Filter,
  CheckCircle,
  FileText,
  Edit2,
  Trash2,
  Eye,
  Store,
  Factory,
  HardHat
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from "@/components/ui/checkbox";
import AddMaterialForm from '@/components/procurement/add-material-form';
import type { Warehouse } from '@/types/warehouse';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

// Mock data for warehouses
const initialMockWarehouses: Warehouse[] = [
  { id: 'wh-1', projectId: '1', name: 'Main Site Storage A', location: 'Sector A, Bay 1', capacity: 500, notes: 'Stores primary construction materials.', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), currentStock: 300 },
  { id: 'wh-2', projectId: '1', name: 'Equipment Shed 1', location: 'Near Gate 3', capacity: 100, notes: 'Heavy machinery and tools.', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), currentStock: 80 },
];

async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 50));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

async function getWarehouseById(warehouseId: string, projectId: string): Promise<Warehouse | null> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return initialMockWarehouses.find(wh => wh.id === warehouseId && wh.projectId === projectId) || null;
}

interface ProcurementItem {
  id: string;
  name: string;
  specifications: string;
  quantity: number;
  unit: string;
  supplier: string;
  estimatedCost: number;
  deliveryDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Draft' | 'Requested' | 'PO Issued' | 'Shipped' | 'Delivered';
  taskId: string;
  taskName: string;
  requestedBy: string;
  procurementType: 'Direct Purchase' | 'Supplier' | 'Subcontractor';
  batchNumber?: string;
}

const INITIAL_PROCUREMENT_LOG: ProcurementItem[] = [
  {
    id: 'mat-1',
    name: 'Portland Cement',
    specifications: 'Type I, 50kg bags',
    quantity: 100,
    unit: 'bags',
    supplier: 'LafargeHolcim',
    estimatedCost: 1200,
    deliveryDate: '2026-03-05',
    priority: 'High',
    status: 'PO Issued',
    taskId: 'task-101',
    taskName: 'Foundation Pouring',
    requestedBy: 'John Martinez',
    procurementType: 'Supplier',
    batchNumber: 'PO-1029-A'
  },
  {
    id: 'mat-2',
    name: 'Steel Rebar 12mm',
    specifications: 'Grade 60, 12m length',
    quantity: 500,
    unit: 'units',
    supplier: 'Structural Dynamics Const.',
    estimatedCost: 4500,
    deliveryDate: '2026-03-10',
    priority: 'Medium',
    status: 'Requested',
    taskId: 'task-102',
    taskName: 'Reinforcement Steel Work',
    requestedBy: 'Jane Smith',
    procurementType: 'Subcontractor',
    batchNumber: ''
  },
  {
    id: 'mat-3',
    name: 'Sand (Coarse)',
    specifications: 'Washed, structural use',
    quantity: 20,
    unit: 'tons',
    supplier: 'Home Depot Local',
    estimatedCost: 800,
    deliveryDate: '2026-02-28',
    priority: 'High',
    status: 'Delivered',
    taskId: 'task-101',
    taskName: 'Foundation Pouring',
    requestedBy: 'Mike Johnson',
    procurementType: 'Direct Purchase',
    batchNumber: 'REC-0982'
  },
  {
    id: 'mat-4',
    name: 'Bricks (Red)',
    specifications: 'Standard size, durable',
    quantity: 5000,
    unit: 'units',
    supplier: 'BrickWorks Ltd.',
    estimatedCost: 2500,
    deliveryDate: '2026-03-20',
    priority: 'Low',
    status: 'Draft',
    taskId: 'task-104',
    taskName: 'Wall Construction',
    requestedBy: 'Sarah Williams',
    procurementType: 'Supplier',
    batchNumber: ''
  }
];

export default function MaterialProcurementPlanPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const warehouseId = params?.warehouseId as string;
  const { toast } = useToast();

  const [projectName, setProjectName] = useState('');
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [procurementLog, setProcurementLog] = useState<ProcurementItem[]>(INITIAL_PROCUREMENT_LOG);
  const [isLoading, setIsLoading] = useState(true);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Edit Modal State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcurementItem | null>(null);

  useEffect(() => {
    if (projectId && warehouseId) {
      setIsLoading(true);
      Promise.all([
        getProjectNameById(projectId),
        getWarehouseById(warehouseId, projectId)
      ]).then(([pName, wh]) => {
        setProjectName(pName);
        setWarehouse(wh);
        setIsLoading(false);
      });
    }
  }, [projectId, warehouseId]);

  const handleAddMaterial = (newMat: any) => {
    const item: ProcurementItem = {
      ...newMat,
      taskName: 'General Storage'
    };
    setProcurementLog(prev => [item, ...prev]);
    toast({ title: "Material Added", description: `${newMat.name} has been added to the procurement plan.` });
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(procurementLog.map(item => item.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleSelect = (id: string, checked: boolean) => {
    const newPaths = new Set(selectedIds);
    if (checked) {
      newPaths.add(id);
    } else {
      newPaths.delete(id);
    }
    setSelectedIds(newPaths);
  };

  const handleBulkAction = (action: 'Delete' | 'UpdateStatus' | 'GeneratePOs') => {
    if (selectedIds.size === 0) return;

    if (action === 'Delete') {
      setProcurementLog(prev => prev.filter(item => !selectedIds.has(item.id)));
      setSelectedIds(new Set());
      toast({ title: "Materials Deleted", description: `Removed ${selectedIds.size} materials from the plan.` });
    } else if (action === 'UpdateStatus') {
      // Example bulk update: Set all selected to 'Requested'
      setProcurementLog(prev => prev.map(item =>
        selectedIds.has(item.id) ? { ...item, status: 'Requested' } : item
      ));
      setSelectedIds(new Set());
      toast({ title: "Status Updated", description: `Changed status to 'Requested' for ${selectedIds.size} materials.` });
    } else if (action === 'GeneratePOs') {
      // Example bulk update: Set all selected to 'PO Issued'
      setProcurementLog(prev => prev.map(item =>
        selectedIds.has(item.id) ? { ...item, status: 'PO Issued' } : item
      ));
      setSelectedIds(new Set());
      toast({ title: "Generated POs", description: `Purchase Orders generated for ${selectedIds.size} items.` });
    }
  };

  const handleDeleteItem = (id: string) => {
    setProcurementLog(prev => prev.filter(item => item.id !== id));
    toast({ title: "Material Removed", description: `The item has been removed.` });
  };

  const openEditModal = (item: ProcurementItem) => {
    setEditingItem({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    setProcurementLog(prev => prev.map(item => item.id === editingItem.id ? editingItem : item));
    setIsEditDialogOpen(false);
    toast({ title: "Material Updated", description: `${editingItem.name} has been successfully updated.` });
  };

  const statusColors = {
    'Draft': 'bg-slate-100 text-slate-600',
    'Requested': 'bg-blue-100 text-blue-700',
    'PO Issued': 'bg-amber-100 text-amber-700',
    'Shipped': 'bg-indigo-100 text-indigo-700',
    'Delivered': 'bg-emerald-100 text-emerald-700'
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Direct Purchase': return <Store className="h-3 w-3 text-amber-500" />;
      case 'Subcontractor': return <HardHat className="h-3 w-3 text-indigo-500" />;
      default: return <Factory className="h-3 w-3 text-slate-500" />;
    }
  };

  const columns: ColumnDef<ProcurementItem>[] = [
    {
      accessorKey: 'select',
      size: '40px',
      header: ({ column }: any) => (
        <Checkbox
          checked={selectedIds.size === procurementLog.length && procurementLog.length > 0}
          onCheckedChange={handleToggleSelectAll}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={selectedIds.has(row.id)}
          onCheckedChange={(checked) => handleToggleSelect(row.id, checked as boolean)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      )
    },
    {
      accessorKey: 'name',
      header: 'Material / Specs',
      cell: ({ row }: any) => (
        <div className="space-y-1">
          <div className="font-bold text-slate-800">{row.name}</div>
          <div className="text-[10px] text-slate-500 truncate max-w-[200px]">{row.specifications}</div>
        </div>
      )
    },
    {
      accessorKey: 'procurementType',
      header: 'Procurement Source',
      cell: ({ row }: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 whitespace-nowrap">
            {getTypeIcon(row.procurementType)}
            <span>{row.supplier || 'To Be Assigned'}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 gap-2">
            <span>{row.procurementType}</span>
            {row.batchNumber && <Badge variant="secondary" className="px-1.5 py-0 text-[10px] bg-slate-100 text-slate-600 border-slate-200">{row.batchNumber}</Badge>}
          </div>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge className={cn("text-[10px] py-0 px-2 font-bold whitespace-nowrap", statusColors[row.status as keyof typeof statusColors])}>
          {row.status}
        </Badge>
      )
    },
    {
      accessorKey: 'taskName',
      header: 'Linked Task',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium whitespace-nowrap">
          <LinkIcon className="h-3 w-3" />
          <span>{row.taskName}</span>
        </div>
      )
    },
    {
      accessorKey: 'quantity',
      header: 'Qty / Unit',
      cell: ({ row }: any) => (
        <div className="text-xs font-bold text-slate-700 whitespace-nowrap">
          {row.quantity} {row.unit}
        </div>
      )
    },
    {
      accessorKey: 'deliveryDate',
      header: 'Est. Delivery',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-600 whitespace-nowrap">
          <Clock className="h-3 w-3 text-slate-400" />
          <span>{row.deliveryDate}</span>
        </div>
      )
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }: any) => (
        <Badge variant="outline" className={cn(
          "text-[10px] py-0 px-2",
          row.priority === 'High' ? "border-rose-200 text-rose-600 bg-rose-50" :
            row.priority === 'Medium' ? "border-amber-200 text-amber-600 bg-amber-50" :
              "border-slate-200 text-slate-600 bg-slate-50"
        )}>
          {row.priority}
        </Badge>
      )
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => openEditModal(row as ProcurementItem)}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View PO
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteItem(row.id)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Material
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  if (isLoading || !warehouse) {
    return <div className="p-8 text-center text-slate-500">Loading procurement plan...</div>;
  }

  const stats = [
    { label: 'Total Requests', value: procurementLog.length, icon: ShoppingCart, color: 'text-indigo-600' },
    { label: 'Pending Delivery', value: procurementLog.filter(i => i.status !== 'Delivered' && i.status !== 'Draft').length, icon: Truck, color: 'text-amber-600' },
    { label: 'Fulfilled', value: procurementLog.filter(i => i.status === 'Delivered').length, icon: CheckCircle2, color: 'text-emerald-600' },
    { label: 'Urgent', value: procurementLog.filter(i => i.priority === 'High' && i.status !== 'Delivered').length, icon: AlertCircle, color: 'text-rose-600' }
  ];

  return (
    <div className="space-y-6 container mx-auto py-8">

      <PageTitle
        title={`Procurement: ${warehouse.name}`}
        description={`Supply chain and task-based material management for ${warehouse.name}.`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-200">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}/resources/warehouses/${warehouseId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Warehouse
              </Link>
            </Button>
          </div>
        }
      />
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Global Procurement Progress</h4>
            <p className="text-xs text-slate-500">Inventory fulfillment across all project phases.</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-600">68%</span>
          </div>
        </div>
        <Progress value={68} className="h-2" indicatorClassName="bg-indigo-600" />
        <div className="flex justify-between text-[10px] font-bold text-slate-400">
          <span>MATERIAL REQUESTED</span>
          <span>ON-SITE INVENTORY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-default overflow-hidden group">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between pb-4 gap-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Package className="h-5 w-5 text-indigo-600" />
              Procurement Log
            </CardTitle>
            <CardDescription>Track the lifecycle of every material request.</CardDescription>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="hidden lg:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-500">
              <Filter className="h-3 w-3" />
              <span>Filter: Active</span>
            </div>
            {selectedIds.size > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="border-slate-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold whitespace-nowrap">
                    Actions ({selectedIds.size}) <MoreVertical className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Batch Operations</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleBulkAction('UpdateStatus')}>Force Status to 'Requested'</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('GeneratePOs')}>Batch Generate POs</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleBulkAction('Delete')}>
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <AddMaterialForm onAddMaterial={handleAddMaterial} />
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <DataTable
            data={procurementLog}
            columns={columns}
            searchableColumns={['name', 'specifications', 'supplier', 'taskName']}
            itemsPerPage={10}
            actionColumnAlignment="right"
          />
        </CardContent>
      </Card>

      <div className="bg-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <LinkIcon className="h-3 w-3" /> Task Synchronization
            </div>
            <h3 className="text-xl font-bold">Automatic Inventory Allocation</h3>
            <p className="text-indigo-200 text-xs max-w-lg">
              Every item in this procurement plan is linked to a specific project task.
            </p>
          </div>
          <Button className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold whitespace-nowrap px-8 border-none">
            View Task Dependencies
          </Button>
        </div>
      </div>

      {/* Edit Procurement Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Material Procurement</DialogTitle>
            <DialogDescription>
              Make changes to {editingItem?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Material Name</Label>
              <Input
                id="name"
                value={editingItem?.name || ''}
                onChange={(e) => setEditingItem(prev => prev ? { ...prev, name: e.target.value } : null)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="qty">Quantity</Label>
              <div className="flex gap-2">
                <Input
                  id="qty"
                  type="number"
                  value={editingItem?.quantity || 0}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, quantity: parseInt(e.target.value) || 0 } : null)}
                />
                <Input
                  value={editingItem?.unit || ''}
                  className="w-24"
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, unit: e.target.value } : null)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Procurement Type</Label>
              <Select value={editingItem?.procurementType} onValueChange={(v: any) => setEditingItem(prev => prev ? { ...prev, procurementType: v } : null)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Direct Purchase">Direct Purchase</SelectItem>
                  <SelectItem value="Supplier">Supplier</SelectItem>
                  <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-supplier">
                {editingItem?.procurementType === 'Direct Purchase' ? 'Store / Vendor Name' : editingItem?.procurementType === 'Subcontractor' ? 'Subcontractor Name' : 'Supplier Name'}
              </Label>
              <Input
                id="edit-supplier"
                value={editingItem?.supplier || ''}
                onChange={(e) => setEditingItem(prev => prev ? { ...prev, supplier: e.target.value } : null)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-batch">Batch Number / PO Ref</Label>
              <Input
                id="edit-batch"
                placeholder="e.g. BATCH-001"
                value={editingItem?.batchNumber || ''}
                onChange={(e) => setEditingItem(prev => prev ? { ...prev, batchNumber: e.target.value } : null)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={editingItem?.status} onValueChange={(v: any) => setEditingItem(prev => prev ? { ...prev, status: v } : null)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(statusColors).map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={editingItem?.priority} onValueChange={(v: any) => setEditingItem(prev => prev ? { ...prev, priority: v } : null)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
