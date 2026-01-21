import "./ProfileElement.css";

export default function ProfileAddress () {
  return (
    <div className='element-b'>
      <div className="w-full mb-6">
        <div className="flex flex-col text-xl">
          Name - Surname
          <p className="mt-1 text-[#FF74B1]">Dja Eieiza</p>
        </div>
        <div className="flex flex-col mt-3 text-xl">
          Phone Number
          <p className="mt-1 text-[#FF74B1]">068459358</p>
        </div>
        <div className="flex flex-col mt-3 text-xl">
          Address
          <p className="mt-1 text-[#FF74B1]">30/48 bang bang boom</p>
        </div>

        <div className="flex gap-86">
          <div className="flex flex-col mt-3 text-xl">
            Province
            <p className="mt-1 text-[#FF74B1]">godzilla</p>
          </div>
          <div className="flex flex-col mt-3 text-xl">
            District
            <p className="mt-1 text-[#FF74B1] ">toyota</p>
          </div>
        </div>

        <div className="flex gap-80">
          <div className="flex flex-col mt-3 text-xl">
            Sub-District
            <p className="mt-1 text-[#FF74B1] ">yamaha</p>
          </div>
          <div className="flex flex-col mt-3 text-xl">
            Postal Code
            <p className="mt-1 text-[#FF74B1] ">8888</p>
          </div>
        </div>
      </div>
    </div>
  )
}