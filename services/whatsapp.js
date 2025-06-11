const axios = require('axios');
const { gerarResposta } = require('./openai');

async function handleIncomingMessage(body) {
  const entry = body.entry?.[0];
  const changes = entry?.changes?.[0];
  const message = changes?.value?.messages?.[0];

  if (!message || !message.text || !message.from) return;

  const de = message.from;
  const textoRecebido = message.text.body;

  console.log(`Mensagem recebida de ${de}: ${textoRecebido}`);

  const resposta = await gerarResposta(textoRecebido);
  await enviarMensagem(de, resposta);
}

async function enviarMensagem(telefoneDestino, mensagem) {
  try {
    const url = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        to: telefoneDestino,
        text: { body: mensagem }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`
        }
      }
    );

    console.log('Mensagem enviada:', response.data);
  } catch (error) {
    console.error('Erro ao enviar mensagem via WhatsApp:', error.response?.data || error.message);
  }
}

module.exports = { handleIncomingMessage };