export function storageUtil() {
  function saveUserInfoOnStorage({ data }) {
    localStorage.setItem('username', data.name)
    localStorage.setItem('userEmail', data.email)
    localStorage.setItem('userId', data.id)
  }

  function getUserInformation() {
    const userName = localStorage.getItem('username')
    const userEmail = localStorage.getItem('userEmail')
    const idUser = localStorage.getItem('userId')

    return { userName, userEmail, idUser }
  }

  return { saveUserInfoOnStorage, getUserInformation }
}
