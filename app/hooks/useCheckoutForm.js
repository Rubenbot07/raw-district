import { useState } from 'react';

export const useCheckoutForm = () => {
  const [delivery, setDelivery] = useState("shipping");
  const [payment, setPayment] = useState("mercado_pago");
  const [formData, setFormData] = useState({
    name: "", surname: "", identification: "",
    address: "", city: "", state: "", zip: "", phone: ""
  });

  return { delivery, setDelivery, payment, setPayment, formData, setFormData };
};