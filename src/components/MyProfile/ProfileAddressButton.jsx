import "./ProfileElement.css";

export default function ProfileAddressButton () {
  return (
    <div className='element-b'>
      <div className="w-full">
        <label className="flex flex-col">
          Name - Surname
          <input 
          type="text"
          className="border-[#C4C4C4] border rounded-lg max-w-210 min-w-120 mr-5 mt-2 pl-2 pt-1 pb-1"
          maxLength={100}>
          </input>
          
        </label>
        <label className="flex flex-col mt-3">
          Phone Number
          <input 
          type="tel"
          className="border-[#C4C4C4] border rounded-lg max-w-210 min-w-120 mr-5 mt-2 pl-2 pt-1 pb-1"
          maxLength={20}>
          </input>
        </label>
        <label className="flex flex-col mt-3">
          Address
          <input 
          type="text"
          className="border-[#C4C4C4] border rounded-lg max-w-210 min-w-120 mr-5 mt-2 pl-2 pt-1 pb-1"
          maxLength={200}>
          </input>
        </label>

        <div className="flex">
          <label className="flex flex-col mt-3">
            Province
            <input 
            type="text"
            className="border-[#C4C4C4] border rounded-lg max-w-102 min-w-80 mr-5 mt-2 pl-2 pt-1 pb-1"
            maxLength={50}>
            </input>
          </label>
          <label className="flex flex-col mt-3">
            District
            <input 
            type="text"
            className="border-[#C4C4C4] border rounded-lg max-w-102 min-w-80 mr-5 mt-2 pl-2 pt-1 pb-1"
            maxLength={50}>
            </input>
          </label>
        </div>

        <div className="flex">
          <div className="flex flex-col mt-3">
            Sub-District
            <input 
            type="text"
            className="border-[#C4C4C4] border rounded-lg max-w-102 min-w-80 mr-5 mt-2 pl-2 pt-1 pb-1"
            maxLength={50}>
            </input>
          </div>
          <div className="flex flex-col mt-3">
            Postal Code
            <input 
            type="number"
            className="border-[#C4C4C4] border rounded-lg max-w-102 min-w-80 mr-5 mt-2 pl-2 pt-1 pb-1"
            maxLength={20}>
            </input>
          </div>
        </div>

        <button className="bg-yellow-200 px-5 py-2 text-xl rounded-2xl mt-7 mb-7 cursor-pointer hover:scale-103 hover:bg-yellow-300">
          Add Address
        </button>
      </div>
    </div>
  )
}