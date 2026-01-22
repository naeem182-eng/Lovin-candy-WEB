import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartItem = ({ cartItem, onIncrease, onDecrease, onRemoveItem }) => {
  const total = (Number(cartItem?.quantity) * Number(cartItem?.price)).toFixed(2);

  return (
    <div className="py-6">
      <div className="flex items-start gap-6">
        {/* Product Image */}
        <div className="w-32 h-32 border-2 border-black flex items-center justify-center bg-white flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
          <img
            className="w-24 h-24 object-contain"
            src={cartItem?.imageUrl || "/placeholder.png"}
            alt={cartItem?.name}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-black mb-1">
                {cartItem?.name}
              </h3>

              {cartItem?.isCustom && cartItem?.details?.candies ? (
                <div className="mt-2 mb-3 bg-pink-50/50 p-3 rounded-lg border border-pink-100/50">
                  <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider mb-2">
                    🍬 Included Sweet Sins:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cartItem.details.candies.map((candy, index) => (
                      <span 
                        key={index} 
                        className="bg-white px-3 py-1 rounded-full text-xs text-pink-500 border border-pink-200 shadow-sm font-medium"
                      >
                        {typeof candy === 'string' ? candy : candy.name}
                      </span>
                    ))}
                  </div>
                  {cartItem.details.size && (
                    <p className="mt-2 text-[10px] text-gray-400 italic font-medium">
                      Selected Size: {cartItem.details.size}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-1">Standard Set Item</p>
              )}
            </div>

            {/* Remove Button */}
            <button
              onClick={onRemoveItem}
              className="text-red-400 hover:text-red-600 font-bold text-xs uppercase tracking-widest transition cursor-pointer p-2"
            >
              Remove
            </button>
          </div>

          {/* Quantity & Total */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Quantity
              </label>
              <div className="flex items-center border-2 border-black rounded-lg overflow-hidden bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={onDecrease}
                  className="px-3 py-1 hover:bg-gray-100 transition text-black font-bold text-lg cursor-pointer"
                >
                  <FaMinus size={12} />
                </button>
                <span className="px-4 py-1 border-x-2 border-black text-black font-bold min-w-[50px] text-center">
                  {cartItem?.quantity}
                </span>
                <button
                  onClick={onIncrease}
                  className="px-3 py-1 hover:bg-gray-100 transition text-black font-bold text-lg cursor-pointer"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subtotal</p>
              <p className="text-2xl font-black text-black">฿{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;