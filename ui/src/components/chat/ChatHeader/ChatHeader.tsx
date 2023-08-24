import { FC, memo, useCallback } from 'react'

import { useDeleteAllMessagesMutation, useGetCurrentUserQuery } from '@apis'
import icons from '@icons'
import { AppRoute } from '@enums/AppRoute'
import { Button } from '@components'
import type { ChatHeaderProps } from './ChatHeader.types'
import { useAppDispatch } from '@hooks'
import { openModal } from '@slices'

export const ChatHeader: FC<ChatHeaderProps> = memo(({ group }) => {
  const dispatch = useAppDispatch()
  const user = useGetCurrentUserQuery()
  const [deleteAllMessages] = useDeleteAllMessagesMutation()

  const handleDeleteMessages = useCallback(async () => {
    deleteAllMessages({ groupId: group!.id })
  }, [group])

  const openSettings = useCallback(() => {
    dispatch(
      openModal(
        <>
          <h2>Group settings</h2>
          <section className="border-t border-black/10 dark:border-dark-white/10 py-3 flex flex-col gap-3 items-start">
            <Button text="Change icon" />
            <Button
              text="Delete messages"
              disabled={group?.rootUser.id !== user.data?.id}
              onClick={handleDeleteMessages}
            />
            <Button text="Leave group" className="text-error" />
            <Button
              text="Delete group"
              className="text-error-disabled"
              disabled
            />
          </section>
        </>,
      ),
    )
  }, [handleDeleteMessages, group, user])

  return (
    <main className="border-b p-3 flex items-center justify-between gap-3 border-black/10 dark:border-dark-white/10">
      <section className="flex items-center flex-1 justify-start gap-3">
        <div>
          <Button
            type="link"
            to="info"
            Icon={icons.User}
            iconSize={24}
            circle
          />
        </div>
        <span>{group?.name}</span>
      </section>
      <section className="flex items-center justify-end gap-3">
        <Button
          circle
          Icon={icons.ArrowLeft}
          type="link"
          to={AppRoute.CHAT}
          iconSize={24}
        />
        <Button
          circle
          Icon={icons.Settings}
          iconSize={24}
          onClick={openSettings}
        />
      </section>
    </main>
  )
})
