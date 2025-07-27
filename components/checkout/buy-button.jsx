export const BuyButton = ({ productId, quantity = 1, unit_price, product_size_id }) => {
    const [loading, setLoading] = useState(false);
    const { handleBuyNow } = useBuyNow({ productId, quantity, unit_price, product_size_id, setLoading });

    const handleClick = async () => {
        try {
            await handleBuyNow();
        } catch (error) {
            console.error('Error during Buy Now:', error);
            // Aquí podrías manejar el error, como mostrar un mensaje al usuario
        }
    };

    return (
        <button onClick={handleClick} className="bg-black text-white py-2 px-4 rounded-lg">
            {loading ? 'Processing...' : 'Buy Now'}
        </button>
    );
}