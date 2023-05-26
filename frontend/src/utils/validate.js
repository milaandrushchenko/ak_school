import * as Yup from "yup";

export const validationSchemaShortAnswer = Yup.object({
    question: Yup.string().required('Це поле є обов\'язковим для заповнення!'),
    answers: Yup.array()
        .of(Yup.string().required('Це поле є обов\'язковим для заповнення!'))
        .min(1, 'Необхідно ввести щонайменше одну відповідь'),
});

export const initialValuesShortAnswer = {
    question: '',
    answers: [''],
};


export const validationSchemaSingleChoice = Yup.object({
    question: Yup.string().required('Це поле є обов\'язковим для заповнення!'),
    options: Yup.array()
        .of(
            Yup.object().shape({
                text: Yup.string().required("Це поле є обов\'язковим для заповнення!"),
                isCorrect: Yup.boolean().required("Correct option is required"),
            })
        )
        .min(2, "Потрібно додати щонайменше 2 варіанти!")
        .test('one-correct-option', 'Будь ласка,оберіть один правильний варіант відповіді!', options => {
            return options.filter(option => option.isCorrect).length === 1;
        })
});

export const initialValuesSingleChoice = {
    question: '',
    options: [
        {text: "", isCorrect: false},
        {text: "", isCorrect: false}
    ],
};

export const validationSchemaMatching = Yup.object({
    question: Yup.string().required('Це поле є обов\'язковим для заповнення!'),
    options: Yup.array()
        .of(
            Yup.object().shape({
                text: Yup.string().required("Це поле є обов\'язковим для заповнення!"),
                correctAnswer: Yup.string().required("Це поле є обов\'язковим для заповнення!"),
            })
        )
        .min(2, "Потрібно додати щонайменше 2 відповідності!")
});

export const initialValuesMatching = {
    question: '',
    options: [
        {text: "", correctAnswer: ""},
        {text: "", correctAnswer: ""}
    ],
};

export const validationSchemaMultipleAnswers = Yup.object({
    question: Yup.string().required('Це поле є обов\'язковим для заповнення!'),
    options: Yup.array()
        .of(
            Yup.object().shape({
                text: Yup.string().required("Це поле є обов\'язковим для заповнення!"),
                isCorrect: Yup.boolean().required("Correct option is required"),
            })
        )
        .min(2, "Потрібно додати щонайменше 2 варіанти!")
        .test('one-correct-option', 'Будь ласка,оберіть 2 правильних варіанти відповіді!', options => {
            return options.filter(option => option.isCorrect).length > 1;
        })
});

export const initialValuesMultipleAnswers = {
    question: '',
    options: [
        {text: "", isCorrect: false},
        {text: "", isCorrect: false}
    ],
};