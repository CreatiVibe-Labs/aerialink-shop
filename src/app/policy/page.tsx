import React from "react";

export const metadata = {
  title: "Policy | Aerialink",
  description: "Delivery, shipping fees, cancellations, returns and exchanges policy.",
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="md:mb-10 mb-6">
    <h2 className="md:text-3xl text-2xl font-semibold text-[#AFB1AE] md:mb-2 mb-1">{title}</h2>
    <div className="md:space-y-4 space-y-3 text-[#AFB1AE] leading-relaxed text-[16px] md:text-[20px]">
      {children}
    </div>
  </section>
);

export default function PolicyPage() {
  return (
    <main className="max-w-7xl mx-auto md:px-0 px-4 md:py-2 py-1">
      <h1 className="md:text-[40px] text-[32px] font-bold text-[#AFB1AE] md:mb-4 mb-3">Shipping & Return Policy</h1>

      <Section title="Delivery">
        <ul className="list-disc md:pl-6 pl-4 md:space-y-2 space-y-1 text-[#AFB1AE] md:text-[20px] text-[16px]">
          <li>The package is heavy. Please prepare a dolly by yourself.</li>
          <li>
            In the following cases, the package will be delivered to the parking location or at the first floor building entrance:
            <ol className="list-decimal md:pl-6 pl-4 mt-2 md:space-y-2 space-y-1">
              <li>The delivery truck cannot make a U-turn, there is a narrow corner, or the road is too narrow.</li>
              <li>Parking is not possible in front of the delivery site, or there are no-parking zones on nearby streets.</li>
              <li>There are stairs or steps between the parking location and the building entrance.</li>
              <li>Delivery to the second floor or higher or a high-rise building without an elevator.</li>
              <li>Areas where delivery to each household is difficult, such as in the mountains or in disaster recovery areas (in this case, delivery to the nearby delivery center).</li>
            </ol>
          </li>
          <li>As the package is long, please check the elevator and other access routes.</li>
          <li>We cannot deliver to corporations.</li>
          <li>We do not accept contactless delivery.</li>
          <li>The delivery date will be notified by email when your order is complete.</li>
          <li>
            You can specify the date and time of delivery within the following time slots from 5 business days after the order date: 9am–12pm / 2pm–4pm / 4pm–6pm / 6pm–9pm
          </li>
          <li>If you wish to change the delivery date or time before shipping, please contact us by email. After shipping, please contact the delivery company directly.</li>
          <li>You can change the delivery address free of charge only before shipping. If you change the address after shipping, a transfer fee (paid by the customer) will be charged.</li>
        </ul>
      </Section>

      <Section title="Shipping Fees">
        <ul className="list-disc md:pl-6 pl-4 md:space-y-2 space-y-1">
          <li>Free shipping except for Hokkaido, Okinawa, and other remote islands.</li>
          <li>Additional shipping fees will be charged for delivery to Hokkaido, Okinawa, and other remote islands.</li>
          <li>Additional shipping fees vary depending on the size of the carpet, the area to be delivered, and the number of items.</li>
          <li>
            If you would like to check the shipping fee in advance, please fill out the following items in the &quot;Inquiries&quot; section and we will inform you.
            <div className="mt-2 md:p-4 p-3 rounded-md text-[#AFB1AE] md:mr-5.5 mr-2">
              <p className="font-semibold text-text-[#AFB1AE] md:mb-1 mb-0.5 md:text-2xl text-xl">Shipping Fee Inquiries</p>
              <ul className="list-disc md:pl-6 pl-4 space-y-1">
                <li>Delivery address / zip code</li>
                <li>Product number (Example: GA71)</li>
                <li>Quantity</li>
              </ul>
            </div>
          </li>
        </ul>
      </Section>

      <Section title="Order Cancellations">
        <p>Cancellations are only possible for unshipped items.</p>
      </Section>

      <Section title="Returns & Exchanges">
        <h3 className="text-2xl font-semibold text-text-[#AFB1AE]">Returns (Customer Convenience)</h3>
        <p className="mt-2">The following reasons are considered to be customer convenience:</p>
        <ul className="list-disc md:pl-6 pl-4 md:space-y-2 space-y-1 mt-2">
          <li>Different from what you expected, narrow access route, not delivered on the desired date, 2-pack wood carpet, etc.</li>
        </ul>
        <p className="mt-4">We accept returns only for unopened products within 7 days of arrival. Unopened means that the inner plastic has not been opened.</p>
        <p className="mt-2">
          For returns after the product has been shipped, the customer will be responsible for the round-trip shipping fee (plus additional shipping fee for remote islands) and other expenses (repacking amount, inspection amount, refund administration fee). Since the return address is different from the company&apos;s location, we will not be able to accept the return without contacting us. All expenses incurred at that time will be borne by the customer.
        </p>
        <div className="mt-4 md:p-4 p-3 rounded-md md:mx-5.5 mx-2">
          <p className="font-semibold text-[#AFB1AE] md:mb-2 mb-1 md:text-2xl text-xl">Return Request (within 7 days)</p>
          <ul className="list-disc md:pl-6 pl-4 space-y-1 text-[#AFB1AE]">
            <li>Name</li>
            <li>Order number</li>
            <li>Product number to be returned</li>
            <li>Quantity to be returned</li>
            <li>Reason for return</li>
          </ul>
        </div>
        <p className="mt-4">After confirmation, we will inform you of the return fee and procedure.</p>
        <ul className="list-disc md:pl-6 pl-4 md:space-y-2 space-y-1 mt-4">
          <li>
            The shipping fee and other costs incurred when returning the product may be higher than the purchase price because the contracted shipping fee will not be applied and the regular shipping fee will be applied.
          </li>
          <li>
            If the product is not returned by the delivery company designated by our company, the customer will be responsible for the difference in shipping fee.
          </li>
        </ul>
          <p className="font-semibold text-[#AFB1AE] md:mb-2 mb-1 md:text-2xl text-xl">Return Request (within 7 days)</p>
        <h4 className="md:text-2xl text-xl font-semibold text-[#AFB1AE] mt-6">Returns Not Accepted</h4>
        <ul className="list-disc md:pl-6 pl-4 space-y-1 mt-2">
          <li>Damage, dents, scratches on the packaging material, or damage or dirt to the packaging material that occurred during transportation</li>
          <li>Minor scratches in the details or chipping or peeling due to the nature of the material</li>
          <li>If the product itself has been modified or adjusted by the customer</li>
          <li>Two-packaged wood carpet</li>
          <li>Products that have been accidentally soiled or damaged by the customer</li>
          <li>More than 7 days have passed since the delivery was completed</li>
        </ul>
        <h3 className="md:text-xl text-lg font-semibold text-[#AFB1AE] mt-8">Exchanges</h3>
        <p className="mt-2">We will only exchange products if we send the wrong product or if you receive a defective product.</p>
        <p className="mt-2">Please contact us within one week of receiving the product. We will send you a replacement product.</p>
        <p className="mt-2">Delivery and collection will be done by the regular delivery service of each delivery company, so it will take a few days to pick up and deliver the defective product.</p>
        <p className="mt-2">You will need to pack the replacement product yourself. Please keep the packaging materials. We will cover the shipping costs.</p>
      </Section>
    </main>
  );
}
