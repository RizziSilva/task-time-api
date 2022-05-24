export function storageUtil() {
  function saveUserInfoOnStorage(data) {
    localStorage.setItem('username', data.name)
    localStorage.setItem('userEmail', data.email)
    localStorage.setItem('userId', data.id)
  }

  return { saveUserInfoOnStorage }
}
