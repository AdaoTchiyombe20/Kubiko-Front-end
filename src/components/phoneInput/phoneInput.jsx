import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PhoneInputAuth({
  value,
  onChange
}) {
  
  return (
    <PhoneInput
        inputClass='w-100 phoneInput'
        inputProps={{
          maxLength: 16 // +244 + espaço + 9 dígitos
        }}
        country="ao"                     
        onlyCountries={['ao']}           
        disableDropdown={true}           
        countryCodeEditable={false}      
        disableCountryCode={false}       
        autoFormat={true}                
        placeholder="943 231 129"        
        value={value || ''}                    
        onChange={(value) => { 
          onChange(value)
        }} 
    />
  )
}
