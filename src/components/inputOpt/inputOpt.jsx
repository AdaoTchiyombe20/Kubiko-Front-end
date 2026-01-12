import React, { useState } from 'react';
import { InputOtp } from 'primereact/inputotp';

export default function InputOtpAuth() {
    const [token, setTokens] = useState();

    return (
        <div className="d-flex justify-content-center">
            <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} integerOnly/>
        </div>
    );
}