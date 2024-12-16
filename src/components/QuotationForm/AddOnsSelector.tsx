import React from 'react';

interface AddOns {
  shelves: number;
  handles: number;
  accessories: string[];
}

interface AddOnsSelectorProps {
  addOns: AddOns;
  onAddOnsChange: (addOns: AddOns) => void;
}

export const AddOnsSelector: React.FC<AddOnsSelectorProps> = ({
  addOns,
  onAddOnsChange,
}) => {
  const handleNumberChange = (field: 'shelves' | 'handles') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    onAddOnsChange({
      ...addOns,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Additional Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Add Shelves</label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="number"
              min="0"
              value={addOns.shelves}
              onChange={handleNumberChange('shelves')}
              className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500">pieces</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Add Handles</label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="number"
              min="0"
              value={addOns.handles}
              onChange={handleNumberChange('handles')}
              className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500">pieces</span>
          </div>
        </div>
      </div>
    </div>
  );
};