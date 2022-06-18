export function storageUtil() {
  function getItem(itemName) {
    const item = localStorage.getItem(itemName)
    return item === 'undefined' ? undefined : item
  }

  function saveUserInfoOnStorage({ data }) {
    localStorage.setItem('username', data.name)
    localStorage.setItem('userEmail', data.email)
    localStorage.setItem('userId', data.id)
  }

  function getUserInformation() {
    if (typeof window !== 'undefined') {
      const userName = getItem('username')
      const userEmail = getItem('userEmail')
      const idUser = getItem('userId')

      return { userName, userEmail, idUser }
    }

    return { userName: '', userEmail: '', idUser: '' }
  }

  function removeUserInformationFromStorage() {
    localStorage.clear()
  }

  return {
    saveUserInfoOnStorage,
    getUserInformation,
    removeUserInformationFromStorage
  }
}
