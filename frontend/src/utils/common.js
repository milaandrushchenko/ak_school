import dayjs from 'dayjs';

export const generatePassword = (length) => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

    let validChars = '';
    let password = '';

    validChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

    // Generate password
    for (let i = 0; i < length; i++) {
        password += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }

    return password;

}


export const formattedDate = (dateTime) => {
    if (dateTime) {
        return dayjs(dateTime).locale('uk').format('DD MMMM YYYY року , HH:mm');
    }
    return '';
}