import { FC, memo, useState } from 'react'

import type { ChatHeaderProps } from './ChatHeader.types.ts'
import icons from '../../../icons'
import { Backdrop, Button, Modal } from '../../index.ts'
import { AppRoute } from '../../../lib/enums/AppRoute.ts'

const ChatHeader: FC<ChatHeaderProps> = ({ group }) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)

  return (
    <>
      {settingsOpen && (
        <Backdrop visible>
          <div
            className="relative w-full max-w-[750px] flex flex-col items-stert justify-start p-12 gap-6
            bg-card-bg dark:bg-card-bg-dark rounded-2xl"
          >
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
              <Button text="Leave group" />
              <Button text="Delete group" disabled />
            </section>
          </div>
        </Backdrop>
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
}

export default memo(ChatHeader)
