import { Field, Form, Formik } from 'formik'
import { FC, memo, useCallback } from 'react'

import { useAppSelector } from '@hooks'
import icons from '@icons'
import type { User } from '@/types/User'
import { selectAuthenticatedUser } from '@redux/auth.slice'
import { useGetFriendsQuery } from '@redux/user.api'
import { useCreateMessageGroupMutation } from '@redux/chat.api'
import { FormTextField } from '@components/forms'
import { Button } from '@components/input'

import type {
  ChatCreateFormValues,
  ChatCreateModalProps,
} from './ChatCreateModal.types'

export const ChatCreateModal: FC<ChatCreateModalProps> = memo(({ onClose }) => {
  const user: User | null = useAppSelector(selectAuthenticatedUser)
  const friends = useGetFriendsQuery(user?.id!, {
    skip: !user?.id,
  })
  const [createGroup] = useCreateMessageGroupMutation()

  const handleSubmit = useCallback(async (values: ChatCreateFormValues) => {
    if (!user) {
      throw new Error('user data is missing')
    }

    await createGroup({
      name: values.name || undefined,
      rootUserid: user.id,
      userIds: values.userIds,
    })
    onClose()
  }, [])

  return (
    <Formik
      initialValues={{ userIds: [], name: '' } as ChatCreateFormValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {isSubmitting && (
            <div className="w-full h-full justify-center items-center">
              <icons.Spinner width={24} height={24} className="animate-spin" />
            </div>
          )}

          <FormTextField
            name="name"
            placeholder="Group name"
            disabled={isSubmitting}
          />
          {friends.isLoading ? (
            <icons.Spinner width={32} height={32} className="animate-spin" />
          ) : (
            <ul className="flex flex-col gap-2 py-8 items-start">
              {(friends.data?.items || []).map((user) => (
                <label key={user.id} className="flex gap-2">
                  <Field
                    type="checkbox"
                    name="users"
                    value={user.id.toString()}
                    className="transform-gpu scale-125"
                  />
                  <span className="text-lg">{user.username}</span>
                </label>
              ))}
            </ul>
          )}
          <Button
            disabled={isSubmitting}
            submit
            text="Create"
            iconPosition="left"
            iconSize={18}
            Icon={icons.Add}
          />
        </Form>
      )}
    </Formik>
  )
})
