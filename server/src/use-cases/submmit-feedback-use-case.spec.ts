import { SubmitFeedbackUseCase } from "./submmit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy }
)

describe('Submmit feedback', () => {
    it('should be able to submmit a feedback', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,asudhgasydgas'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

    });

    it('should not be able to submmit a feedback without a type', async () => {


        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,asudhgasydgas'
        })).rejects.toThrow();

    });


    it('should not be able to submmit a feedback without a comment', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,asudhgasydgas'
        })).rejects.toThrow();

    })

    it('should not be able to submmit a feedback with diferent type of image', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'teste.png'
        })).rejects.toThrow();

    })


})