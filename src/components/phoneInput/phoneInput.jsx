import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PhoneInputAuth() {
  
  const [phone, setPhone] = useState('');

  return (
    <PhoneInput
        inputClass='w-100 phoneInput'
        country="ao"                     
        onlyCountries={['ao']}           
        disableDropdown={true}           
        countryCodeEditable={false}      
        disableCountryCode={false}       
        autoFormat={true}                
        placeholder="943 231 129"        
        value={phone}                    
        onChange={(value) => setPhone(value)} 
    />
  )
}
