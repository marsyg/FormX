import { Trash, Edit } from 'lucide-react';
import React, { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Input } from '@/components/ui/input';   
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

function FormEdit({ defaultValue, onUpdate, deleteField }) {
    const [label, setLabel] = useState(defaultValue.formLabel);
    const [placeholder, setPlaceholder] = useState(defaultValue.placeholderName);
    const [fieldType, setFieldType] = useState(defaultValue.fieldType);
    const [options, setOptions] = useState(defaultValue.options || []);

    return (
        <div className="flex gap-2">
            <Popover>
                <PopoverTrigger>
                    <Edit className="h-5 w-5 text-gray-500" />
                </PopoverTrigger>
                <PopoverContent>
                    <h2 className="font-bold mb-2">Edit Field</h2>
                    <div className="mb-3">
                        <label className="text-xs text-gray-500 block mb-1">Label Name</label>
                        <Input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="text-xs text-gray-500 block mb-1">Placeholder</label>
                        <Input
                            type="text"
                            value={placeholder}
                            onChange={(e) => setPlaceholder(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="text-xs text-gray-500 block mb-1">Field Type</label>
                        <Input
                            type="text"
                            value={fieldType}
                            onChange={(e) => setFieldType(e.target.value)}
                        />
                    </div>
                    {fieldType === 'select' || fieldType === 'radio' || fieldType === 'checkbox' ? (
                        <div className="mb-3">
                            <label className="text-xs text-gray-500 block mb-1">Options (Comma Separated)</label>
                            <Input
                                type="text"
                                value={options.join(', ')}
                                onChange={(e) => setOptions(e.target.value.split(',').map(opt => opt.trim()))}
                            />
                        </div>
                    ) : null}
                    <Button
                        size="sm"
                        className="mt-3"
                        onClick={() =>
                            onUpdate({
                                label: label,
                                placeholder: placeholder,
                               
                            })
                        }
                    >
                        Update
                    </Button>
                </PopoverContent>
            </Popover>

            <AlertDialog>
                <AlertDialogTrigger>
                    <Trash className="h-5 w-5 text-red-500" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this field.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteField()}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default FormEdit;
