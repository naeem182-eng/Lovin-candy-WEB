import { useCart } from "../components/Cart/UserCart.jsx";

export default function Cart({ pkg, onClose }) {
  const { cartItems } = useCart();
console.log("Cart items:", cartItems);
  if (!pkg) return null;
  return (
    <div className="fixed right-0 top-0 h-full w-90 bg-white shadow-xl z-50 p-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="mb-4">
        <p className="font-bold">{pkg.name}</p>
        <p className="text-pink-500">฿{pkg.price}</p>
      </div>

      <div className="space-y-2">
        {cartItems.map((item, index) => (
          <div key={item._id || item.cartId || index} className="flex gap-2 items-center">
            <img src={item.imageUrl} className="w-10 h-10" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full bg-pink-400 text-white py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}