'use server'
import { updateUserMetadata } from '@/utils/actions'
import Form from 'next/form'
export const EditForm = async ({ userInfo }) => {
    return (
        <div>
            <Form action={updateUserMetadata}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" defaultValue={userInfo.user_metadata.address} />
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" defaultValue={userInfo.user_metadata.phone} />
                <button type="submit">Update</button>
            </Form>
        </div>
    )
}