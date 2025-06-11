const axios = require('axios');

async function gerarResposta(mensagemUsuario) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: mensagemUsuario }],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erro ao gerar resposta da OpenAI:', error.response?.data || error.message);
    return 'Desculpe, ocorreu um erro ao tentar responder sua mensagem.';
  }
}

module.exports = { gerarResposta };