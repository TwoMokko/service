import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Политика',
    description: 'Дескрипшн политики',
}

export default function Policy() {
    return (
        <div className="other-page">
            <div className="container">
                <h1>Политика</h1>
                <p>Текст политики</p>
            </div>
        </div>
    )
}