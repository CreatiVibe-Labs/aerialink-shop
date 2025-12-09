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
    onRemoveAddress: (id: number) => Promise<{ success: boolean; error?: string }>;
    loading?: boolean;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
    addresses,
    selectedAddress,
    onSelectAddress,
    onAddAddress,
    onUpdateAddress,
    onRemoveAddress,
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
        <div className="border-2 border-[#C5D3CE] rounded-xl p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#98C1A9] font-bold text-2xl hidden md:block">Saved address</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1 text-lg text-[#98C1A9] hover:text-[#98C1A9] font-normal transition cursor-pointer w-full md:w-auto justify-center md:justify-start"
                >
                    <span className="text-lg">+</span>
                    Add Shipping address
                </button>
            </div>

            {addresses.length === 0 ? (
                <div className="border-2 border-dashed border-[#C5D3CE] rounded-xl p-8 text-center bg-[#FAFBFA]">
                    <p className="text-[#C5D3CE] mb-3">No saved addresses yet</p>
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
                            className={`relative block border-2 rounded-xl p-4 cursor-pointer transition ${selectedAddress?.id === address.id
                                ? "border-[#98C1A9] bg-white"
                                : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                }`}
                        >
                            {Boolean(address.default) && (
                                <div className="absolute top-0 right-0 bg-[#98C1A9] text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                    Default
                                </div>
                            )}
                            <div className="flex flex-col md:block">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="radio"
                                        name="address"
                                        checked={selectedAddress?.id === address.id}
                                        onChange={() => onSelectAddress(address)}
                                        className="mt-1 accent-[#98C1A9] w-4 h-4 hidden"
                                    />
                                    <div className="flex-1 pr-0 md:pr-16">
                                        <p className="font-medium text-[#AFB1AE] mb-1">{address.name}</p>
                                        <p className="text-sm text-[#AFB1AE]">{address.address1}</p>
                                        <p className="text-sm text-[#AFB1AE] mt-1">
                                            postal code: {address.postal_code}
                                        </p>
                                        <p className="text-sm text-[#AFB1AE]">Phone: {address.phone_number}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 mt-3 justify-end md:absolute md:right-4 md:bottom-1 md:-translate-y-1/2 md:mt-0">
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (window.confirm('Are you sure you want to remove this address?')) {
                                                await onRemoveAddress(address.id);
                                            }
                                        }}
                                        className="text-[#AFB1AE] hover:text-red-500 transition cursor-pointer flex items-center justify-center gap-1 text-sm"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Remove
                                    </button>
                                    <button
                                        onClick={(e) => handleEditClick(address, e)}
                                        className="text-[#AFB1AE] hover:text-[#98C1A9] transition cursor-pointer flex items-center gap-1 text-sm"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.333 2.667H2.667A1.333 1.333 0 0 0 1.333 4v9.333a1.333 1.333 0 0 0 1.334 1.334h9.333a1.333 1.333 0 0 0 1.333-1.334V8.667M12.667 1.667a1.414 1.414 0 1 1 2 2L8 10.333l-2.667.667.667-2.667 6.667-6.666Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Edit
                                    </button>
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
