import { request } from "http"
import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string,
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request


        if (!type) {
            throw new Error('Type is requested')
        }


        if (!comment) {
            throw new Error('comment is requested')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid Screenshot format.')
        }


        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })


        await this.mailAdapter.sendMail({
            subject: 'Novo FeedBack',
            body: [
                `<div style = "font-family: sans-serif; font-size:16px; color: #111;">`,
                `<p>Tipo de Feeback ${type}</p>`,
                `<p>Comentário ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}