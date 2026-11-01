# Leitox | Aplicativo de Leitura Dinâmica Turbo (+50%)

> Aplicativo Web Mobile-First projetado para aumentar a velocidade de leitura do usuário em até **50%** em semanas através de protocolos neurocientíficos diários de 15 a 20 minutos, supressão da subvocalização, expansão do campo parafoveal e testes com aferição de retenção.

---

## 🎯 Principais Objetivos e Fundamentos

1. **Eliminar o Vício de Subvocalização:**
   - A voz mental articula no máximo entre 150 e 220 Palavras Por Minuto (PPM), limitando artificialmente a velocidade do pensamento.
   - O Leitox utiliza **Metrônomo Sonoro/Visual (Web Audio API)** em cadências aceleradas (&gt;250 BPM) combinadas com técnicas de relaxamento fonatório e contagem concorrente para forçar a decodificação visual direta.

2. **Acelerar a Captação Visual das Palavras:**
   - **Tabelas de Schulte (3x3 a 5x5):** Desenvolvem a visão periférica mantendo o olhar ancorado no centro foveal.
   - **Leitor RSVP com Ponto Ótimo de Reconhecimento (ORP):** Alinha a letra focal de cada palavra no centro óptico com marcação em âmbar, eliminando movimentos sacádicos e regressões involuntárias.
   - **Leitura em Blocos (Chunking):** Treina o cérebro para agrupar sintagmas de 2 a 4 palavras por fixação em colunas estreitas.
   - **Saltos Sacádicos Bilaterais:** Exercícios para alongar e fortalecer a musculatura ocular motora.

3. **Garantir a Compreensão e Retenção:**
   - Velocidade sem retenção é inútil. Todos os testes contam com cronômetro de precisão e questionários de múltipla escolha para calcular o **PPM Eficaz (E-WPM = PPM × % Compreensão)**.

---

## 📅 A Jornada Diária de 15 a 20 Minutos

O usuário acessa o aplicativo diariamente e cumpre 5 passos progressivos:

| Etapa | Exercício | Duração | Objetivo Científico |
|---|---|---|---|
| **Passo 1** | Tabela de Schulte 5x5 | 3 min | Aquecimento do campo visual periférico e atenção focal |
| **Passo 2** | Metrônomo Anti-Subvocalização | 5 min | Inibição do aparelho fonatório com cadência ritmada |
| **Passo 3** | Leitor RSVP com Ponto Focal (ORP) | 5 min | Eliminação de movimentos sacádicos a 350-600+ PPM |
| **Passo 4** | Leitura em Blocos (Chunking) | 4 min | Fixação ampla de 3 a 4 palavras por sintagma |
| **Passo 5** | Teste de Aferição & Retenção | 3 min | Medição da velocidade e validação da compreensão (+50%) |

---

## 📚 Biblioteca em Domínio Público (100% PT-BR)

- **Machado de Assis:** *A Cartomante*, *Missa do Galo*
- **Rui Barbosa:** *Oração aos Moços* (discurso histórico clássico)
- **José de Alencar:** *Cinco Minutos*
- **Jornalismo Científico / Domínio Público:** *Avanços da Ciência Espacial e Observação Terrestre no Brasil* (Agência Brasil)
- **Artigo Neurocientífico:** *A Neurobiologia da Leitura e os Movimentos Sacádicos*
- **Testes Diagnósticos Padronizados:** Com questionários de validação de retenção.
- **Leitor de Texto Próprio:** Permite ao usuário colar qualquer documento, notícia ou artigo pessoal para treino dinâmico.

---

## 🛠️ Tecnologias e Arquitetura

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite 6, Lucide Icons, Canvas Confetti.
- **Áudio Nativo:** Sintetizador Web Audio API puro (sem arquivos MP3 externos, sem latência de rede, funciona 100% offline).
- **Persistência Híbrida Resiliente:**
  - **Offline-First via LocalStorage:** O aplicativo funciona de imediato sem exigir conexão prévia ou credenciais.
  - **Supabase Cloud Sync (Opcional):** Sincronização em tempo real das tabelas `profiles` e `exercise_results` se as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` forem fornecidas.
- **Deploy:** Otimizado para **Vercel** com `vercel.json` e suporte a PWA mobile.

---

## 🚀 Como Executar Localmente e Testar

```bash
# 1. Instalar as dependências
npm install

# 2. Executar testes automatizados (10 testes cobrindo ORP, WPM, Quizzes e Streak)
npm test

# 3. Iniciar o servidor de desenvolvimento
npm run dev

# 4. Compilar para produção
npm run build

# 5. Visualizar o bundle de produção localmente
npm run preview
```

---

## 🌐 Deploy na Vercel

O aplicativo possui build validado e deploy executado na Vercel:
- **Deploy Ativo:** [https://flying-eclipse-ryaf1c5.tmp.now](https://flying-eclipse-ryaf1c5.tmp.now)
- **Claim URL:** [https://vercel.com/claim-deployment?code=2b406db5-d746-4232-9558-458fbf3ef46d](https://vercel.com/claim-deployment?code=2b406db5-d746-4232-9558-458fbf3ef46d)

### Integração Contínua com GitHub + Vercel
1. O repositório está sincronizado em [https://github.com/evertoncbx/fastRead](https://github.com/evertoncbx/fastRead).
2. Na Vercel, conecte sua conta do GitHub e importe o repositório `fastRead`.
3. Defina as seguintes variáveis de ambiente (se desejar sincronizar com o Supabase além do armazenamento local):
   - `VITE_SUPABASE_URL`: URL do seu projeto Supabase
   - `VITE_SUPABASE_ANON_KEY`: Anon Public Key do Supabase
4. O deploy de produção será atualizado automaticamente a cada commit na branch `main`.
