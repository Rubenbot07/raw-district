export const OrderShippingDetail = ({ address }) => {
  const shipping = address?.[0];

  if (!shipping) {
    return (
      <div className="bg-gray-100 rounded-[8px] p-4">
        <h2 className="text-base font-semibold mb-2">Shipping Detail</h2>
        <p className="text-xs text-gray-600">No shipping information available.</p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="shipping-details-title"
      className="bg-gray-100 rounded-[8px] p-4"
    >
      <h2 id="shipping-details-title" className="text-base font-semibold mb-2">
        Shipping Detail
      </h2>

      <dl className="text-xs text-gray-700 space-y-1">
        <div>
          <dt className="inline font-medium">Full Name: </dt>
          <dd className="inline">
            {shipping.first_name} {shipping.last_name}
          </dd>
        </div>

        <div>
          <dt className="inline font-medium">Address: </dt>
          <dd className="inline">{shipping.address_line}</dd>
        </div>

        <div>
          <dt className="inline font-medium">City: </dt>
          <dd className="inline">{shipping.city}</dd>
        </div>

        <div>
          <dt className="inline font-medium">State: </dt>
          <dd className="inline">{shipping.state}</dd>
        </div>

        <div>
          <dt className="inline font-medium">Phone: </dt>
          <dd className="inline">{shipping.phone}</dd>
        </div>

        <div>
          <dt className="inline font-medium">Email: </dt>
          <dd className="inline">{shipping.email}</dd>
        </div>
      </dl>
    </section>
  );
};