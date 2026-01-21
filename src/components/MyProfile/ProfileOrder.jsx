import { Link } from 'react-router-dom';
import './ProfileElement.css';

export default function ProfileOrder () {
  
  const orders = [
    {
      id: "ASDASDW23432",
      date: "33 December 2086",
      status: "In Progress",
      itemsCount: 12,
      productName: "Gummies Rose - 500g",
      image: "/Gummy Roses.png",
      totalPrice: "5",
    },
    {
      id: "RTITP57656",
      date: "33 December 2086",
      status: "In Progress",
      itemsCount: 12,
      productName: "Heavenly Sours Gummy - 500g",
      image: "/Heavenly Sours Gummy.png",
      totalPrice: "2",
    },
    {
      id: "GUIFGI2342",
      date: "33 December 2086",
      status: "In Progress",
      itemsCount: 12,
      productName: "Jelly Belly UnBEARably Hot Cinnamon Bears - 500g",
      image: "/Jelly Belly UnBEARably Hot Cinnamon Bears.png",
      totalPrice: "1",
    },
  ]

  return (
    <div class="order-button">
      <div className='ml-2 mb-5'>
        <button class="progress-button">All</button>
        <button class="progress-button">In Progress</button>
        <button class="progress-button">Delivered</button>

      {/* START */}
      {orders.map((order) => (
        <div key={order.id}>
            <div className="firstbox-order">
              <Link to={`/order-details/${order.id}`}>
                <div className='head-left'>
                  <div className="detail1">
                    <p className='bg-yellow-200 py-2 px-4 rounded-3xl min-w-25'>{order.status}</p>
                    <p className='mr-80 min-w-30'>|  {order.date}</p>

                    <div>
                      <p className='min-w-15'>{order.itemsCount} items</p>
                    </div>
                  </div>
                </div>

                <div className='card-body'>
                  <div className="card-info flex justify-start">
                    <img 
                      className="card-img" 
                      src={order.image}
                      alt="order-item-pic" 
                    />
                    <div className="detail2">
                      <p>Order id : {order.id}</p>
                      <p className='ml-8 text-[#696969]'>
                        {order.productName} 
                        <span> </span>
                        <span className="text-[#ff74b1]"> 
                          and more...
                        </span>
                      </p>
                      <p>Total : {order.totalPrice} THB</p>
                    </div>
                  </div>

                  <div className="item-count text-[#696969]">
                    <p>x {order.itemsCount}</p>
                  </div>

                  <div className='text-6xl font-bold mb-10'>{'>'}</div>
                </div>
              </Link>
            </div>
        </div>
        // END
      ))}

        </div>
      </div>
  )
}