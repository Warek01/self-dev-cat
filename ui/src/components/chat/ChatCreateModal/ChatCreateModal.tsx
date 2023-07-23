import { Field, Form, Formik } from 'formik'
import { FC, memo, useCallback, useContext, useEffect, useState } from 'react'

import { ChatContext } from '@containers/ChatContainer/ChatContainer.context'
import { useGetCurrentUserQuery } from '@slices/currentUser/currentUser.slice'
import { closeModal } from '@slices/layout/layout.slice'
import { userClient } from '@clients'
import { useAppDispatch } from '@hooks'
import icons from '@icons'
import type { User } from '@/types/User'
import { Button, FormTextField } from '@components'
import type { ChatCreateFormValues } from './ChatCreateModal.types'

export const ChatCreateModal: FC = memo(() => {
  const dispatch = useAppDispatch()
  const user = useGetCurrentUserQuery()
  const { createMessageGroup } = useContext(ChatContext)

  const [friends, setFriends] = useState<User[]>([])

  useEffect(() => {
    ;(async () => {
      if (!user.data) {
        return
      }

      const req = await userClient.getFriends(user.data.id)
      setFriends(req.items)
    })()
  }, [])

  const handleSubmit = useCallback(
    async (values: ChatCreateFormValues) => {
      if (!user.data) {
        return
      }

      await createMessageGroup({
        name: values.name || undefined,
        rootUserid: user.data.id,
        userIds: values.userIds.map((id) => parseInt(id)),
      })
      dispatch(closeModal())
    },
    [createMessageGroup],
  )

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
          <ul className="flex flex-col gap-2 py-8 items-start">
            {friends.map((user) => (
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
