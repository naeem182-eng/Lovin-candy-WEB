import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProfileElement.css';
import axios from 'axios';

export default function ProfileOrder () {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBase = import.meta.env.VITE_API_URL;
  const [filter, setFilter] = useState('ALL');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${apiBase}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data.data);
      } catch (err) {
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [apiBase]);

  const filteredOrders = orders.filter((order) => {
    if (filter === 'ALL') return true;
    if (filter === 'PROGRESS_GROUP') {
    return order.status === 'PENDING' || order.status === 'IN-TRANSIT';
  }
    return order.status === filter; 
  });

  const getStatusColor = (status) => {
  switch (status) {
    case 'DELIVERED':
      return 'bg-green-100 text-green-700';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700';
    case 'CANCELLED':
      return 'bg-red-100 text-red-700';
    case 'IN-TRANSIT':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};  

  if (loading) return <div className="p-10 text-center">Loading orders...</div>;

  return (
    <div className="order-button w-full px-2 md:px-0">
      <div className='mb-5 flex justify-center md:justify-start overflow-x-auto md:overflow-visible scrollbar-hide'>
        <button 
        className={`progress-button whitespace-nowrap ${filter === 'ALL' ? 'active-filter' : ''}`}
        onClick={() => setFilter('ALL')}
        >All</button>
        <button 
        className={`progress-button whitespace-nowrap ${filter === 'PROGRESS_GROUP' ? 'active-filter' : ''}`}
        onClick={() => setFilter('PROGRESS_GROUP')}
        >In Progress</button>
        <button 
        className={`progress-button whitespace-nowrap ${filter === 'DELIVERED' ? 'active-filter' : ''}`}
        onClick={() => setFilter('DELIVERED')}
        >Delivered</button>
      </div>

    {filteredOrders.length === 0 ? (
  <p className="text-center py-10 text-gray-400">No orders found.</p>
) : (
  filteredOrders.map((order) => (
    <div key={order._id} className="mb-4">
      <div 
        className={`firstbox-order w-full cursor-pointer transition-all ${expandedOrderId === order._id ? 'border-[#ffbeda] border-1 shadow-md' : ''}`}
        onClick={() => toggleOrder(order._id)}
      >
        <div className='head-left'>
          <div className="detail1 flex justify-between md:justify-start items-center">
            <p className={`${getStatusColor(order.status)} py-1 px-4 rounded-3xl min-w-25 text-sm flex items-center justify-center text-center font-medium`}>
              {order.status}
            </p>
            <p className='md:ml-4 min-w-30 text-gray-400 md:text-black'>
              | {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <div className={`ml-auto text-xl transition-transform duration-300 ${expandedOrderId === order._id ? 'rotate-90 text-[#ff74b1]' : ''}`}>
              {'>'}
            </div>
          </div>
        </div>

        <div className='card-body flex flex-row items-center justify-between mt-4 md:mt-0'>
          <div className="card-info flex justify-start items-center gap-3 md:gap-4">
            <img 
              className="card-img w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg" 
              src={order.items?.[0]?.imageUrl || "/placeholder.png"} 
              alt="product" 
              onError={(e) => { e.target.src = "/placeholder.png" }}
            />
            <div className="detail2">
              <p className="text-sm font-bold">Order id : {order._id.substring(order._id.length - 8)}</p>
              <p className='text-[#696969] text-xs line-clamp-1'>
                {order.items?.[0]?.name} {order.items?.length > 1 && '...'}
              </p>
              <p className="text-sm text-[#ff74b1] font-bold">{order.total_price} THB</p>
            </div>
          </div>
          <div className="text-[#696969] text-sm">
            x {order.items?.reduce((total, item) => total + item.quantity, 0)}
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 bg-white mx-1 rounded-b-xl border-x border-b 
        ${expandedOrderId === order._id ? 'max-h-250 p-4 opacity-100 border-gray-300' : 'max-h-0 opacity-0 border-transparent'}`}>
        <h4 className="text-sm font-bold mb-3 text-gray-500 uppercase tracking-wide">Order Items:</h4>
        <div className="space-y-3">
          {order.items?.map((item, idx) => (
            <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start justify-between text-sm">
                <div className="flex items-start gap-3">
                  <img 
                    src={item.imageUrl || "/placeholder.png"} 
                    className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-lg shadow-sm border border-gray-100" 
                    alt={item.name}
                    onError={(e) => { e.target.src = "/placeholder.png" }}
                  />
                                    
                  <div className="flex flex-col">
                    <span className="font-bold text-[#2B3A55]">{item.name}</span>
                    
                    {item.isCustom && item.customDetails && (
                      <div className="mt-2 bg-pink-50/50 p-3 rounded-lg border border-pink-100/50 mb-5">
                        <p className="text-[10px] font-bold text-pink-500 uppercase tracking-wider mb-2">
                          🍬 Customization Details:
                        </p>
                        <div className="text-[11px] text-[#555] space-y-1">
                          {(item.customDetails.size || item.customDetails.packageName) && (
                            <div className="flex gap-1">
                              <span className="font-bold capitalize text-pink-400 min-w-[60px]">Size:</span>
                              <span className="text-gray-600">{item.customDetails.size || item.customDetails.packageName}</span>
                            </div>
                          )}

                          {(item.customDetails.candies || item.customDetails.selectedCandies) && (
                            <div className="flex items-start gap-1">
                              <span className="font-bold capitalize text-pink-400 min-w-[60px]">Candies:</span>
                              <span className="text-gray-600 leading-relaxed italic">
                                {Array.isArray(item.customDetails.candies || item.customDetails.selectedCandies)
                                  ? (item.customDetails.candies || item.customDetails.selectedCandies).join(', ')
                                  : String(item.customDetails.candies || item.customDetails.selectedCandies)
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right whitespace-nowrap ml-4">
                  <p className="font-semibold text-[#2B3A55]">{item.quantity} x {item.price} THB</p>
                  <p className="text-[10px] text-gray-400 font-bold">Total: {item.quantity * item.price} THB</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h4 className="text-sm font-bold border-t border-gray-300 text-gray-500 uppercase tracking-wide pt-5">
  Shipping Details
</h4>
<div className="text-sm text-gray-700 space-y-1 p-3 rounded-lg">
  <p>
    <span className="font-semibold">Name:</span>{" "}
    {order.shippingAddress?.fullName || "Not provided"}
  </p>
  <p>
    <span className="font-semibold">Phone:</span>{" "}
    {order.shippingAddress?.phone || "Not provided"}
  </p>
  <p className="flex gap-1">
    <span className="font-semibold whitespace-nowrap">Address:</span>
    <span>
      {order.shippingAddress ? (
        `${order.shippingAddress.streetAddress}, ${order.shippingAddress.subDistrict}, ${order.shippingAddress.district}, ${order.shippingAddress.province}, ${order.shippingAddress.postalCode}`
      ) : (
        "Not provided"
      )}
    </span>
  </p>
</div>
        
        <div className="pt-3 border-t border-gray-300 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-500">Total Amount:</span>
          <span className="text-xl font-bold text-[#ff74b1]">{order.total_price} THB</span>
        </div>
      </div>
    </div>
  ))
)}
    </div>
  );
}