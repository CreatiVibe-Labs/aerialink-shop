'use client';

import BreadCrumbs from "@/components/common/bread-crumbs";
import CartSummary from "./_components/cart-summary";
import CartTable from "./_components/cart-table";
import MobileCartCard from "./_components/mobile-cart-card";
import { useCart } from "@/contexts/cart-context";

const CartPage = () => {
  const { cartItems, updateQuantity, updateSize, removeFromCart, getTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        <BreadCrumbs />
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (id: number, action: "inc" | "dec") => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      const newQty = action === "inc" ? currentItem.quantity + 1 : currentItem.quantity - 1;
      updateQuantity(id, newQty);
    }
  };

  const handleSizeChange = (id: number, val: string) => {
    updateSize(id, val);
  };

  const subtotal = getTotal();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      <BreadCrumbs />

      {/* Desktop Table */}
      <CartTable
        cartItems={cartItems}
        handleRemove={removeFromCart}
        handleQuantityChange={handleQuantityChange}
        handleSizeChange={handleSizeChange}
      />

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-3 overflow-hidden">
        {cartItems.map((item, index) => (
          <MobileCartCard
            key={item.id}
            id={item.id}
            image={item.images[0].url}
            name={item.translations.en.name}
            price={item.price}
            quantity={item.quantity}
            size={item.size}
            index={index}
            onRemove={removeFromCart}
            onQuantityChange={handleQuantityChange}
            onSizeChange={handleSizeChange}
          />
        ))}
      </div>

      {/* Summary */}
      <CartSummary 
        subtotal={subtotal}
        onUpdateCart={() => {}} // Optional
        onCheckout={() => console.log("Proceed to checkout")}
      />
    </div>
  );
};

export default CartPage;