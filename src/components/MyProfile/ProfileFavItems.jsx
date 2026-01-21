import './ProfileElement.css';
import { TiShoppingCart } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoHeart } from "react-icons/io5";

export default function ProfileFavItems () {

  const favItems = [
    { id: 1, name: "Banana Split Cream Swirl Lollipop", img: "/Banana Split Cream Swirl Lollipop Bag.png" },
    { id: 2, name: "Banana Split Cream Swirl Lollipop", img: "/Banana Split Cream Swirl Lollipop Bag.png" },
    { id: 3, name: "Banana Split Cream Swirl Lollipop", img: "/Banana Split Cream Swirl Lollipop Bag.png" },
    { id: 4, name: "Banana Split Cream Swirl Lollipop", img: "/Banana Split Cream Swirl Lollipop Bag.png" },
    { id: 5, name: "Banana Split Cream Swirl Lollipop", img: "/Banana Split Cream Swirl Lollipop Bag.png" },
    ]
  

  return (
    <div className='bg-white w-260 h-auto rounded-2xl p-5 shadow-lg mb-15'>
      <ul className='grid grid-cols-3 gap-5 justify-center pb-5'>
        
        {favItems.map((item) => (
          <li 
            key={item.id}
            className='relative w-80 flex flex-col text-start bg-[#FCE7F3] p-5 rounded-xl text-2xl shadow-lg cursor-pointer hover:scale-103'
          >
            <div className="absolute top-5 right-5 text-[#65DBFF] hover:text-red-500">
              <IoHeart size={40} />
            </div>
            
            <img 
              className="w-72 h-72 object-cover rounded-xl mb-5" 
              src={item.img} 
              alt={item.name}
            />
            
            <div className='text-[#4C4C4C] font-bold text-2xl overflow-hidden line-clamp-1'>
              {item.name}
            </div>

            <div className='flex gap-5 justify-center mt-3'>
              <button className='bg-[#A6EAFF] w-45 h-12 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-blue-300'>
                <TiShoppingCart size={25}/>
              </button>
              <button className='bg-red-400 w-20 h-12 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-red-600 text-white'>
                <RiDeleteBin5Line size={25}/>
              </button>
            </div>
          </li>
        ))}

      </ul>
    </div>
  )
}