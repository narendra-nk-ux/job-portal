const renderOtpModal = (type) => {
    const isEmail = type === 'email';
    const targetValue = isEmail ? formValues.email : formValues.phone;
    const otpKey = isEmail ? "emailOtp" : "mobileOtp";
    const isCurrentlyVerified = isEmail ? isEmailVerified : isMobileVerified;

    return (
        <div className="otp-modal-overlay">
            <div className={`otp-modal-content ${isCurrentlyVerified ? 'success-bg' : ''}`}>

                {isCurrentlyVerified ? (
                    /* SUCCESS STATE: Shown inside the same modal after verification */
                    <div className="verified-container animate-fade-in">
                        <div className="otp-icon-container">
                            <img
                                src={Verified}
                                alt="Verified Success"
                                className="verified-popup-img"
                            />
                        </div>
                        <h3 className="verified-text-green">Verification Successful!</h3>
                        <p>Your {isEmail ? 'email' : 'mobile number'} has been verified.</p>
                    </div>
                ) : (
                    /* ACTIVE OTP INPUT STATE */
                    <>
                        <button className="back-arrow" onClick={() => {
                            setTimer(0);
                            setOtpValues({ ...otpValues, [otpKey]: "" });
                            isEmail ? setShowEmailOtp(false) : setShowMobileOtp(false);
                        }}>Back</button>

                        <div className="otp-icon-container">
                            <img
                                src={isEmail ? emailIcon : mobileIcon}
                                alt={isEmail ? "Email Verification" : "Mobile Verification"}
                                className="otp-status-icon"
                            />
                        </div>

                        <h3>{isEmail ? "Email Verification" : "Mobile Verification"}</h3>

                        {timer > 0 ? (
                            <>
                                <p>We've sent a code to <strong>{targetValue}</strong></p>

                                <div className="otp-input-group">
                                    {[...Array(6)].map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            id={`otp-${type}-${index}`}
                                            maxLength="1"
                                            value={otpValues[otpKey][index] || ""}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (/^[0-9]$/.test(val) || val === "") {
                                                    const newOtp = otpValues[otpKey].split("");
                                                    newOtp[index] = val;
                                                    const combinedOtp = newOtp.join("");
                                                    setOtpValues({ ...otpValues, [otpKey]: combinedOtp });

                                                    if (val && index < 5) {
                                                        document.getElementById(`otp-${type}-${index + 1}`).focus();
                                                    }
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Backspace" && !otpValues[otpKey][index] && index > 0) {
                                                    document.getElementById(`otp-${type}-${index - 1}`).focus();
                                                }
                                            }}
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>

                                <div className="resend-timer">
                                    Did not receive code?{' '}
                                    <span
                                        className="resend-link"
                                        style={{ cursor: 'pointer', color: '#0081FF' }}
                                        onClick={() => sendOtp(type)}
                                    >
                                        Resend OTP
                                    </span>
                                    {timer > 0 && <span> in {formatTime(timer)}</span>}
                                </div>

                                <button type="button" className="verify-final-btn" onClick={() => verifyOtp(type)}>
                                    Verify
                                </button>
                            </>
                        ) : (
                            <div className="expired-state">
                                <p className="error-msg-otp">OTP Session Expired</p>
                                <button type="button" className="verify-final-btn" onClick={() => sendOtp(type)}>
                                    Resend New OTP
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}



// SUCCESS POPUP VIEW

return (
    <div className="otp-modal-overlay">
        <div className="otp-modal-content success-popup-style">
            <div className="verified-container">
                <img
                    src={Verified}
                    alt="Verified Success"
                    className="verified-popup-img"
                />
                {/* <h1 className="verified-text-green">Verified</h1> */}
            </div>
        </div>
    </div>
);
      }