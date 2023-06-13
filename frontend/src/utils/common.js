import dayjs from 'dayjs';

export const ukrainianLetters = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ю', 'Я'];


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
export const compareDate = (data1, data2) => {
    if (!data1 || data1 > data2) {
        return data2;
    }
    return data1;

}

export const timeConverter = time => {
    return `0${time}`.slice(-2);
};


export const time_converter = milliseconds => {
    if (milliseconds === null || milliseconds === undefined || typeof milliseconds !== 'number') {
        return null;
    }
    const hours = `0${Math.floor(milliseconds / 3600000)}`.slice(-2);
    const minutes = `0${Math.floor((milliseconds / 60000) % 60)}`.slice(-2);
    const seconds = `0${Math.floor((milliseconds / 1000) % 60) % 60}`.slice(-2);

    return `${hours} год ${minutes} хв ${seconds} сек`
};

