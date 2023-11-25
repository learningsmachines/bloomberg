/**
 * Creates a time-based one-time password (TOTP). This handles creating a random
 * secret (base32 encoded), and generating a TOTP for the current time. As a
 * convenience, it also returns the config options used to generate the TOTP.
 *
 * @param {Object} [options] Configuration options for the TOTP.
 * @param {number} [options.period=30] The number of seconds for the OTP to be
 * valid. Defaults to 30.
 * @param {number} [options.digits=6] The length of the OTP. Defaults to 6.
 * @param {string} [options.algorithm='SHA1'] The algorithm to use. Defaults to
 * SHA1.
 * @param {string} [options.charSet='0123456789'] - The character set to use, defaults to the numbers 0-9.
 * @param {string} [options.secret] The secret to use for the TOTP. It should be
 * base32 encoded (you can use https://npm.im/thirty-two). Defaults to a random
 * secret: base32.encode(crypto.randomBytes(10)).toString().
 * @returns {{otp: string, secret: string, period: number, digits: number, algorithm: string, charSet: string}}
 * The OTP, secret, and config options used to generate the OTP.
 */
export function generateTOTP({ period, digits, algorithm, secret, charSet, }?: {
    period?: number;
    digits?: number;
    algorithm?: string;
    charSet?: string;
    secret?: string;
}): {
    otp: string;
    secret: string;
    period: number;
    digits: number;
    algorithm: string;
    charSet: string;
};
/**
 * Generates a otpauth:// URI which you can use to generate a QR code or users
 * can manually enter into their password manager.
 *
 * @param {Object} options Configuration options for the TOTP Auth URI.
 * @param {number} options.period The number of seconds for the OTP to be valid.
 * @param {number} options.digits The length of the OTP.
 * @param {string} options.algorithm The algorithm to use.
 * @param {string} options.secret The secret to use for the TOTP Auth URI.
 * @param {string} options.accountName A way to uniquely identify this Auth URI
 * (in case they have multiple of these).
 * @param {string} options.issuer The issuer to use for the TOTP Auth URI.
 *
 * @returns {string} The OTP Auth URI
 */
export function getTOTPAuthUri({ period, digits, algorithm, secret, accountName, issuer, }: {
    period: number;
    digits: number;
    algorithm: string;
    secret: string;
    accountName: string;
    issuer: string;
}): string;
/**
 * Verifies a time-based one-time password (TOTP). This handles decoding the
 * secret (base32 encoded), and verifying the OTP for the current time.
 *
 * @param {Object} options The otp, secret, and configuration options for the
 * TOTP.
 * @param {string} options.otp The OTP to verify.
 * @param {string} options.secret The secret to use for the TOTP.
 * @param {number} [options.period] The number of seconds for the OTP to be valid.
 * @param {number} [options.digits] The length of the OTP.
 * @param {string} [options.algorithm] The algorithm to use.
 * @param {string} [options.charSet] - The character set to use, defaults to the numbers 0-9.
 * @param {number} [options.window] The number of OTPs to check before and after
 * the current OTP. Defaults to 1.
 *
 * @returns {{delta: number}|null} an object with "delta" which is the delta
 * between the current OTP and the OTP that was verified, or null if the OTP is
 * invalid.
 */
export function verifyTOTP({ otp, secret, period, digits, algorithm, charSet, window, }: {
    otp: string;
    secret: string;
    period?: number;
    digits?: number;
    algorithm?: string;
    charSet?: string;
    window?: number;
}): {
    delta: number;
} | null;
