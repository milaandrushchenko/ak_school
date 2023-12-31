import * as Yup from "yup";
import {QUESTION} from "./constans.js";
import {v4 as uuidv4} from "uuid";

export const validationSchemaShortAnswer = Yup.object({
    question: Yup.string().required('Це поле є обов\'язковим для заповнення!'),
    answers: Yup.array()
        .of(Yup.string().required('Це поле є обов\'язковим для заповнення!'))
        .min(1, 'Необхідно ввести щонайменше одну відповідь'),
    score: Yup.number().required("Це поле є обов'язковим для заповнення!").min(0, 'Значення не може бути меньше 0.'),
});

export const initialValuesShortAnswer = {
    question: '',
    options: [''],
    score: 1,
    type: QUESTION.SHORT_ANSWER,
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
        .test('unique-option-text', 'Текст варіантів повинен бути унікальним!!', options => {
            let uniqueValues = new Set();
            let hasDuplicates = false;

            for (let i = 0; i < options.length; i++) {
                let value = options[i].text;

                if (uniqueValues.has(value)) {
                    hasDuplicates = true;
                    break;
                }

                uniqueValues.add(value);
            }
            return !hasDuplicates;
        }),
    score: Yup.number().required("Це поле є обов'язковим для заповнення!").min(0, 'Значення не може бути меньше 0.'),
});

export const initialValuesSingleChoice = {
    question: '',
    options: [
        {text: "", isCorrect: false},
        {text: "", isCorrect: false}
    ],
    score: 1,
    type: QUESTION.SINGLE_CHOICE,
};


// export const initialValuesMatching = {
//     question: '',
//     options: [
//         {text: "", correctAnswer: ""},
//         {text: "", correctAnswer: ""}
//     ],
//     score: 1,
//     type: QUESTION.MATCHING,
// };
//
// export const validationSchemaMultipleAnswers = Yup.object({
//     question: Yup.string().required('Це поле є обов\'язковим для заповнення!'),
//     options: Yup.array()
//         .of(
//             Yup.object().shape({
//                 text: Yup.string().required("Це поле є обов\'язковим для заповнення!"),
//                 isCorrect: Yup.boolean().required("Correct option is required"),
//             })
//         )
//         .min(2, "Потрібно додати щонайменше 2 варіанти!")
//         .test('one-correct-option', 'Будь ласка,оберіть 2 правильних варіанти відповіді!', options => {
//             return options.filter(option => option.isCorrect).length > 1;
//         })
//         .test('unique-option-text', 'Текст варіантів повинен бути унікальним!!', options => {
//             let uniqueValues = new Set();
//             let hasDuplicates = false;
//
//             for (let i = 0; i < options.length; i++) {
//                 let value = options[i].text;
//
//                 if (uniqueValues.has(value)) {
//                     hasDuplicates = true;
//                     break;
//                 }
//
//                 uniqueValues.add(value);
//             }
//             return !hasDuplicates;
//         }),
//     score: Yup.number().required("Це поле є обов'язковим для заповнення!").min(0, 'Значення не може бути меньше 0.'),
// });

export const initialValuesMatching = {
    question: '',
    options: {
        leftColumn: [
            {uuid: uuidv4(), text: ''},
            {uuid: uuidv4(), text: ''},
        ],
        rightColumn: [
            {uuid: uuidv4(), text: ''},
            {uuid: uuidv4(), text: ''},
        ],
        correctAnswers: []
    },
    score: 1,
    type: QUESTION.MATCHING,
};

export const validationSchemaMatching = Yup.object({
    question: Yup.string().required("Це поле є обов'язковим для заповнення!"),
    score: Yup.number()
        .required("Це поле є обов'язковим для заповнення!")
        .min(0, 'Значення не може бути менше 0.'),
    options: Yup.object().shape({
        leftColumn: Yup.array().of(
            Yup.object().shape({
                uuid: Yup.string(),
                text: Yup.string().required("Це поле є обов'язковим для заповнення!"),
            })
        ),
        rightColumn: Yup.array().of(
            Yup.object().shape({
                uuid: Yup.string(),
                text: Yup.string().required("Це поле є обов'язковим для заповнення!"),
            })
        ),
        correctAnswers: Yup.array().test('correct-answers', 'Кількість правильних відповідей не співпадає з кількістю варіантів', function (value) {
            const leftColumn = this.parent.leftColumn || [];
            console.log(leftColumn);
            return value.length === leftColumn.length;
        }),
    }),
});

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
        .test('unique-option-text', 'Текст варіантів повинен бути унікальним!!', options => {
            let uniqueValues = new Set();
            let hasDuplicates = false;

            for (let i = 0; i < options.length; i++) {
                let value = options[i].text;

                if (uniqueValues.has(value)) {
                    hasDuplicates = true;
                    break;
                }

                uniqueValues.add(value);
            }
            return !hasDuplicates;
        }),
    score: Yup.number().required("Це поле є обов'язковим для заповнення!").min(0, 'Значення не може бути меньше 0.'),
});

export const initialValuesMultipleAnswers = {
    question: '',
    options: [
        {text: "", isCorrect: false},
        {text: "", isCorrect: false}
    ],
    score: 1,
    type: QUESTION.MULTIPLE_CHOICE,
};