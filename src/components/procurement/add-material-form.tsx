'use client';

import React, { useState } from 'react';

interface AddMaterialFormProps {
  // You can define props here later, e.g., onSubmit: (materialData: any) => void;
}

const AddMaterialForm: React.FC<AddMaterialFormProps> = () => {
  const [materialName, setMaterialName] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [requiredDeliveryDate, setRequiredDeliveryDate] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('Medium'); // Default to Medium

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const materialData = {
      name: materialName,
      specifications: specifications,
      quantity: parseInt(quantity, 10), // Convert quantity to a number
 unitOfMeasurement: unitOfMeasurement,
      supplier: supplier,
      estimatedCost: parseFloat(estimatedCost), // Convert estimatedCost to a number
      requiredDeliveryDate: requiredDeliveryDate,
      priorityLevel: priorityLevel,
    };
    console.log('Form submitted with data:', materialData);
    // Reset form fields (optional)
    setMaterialName('');
    setSpecifications('');
    setQuantity('');
    setSupplier('');
 setUnitOfMeasurement('');
    setSpecifications('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-sm">
      <div>
        <label htmlFor="materialName" className="block text-sm font-medium text-gray-700">
          Material Name
        </label>
        <input
          type="text"
          id="materialName"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="specifications" className="block text-sm font-medium text-gray-700">
          Specifications
        </label>
        <textarea
          id="specifications"
          value={specifications}
          onChange={(e) => setSpecifications(e.target.value)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
          min="1"
        />
      </div>
      <div>
        <label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-gray-700">
          Unit of Measurement
        </label>
        <input
          type="text"
          id="unitOfMeasurement"
          value={unitOfMeasurement}
          onChange={(e) => setUnitOfMeasurement(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
          Supplier
        </label>
        <input
          type="text"
          id="supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700">
          Estimated Cost
        </label>
        <input
          type="number"
          id="estimatedCost"
          value={estimatedCost}
          onChange={(e) => setEstimatedCost(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="requiredDeliveryDate" className="block text-sm font-medium text-gray-700">
          Required Delivery Date
        </label>
        <input
          type="date"
          id="requiredDeliveryDate"
          value={requiredDeliveryDate}
          onChange={(e) => setRequiredDeliveryDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="priorityLevel" className="block text-sm font-medium text-gray-700">
          Priority Level
        </label>
        <select
          id="priorityLevel"
          value={priorityLevel}
          onChange={(e) => setPriorityLevel(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Material
        </button>
      </div>
    </form>
  );
};

export default AddMaterialForm;