import style from './style.module.scss'

export function Button({ onClick, label, className, disabled = false }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      children={label}
      className={`${style['button']} ${className ? className : ''}`}
    />
  )
}
