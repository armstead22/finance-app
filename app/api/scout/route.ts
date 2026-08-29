import { generateText } from 'ai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const question = typeof body.question === 'string' ? body.question.trim().slice(0, 1200) : ''
    if (!question) return Response.json({ error: 'Ask Scout a question first.' }, { status: 400 })

    const result = await generateText({
      model: 'openai/gpt-5.4-mini',
      system: 'You are Scout, the friendly educational coach inside Signal. Explain stocks, calls, puts, crypto, paper trading, options Greeks, and risk in plain language. Never give personalized financial advice, price predictions, trade instructions, or guarantees. Encourage paper trading and mention that real investing carries risk. Keep answers concise and practical. If asked to execute a trade, say you can only explain the concept; Signal paper trades require explicit user action.',
      prompt: question,
      maxOutputTokens: 450,
    })
    return Response.json({ answer: result.text })
  } catch {
    return Response.json({ answer: 'Delta is an estimate of how much an option may move when the underlying asset moves by $1. It can help explain sensitivity, but it is not a prediction or guarantee. Scout’s live AI is temporarily unavailable, so please use the learning cards for more guidance.' })
  }
}
