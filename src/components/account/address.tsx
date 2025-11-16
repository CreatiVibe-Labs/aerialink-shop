"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import AddAddressModal from "@/app/(product)/checkout/_components/add-address-modal";
import DeleteAddressModal from "./delete-address-modal";
import { useAddresses } from "@/contexts/address-context";
import toast, { Toaster } from "react-hot-toast";

const DeliveryAddress: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [addressToDelete, setAddressToDelete] = useState<any>(null);
  const { addresses, loading, deleteAddress, setDefaultAddress, addAddress, updateAddress } = useAddresses();

  // Sort addresses to show default first
  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.default && !b.default) return -1;
    if (!a.default && b.default) return 1;
    return 0;
  });

  const handleDelete = (address: any) => {
    setAddressToDelete(address);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteAddress(addressToDelete.id);
        setShowDeleteModal(false);
        setAddressToDelete(null);
      } catch (err) {
        // Error already handled in context
      }
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddress(id);
    } catch (err) {
      // Error already handled in context
    }
  };

  const handleEdit = (address: any) => {
    // Map the context address to the modal's expected format
    const mappedAddress = {
      id: address.id,
      name: address.name,
      phone_number: address.phone_number,
      address1: address.address1,
      postal_code: address.postal_code,
      default: address.default || false,
    };
    setEditingAddress(mappedAddress);
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleSave = async (data: any) => {
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, data);
      } else {
        await addAddress(data);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to save address" };
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full my-10">
        {/* Address Boxes */}
        <div className="flex flex-wrap lg:gap-[26.62px] gap-[10.19px] w-full">
          {/* Add Address Box */}
          <div
            onClick={() => setShowForm(true)}
            className="w-full lg:w-[32%] lg:h-[257px] h-[200px] border-2 border-dashed border-[#98C1A9] rounded-[16.21px] flex flex-col justify-center items-center text-[#98C1A9] cursor-pointer hover:bg-[#98C1A9]/10 transition"
          >
            <Plus
              size={43}
              strokeWidth={1.5}
              className="opacity-100 text-[#98C1A9]"
            />
            <p className="mt-2 text-[28px] font-[600] text-[#98C1A9]">
              Add Address
            </p>
          </div>

          {loading && addresses.length === 0 ? (
            <div className="w-full text-center py-8 text-[#666664]">Loading addresses...</div>
          )  : (
            sortedAddresses.map((address) => (
              <div
                key={address.id}
                className="w-full lg:w-[31%] lg:h-[257px] h-auto bg-white rounded-xl border border-[#98C1A9] shadow-sm overflow-hidden flex flex-col"
              >
                {/* Default Header (only if default) */}
                {address.default !== 0 && (
                  <div className="bg-[#98C1A9] flex items-center text-white h-[37px] text[16px] pl-[9px] font-medium">
                    Default
                  </div>
                )}

                {/* Address Info */}
                <div className="flex flex-col justify-between flex-grow p-4">
                  <div>
                    {!address.default && (
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[#98C1A9] font-semibold text-[16px]">
                          Address
                        </h3>
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-[#98C1A9] text-[14px] underline font-medium hover:text-[#7CAB91] transition"
                        >
                          Set as default
                        </button>
                      </div>
                    )}
                    <h3 className="text-[#666664] font-semibold text-[20px]">
                      {address.name}
                    </h3>
                    <p className="text-[#666664] font-semibold text-[18px] leading-snug">
                      {address.address1}
                      {address.address2 && `, ${address.address2}`}
                    </p>
                    <p className="text-[#666664] font-semibold text-[18px]">
                      {address.postal_code}
                      {address.prefecture && `, ${address.prefecture}`}
                    </p>
                    <p className="text-[#666664] font-semibold text-[18px]">
                      {address.phone_number}
                    </p>
                    
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-4 gap-[19px]">
                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleEdit(address)}
                      className="flex items-center justify-center w-[133px] h-[38px] text-white border border-[#98C1A9] bg-[#98C1A9] px-4 py-1 rounded-[14px] text-[16px] font-medium cursor-pointer hover:bg-[#7CAB91]"
                    >
                      <Image
                        src="/assets/account/interface-edit-write.png"
                        alt="edit"
                        width={14}
                        height={14}
                      />
                      <span className="ml-2">Edit</span>
                    </button>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleDelete(address)}
                      className="flex items-center justify-center w-[133px] h-[38px] text-white border border-[#98C1A9] bg-[#98C1A9] px-4 py-1 rounded-[14px] text-[16px] font-medium hover:bg-[#7CAB91]"
                    >
                      <Image
                        src="/assets/account/interface-delete-bin.png"
                        alt="delete"
                        width={14}
                        height={14}
                      />
                      <span className="ml-2">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Address Form (Popup) */}
      <AddAddressModal
        isOpen={showForm}
        onClose={handleCloseModal}
        onSave={handleSave}
        editAddress={editingAddress}
      />

      {/* Delete Confirmation Modal */}
      <DeleteAddressModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAddressToDelete(null);
        }}
        onConfirm={confirmDelete}
        addressName={addressToDelete?.name}
      />
    </>
  );
};

export default DeliveryAddress;
