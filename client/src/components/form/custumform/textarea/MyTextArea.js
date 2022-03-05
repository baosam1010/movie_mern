import React from 'react'

function MyTextArea({...props}) {
    // console.log(props)
    const {name, values, className, placeholder, handleChange, handleBlur} = props;
  return (    
    <textarea 
        className={className} 
        value={values[name]} 
        name ={name}
        onChange = {handleChange}
        onBlur = {handleBlur}
        placeholder={placeholder}
        />
  )
}

export default MyTextArea

