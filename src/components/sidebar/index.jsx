import Image from 'next/image'
import { useRouter } from 'next/router'
import { USER_ICON, LOGO_ICON } from 'app-statics'
import { storageUtil } from 'app-utils'
import { PAGES } from 'app-constants'
import { SIDEBAR_ITEMS } from './constants'
import style from './style.module.scss'

export function Sidebar() {
  const router = useRouter()
  const { getUserInformation, removeUserInformationFromStorage } = storageUtil()

  function handleClickItem(page) {
    router.push(page)
  }

  function handleClickLogout() {
    removeUserInformationFromStorage()
    router.push(PAGES.LOGIN)
  }

  function renderSubItems(items) {
    return items.map(({ text, page, icon }, index) => {
      return (
        <div key={index} className={style['container-action']}>
          <Image src={icon} width={20} height={20} />
          <button
            onClick={() => handleClickItem(page)}
            className={style['action']}
          >
            {text}
          </button>
        </div>
      )
    })
  }

  function renderItems() {
    return SIDEBAR_ITEMS.map(({ title, items }, index) => {
      return (
        <div key={index} className={style['container-item']}>
          <span className={style['title']}>{title}</span>
          {renderSubItems(items)}
        </div>
      )
    })
  }

  function renderUserInfo() {
    const { userName, userEmail } = getUserInformation()
    return (
      <div className={style['container-user-info']}>
        <div className={style['container-info']}>
          <span className={style['info']}>{userName}</span>
          <span className={style['info']}>{userEmail}</span>
        </div>
        <div className={style['container-icon']}>
          <Image src={USER_ICON} width={40} height={40} />
        </div>
      </div>
    )
  }

  return (
    <div className={style['container-sidebar']}>
      <div className={style['container-logo']}>
        <Image src={LOGO_ICON} height={42} width={179} />
      </div>
      <div className={style['container-items']}>{renderItems()}</div>
      <div className={style['container-footer']}>
        {renderUserInfo()}
        <button className={style['logout']} onClick={handleClickLogout}>
          Sair
        </button>
      </div>
    </div>
  )
}
