export const PurchaseForm = ({ formData, setFormData, invalidFields = [] }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="flex flex-col gap-6">
            <form className="flex flex-col gap-4" aria-labelledby="purchase-form-title">
                <h2 id="purchase-form-title" className="text-lg font-semibold">Your Information</h2>

                {/* Name + Surname */}
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="w-full md:w-1/2">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`p-3 border rounded-[8px] w-full placeholder-gray-500 
                            ${invalidFields.includes("name")
                                ? "border-red-500 bg-red-50"
                                : "border-gray-400"
                            }`}
                            required
                        />
                        <span aria-live="polite" className={`${invalidFields.includes("name") ? "text-red-500 block" : "hidden"}`}>Required field</span>
                    </div>
                    <div className="w-full md:w-1/2">
                        <label htmlFor="surname" className="sr-only">Surname</label>
                        <input
                            id="surname"
                            name="surname"
                            type="text"
                            placeholder="Surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className={`p-3 border rounded-[8px] w-full placeholder-gray-500 
                            ${invalidFields.includes("surname")
                                ? "border-red-500 bg-red-50"
                                : "border-gray-400"
                            }`}
                            required
                        />
                        <span aria-live="polite" className={`${invalidFields.includes("surname") ? "text-red-500 block" : "hidden"}`}>Required field</span>
                    </div>
                </div>

                {/* ID */}
                <div>
                    <label htmlFor="identification" className="sr-only">ID or NIT</label>
                    <input
                        id="identification"
                        name="identification"
                        type="text"
                        placeholder="Cedula, ID or NIT"
                        value={formData.identification}
                        onChange={handleChange}
                        className={`p-3 border rounded-[8px] w-full placeholder-gray-500 
                        ${invalidFields.includes("identification")
                            ? "border-red-500 bg-red-50"
                            : "border-gray-400"
                        }`}
                        required
                    />
                    <span aria-live="polite" className={`${invalidFields.includes("identification") ? "text-red-500 block" : "hidden"}`}>Required field</span>
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="sr-only">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`p-3 border rounded-[8px] w-full placeholder-gray-500 
                        ${invalidFields.includes("address")
                            ? "border-red-500 bg-red-50"
                            : "border-gray-400"
                        }`}
                        required
                    />
                    <span aria-live="polite" className={`${invalidFields.includes("address") ? "text-red-500 block" : "hidden"}`}>Required field</span>
                </div>

                {/* City + State + Zip */}
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="w-full md:w-1/3">
                        <label htmlFor="city" className="sr-only">City</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className={`p-3 border rounded-[8px] w-full placeholder-gray-500 
                            ${invalidFields.includes("city")
                                ? "border-red-500 bg-red-50"
                                : "border-gray-400"
                            }`}
                            required
                        />
                        <span aria-live="polite" className={`${invalidFields.includes("city") ? "text-red-500 block" : "hidden"}`}>Required field</span>
                    </div>
                    <div className="w-full md:w-1/3">
                        <label htmlFor="state" className="sr-only">State</label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            className={`p-3 border rounded-[8px] w-full placeholder-gray-500 
                            ${invalidFields.includes("state")
                                ? "border-red-500 bg-red-50"
                                : "border-gray-400"
                            }`}
                            required
                        />
                        <span aria-live="polite" className={`${invalidFields.includes("state") ? "text-red-500 block" : "hidden"}`}>Required field</span>
                    </div>
                    <div className="w-full md:w-1/3">
                        <label htmlFor="zip" className="sr-only">Zip Code</label>
                        <input
                            id="zip"
                            name="zip"
                            type="text"
                            inputMode="numeric"
                            placeholder="Zip Code"
                            value={formData.zip}
                            onChange={handleChange}
                            className={`p-3 border rounded-[8px] w-full placeholder-gray-500 
                            ${invalidFields.includes("zip")
                                ? "border-red-500 bg-red-50"
                                : "border-gray-400"
                            }`}
                            required
                        />
                        <span aria-live="polite" className={`${invalidFields.includes("zip") ? "text-red-500 block" : "hidden"}`}>Required field</span>
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="sr-only">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`p-3 border rounded-[8px] w-full placeholder-gray-500 
                        ${invalidFields.includes("phone")
                            ? "border-red-500 bg-red-50"
                            : "border-gray-400"
                        }`}
                        required
                    />
                    <span aria-live="polite" className={`${invalidFields.includes("phone") ? "text-red-500 block" : "hidden"}`}>Required field</span>
                </div>
            </form>

            {/* Shipping Method info (static) */}
            <div>
                <h2 className="text-lg font-semibold">Shipping Method</h2>
                <div className="flex justify-between gap-2 border border-black rounded-[8px] p-4 bg-gray-50">
                    <p className="text-sm">
                        FREE National Delivery (2 to 3 business days main cities. More than 5 business days other municipalities)
                    </p>
                    <span className="font-medium">FREE</span>
                </div>
            </div>
        </section>
    );
};