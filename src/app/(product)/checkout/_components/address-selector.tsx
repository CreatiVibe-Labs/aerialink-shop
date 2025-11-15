"use client";

import React, { useState } from "react";
import PrimaryButton from "@/components/common/primary-button";
import { Address } from "@/hooks/use-addresses";
import AddAddressModal from "./add-address-modal";
import { FiPlus, FiEdit2 } from "react-icons/fi";

interface AddressSelectorProps {
    addresses: Address[];
    selectedAddress: Address | null;
    onSelectAddress: (address: Address) => void;
    onAddAddress: (address: Omit<Address, "id">) => Promise<{ success: boolean; error?: string }>;
    onUpdateAddress: (id: number, address: Omit<Address, "id">) => Promise<{ success: boolean; error?: string }>;
    loading?: boolean;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
    addresses,
    selectedAddress,
    onSelectAddress,
    onAddAddress,
    onUpdateAddress,
    loading = false,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const handleEditClick = (address: Address, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingAddress(null);
    };

    const handleSave = async (addressData: Omit<Address, "id">) => {
        if (editingAddress) {
            return await onUpdateAddress(editingAddress.id, addressData);
        } else {
            return await onAddAddress(addressData);
        }
    };

    if (loading) {
        return (
            <div className="space-y-3">
                <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
                <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Saved Addresses</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition cursor-pointer"
                >
                    <FiPlus size={16} />
                    Add New Address
                </button>
            </div>

            {addresses.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-500 mb-3">No saved addresses yet</p>
                    <PrimaryButton
                        onClick={() => setIsModalOpen(true)}
                        className="max-w-fit mx-auto cursor-pointer"
                    >
                        <FiPlus className="mr-2" size={16} />
                        Add Your First Address
                    </PrimaryButton>
                </div>
            ) : (
                <div className="space-y-3">
                    {addresses.map((address) => (
                        <label
                            key={address.id}
                            className={`block border rounded-lg p-4 cursor-pointer transition ${selectedAddress?.id === address.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="radio"
                                    name="address"
                                    checked={selectedAddress?.id === address.id}
                                    onChange={() => onSelectAddress(address)}
                                    className="mt-1 accent-blue-600 hidden"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-800">{address.name}</p>
                                            {Boolean(address.default) && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => handleEditClick(address, e)}
                                            className="text-blue-600 hover:text-blue-700 p-1 transition cursor-pointer"
                                            title="Edit address"
                                        >
                                            <FiEdit2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600">{address.address1}</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Postal Code: {address.postal_code}
                                    </p>
                                    <p className="text-sm text-gray-600">Phone: +{address.phone_number}</p>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            )}

            <AddAddressModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleSave}
                editAddress={editingAddress}
            />
        </div>
    );
};

export default AddressSelector;
