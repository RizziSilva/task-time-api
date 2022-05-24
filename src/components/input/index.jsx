import style from './style.module.scss'

export function Input({
  onChange,
  label,
  name,
  id,
  type = 'text',
  disabled = false,
  className,
  value
}) {
  return (
    <fieldset className={style['fieldset']}>
      <input
        id={id}
        name={name}
        className={`${className ? className : ''} ${
          value ? style['hasValue'] : ''
        } ${style['input']}`}
        disabled={disabled}
        type={type}
        onChange={onChange}
      />
      <label className={style['label']} htmlFor={id}>
        {label}
      </label>
    </fieldset>
  )
}
