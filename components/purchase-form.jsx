export const PurchaseForm = ({formData, setFormData}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    return (
        <section className="flex flex-col gap-4">
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 md:flex-row">
                    <input className="p-3 border-[1px] w-full md:w-1/2 border-gray-400 rounded-[8px] placeholder-gray-500" type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange}/>
                    <input className="p-3 border-[1px] w-full md:w-1/2 border-gray-400 rounded-[8px] placeholder-gray-500" type="text" id="surname" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange}/>
                </div>
                <input type="text" id='identification' name="identification" placeholder="Cedula, ID or NIT" value={formData.identification}  onChange={handleChange} className="p-3 border-[1px] w-full border-gray-400 rounded-[8px] placeholder-gray-500"/>
                <input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="p-3 border-[1px] w-full border-gray-400 rounded-[8px] placeholder-gray-500" />
                <div className="flex flex-col gap-4 md:flex-row">
                    <input type="text" id="city" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="p-3 border-[1px] w-full md:w-1/3 border-gray-400 rounded-[8px] placeholder-gray-500" />
                    <input type="text" id="state" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="p-3 border-[1px] w-full md:w-1/3 border-gray-400 rounded-[8px] placeholder-gray-500" />
                    <input type="text" id="zip" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} className="p-3 border-[1px] w-full md:w-1/3 border-gray-400 rounded-[8px] placeholder-gray-500" />
                </div>
                <input type="number" id="phone" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-3 border-[1px] w-full border-gray-400 rounded-[8px] placeholder-gray-500"/>
            </form>
            <h2>Shipping Method</h2>
            <div className="flex justify-between gap-2 border-[1px] border-black rounded-[8px] p-4">
                <div>
                    <p className="text-sm">FREE National Delivery (2 to 3 business days main cities. More than 5 business days other municipalities)</p>
                </div>
                <div>
                    <span>FREE</span>
                </div>
            </div>
        </section>
    )
};