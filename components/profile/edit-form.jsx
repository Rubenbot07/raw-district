'use server'
import { updateUserMetadata } from '@/actions/update-user-metadata'

export const EditForm = async ({ userInfo }) => {
  return (
    <section aria-labelledby="edit-profile-heading">
      <form action={updateUserMetadata} className='flex flex-col gap-4'>
        <fieldset className='flex flex-col gap-2 p-4 bg-gray-100 rounded-[8px] text-sm'>
          <legend className="sr-only">Edit contact information</legend>

          <label className='text-gray-600' htmlFor="address">Address</label>
          <input
            className='p-2 rounded-[8px] border-[1px] border-gray-400'
            type="text"
            id="address"
            name="address"
            required
            defaultValue={userInfo.user_metadata.address}
          />

          <label className='text-gray-600' htmlFor="phone">Phone</label>
          <input
            className='p-2 rounded-[8px] border-[1px] border-gray-400'
            type="tel"
            id="phone"
            name="phone"
            required
            defaultValue={userInfo.user_metadata.phone}
          />
        </fieldset>

        <button
          className='bg-black text-white py-2 text-center rounded-[8px] self-start w-32'
          type="submit"
        >
          Update
        </button>
      </form>
    </section>
  )
}