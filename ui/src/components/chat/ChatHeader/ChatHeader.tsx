import { FC, memo, useState } from 'react'

import icons from '@icons'
import { AppRoute } from '../../../enums/AppRoute'
import { Button, ModalWindow } from '@components'
import type { ChatHeaderProps } from './ChatHeader.types'

export const ChatHeader: FC<ChatHeaderProps> = memo(({ group }) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)

  return (
    <>
      {settingsOpen && (
        <ModalWindow>
          <Button
            circle
            className="absolute top-3 right-3"
            Icon={icons.Close}
            iconSize={24}
            onClick={() => setSettingsOpen(false)}
          />
          <h2>Group settings</h2>
          <section className="border-t border-black/10 dark:border-dark-white/10 py-3 flex flex-col gap-3 items-start">
            <Button text="Change icon" />
            <Button text="Delete messages" disabled />
            <Button text="Leave group" className="text-error" />
            <Button
              text="Delete group"
              className="text-error-disabled"
              disabled
            />
          </section>
        </ModalWindow>
      )}

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
            onClick={() => setSettingsOpen(true)}
          />
        </section>
      </main>
    </>
  )
})
