export const OrderShippingDetail = ({address}) => {
    return (
        <div className="bg-gray-100 rounded-[8px] p-4">
            <h2>Shipping Detail</h2>
            <div className="text-xs text-gray-600">
                <p>Full Name: {address[0]?.first_name} {address[0]?.last_name}</p>
                <p>Address:{address[0]?.address_line}</p>
                <p>City: {address[0]?.city}</p>
                <p>State: {address[0]?.state}</p>
                <p>Phone: {address[0]?.phone}</p>
                <p>Email: {address[0]?.email}</p>
            </div>
        </div>
    )
};