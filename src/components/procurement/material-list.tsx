import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Material {
  id: string;
  name: string;
  specifications?: string;
  quantity: number; // Base quantity for the material
  unitOfMeasurement?: string; // New field for unit
  // These fields are simplified for the initial table structure.
  // We'll handle multiple batches/suppliers in the modal later.
  supplier?: string;
  estimatedCost?: number;
  requiredDeliveryDate?: string; // Using string for simplicity for now
  priority?: 'High' | 'Medium' | 'Low';
}

interface MaterialListProps {
  materials: Material[];
}

const MaterialList: React.FC<MaterialListProps> = ({ materials }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Material Name</TableHead>
          <TableHead>Specifications</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Estimated Cost</TableHead>
          <TableHead>Required Delivery Date</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {materials.map((material) => (
        <TableRow key={material.id}>
 <TableCell>{material.name}</TableCell>
 <TableCell>{material.specifications || 'N/A'}</TableCell>
 <TableCell>{material.quantity}</TableCell>
 <TableCell>{material.unitOfMeasurement || 'N/A'}</TableCell>
 <TableCell>{material.supplier || 'N/A'}</TableCell>
 <TableCell>{material.estimatedCost !== undefined ? `$${material.estimatedCost.toFixed(2)}` : 'N/A'}</TableCell>
 <TableCell>{material.requiredDeliveryDate || 'N/A'}</TableCell>
 <TableCell>{material.priority || 'N/A'}</TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  );
};

export default MaterialList;