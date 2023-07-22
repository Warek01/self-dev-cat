import { ChatContext } from '@containers/ChatContainer/ChatContainer.context'
import { selectCurrentUser } from '@slices/currentUser/currentUser.slice'
import { Field, Form, Formik } from 'formik'
import { FC, memo, useCallback, useContext, useEffect, useState } from 'react'

import { userClient } from '@clients'
import { useAppSelector } from '@hooks'
import icons from '@icons'
import type { User } from '@/types/User'
import { Button, FormTextField, ModalWindow } from '@components'
import { ChatCreateFormValues } from './ChatCreateModal.types'
import type { ChatCreateModalProps } from './ChatCreateModal.types'

export const ChatCreateModal: FC<ChatCreateModalProps> = memo(({ onClose }) => {
  const { user } = useAppSelector(selectCurrentUser)
  const { createMessageGroup } = useContext(ChatContext)

  const [friends, setFriends] = useState<User[]>([])

  useEffect(() => {
    ;(async () => {
      const req = await userClient.getFriends(user!.id)
      setFriends(req.items)
    })()
  }, [])

  const handleSubmit = useCallback((values: ChatCreateFormValues) => {
    createMessageGroup({
      name: values.name || undefined,
      rootUserid: user!.id,
      userIds: values.userIds.map((id) => parseInt(id)),
    })
    onClose()
  }, [onClose, createMessageGroup])

  return (
    <ModalWindow onClose={onClose}>
      <Formik
        initialValues={{ userIds: [], name: '' } as ChatCreateFormValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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
    </ModalWindow>
  )
})
