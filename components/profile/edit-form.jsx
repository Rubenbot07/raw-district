'use server'
import { updateUserMetadata } from '@/actions/update-user-metadata'
import Form from 'next/form'
export const EditForm = async ({ userInfo }) => {
    return (
        <section>
            <Form action={updateUserMetadata} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2 p-4 bg-gray-100 rounded-[8px] text-sm'>
                    <label className='text-gray-600' htmlFor="address">Address</label>
                    <input className='p-2 rounded-[8px] border-[1px] border-gray-400' type="text" id="address" name="address" defaultValue={userInfo.user_metadata.address} />
                    <label className='text-gray-600' htmlFor="phone">Phone</label>
                    <input className='p-2 rounded-[8px] border-[1px] border-gray-400' type="text" id="phone" name="phone" defaultValue={userInfo.user_metadata.phone} />
                </div>
                <button className='bg-black text-white py-2 text-center rounded-[8px] self-start w-32' type="submit">Update</button>
            </Form>
        </section>
    )
}