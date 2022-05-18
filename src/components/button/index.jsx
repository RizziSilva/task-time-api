import style from './style.module.scss'

export function Button({ onClick, label, className }) {
  return (
    <button
      onClick={onClick}
      children={label}
      className={`${style['button']} ${className ? className : ''}`}
    />
  )
}
