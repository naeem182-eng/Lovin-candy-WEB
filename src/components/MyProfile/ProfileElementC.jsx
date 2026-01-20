import './ProfileElement.css';

export default function ProfileElementC ({ data }) {
  return (
    <>
    <div className='element-c'>
      <div className='tableitemsc'>
        <span className='text-lg'> Name - Surname</span>
        <span>{data?.first_name} {data?.last_name || "-"}</span>
      </div>
      <div className='tableitemsc'>
        <span className='text-lg'>Email</span>
        <span>{data?.email || "No email"}</span>
      </div>
      <div className='tableitemsc'>
        <span className='text-lg'>Phone Number</span>
        <span>{data?.phone || data?.phoneNumber || "No phone number"}</span>
      </div>
    </div>
    </>
  )
}