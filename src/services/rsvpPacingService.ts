export type RsvpPacingMode = 'adaptive' | 'fixed';

/**
 * Calcula o peso ponderado de uma palavra baseado no seu tamanho e pontuação.
 * Em média, palavras em português têm ~5 a 6 caracteres (peso 1.0).
 * Palavras curtas exigem menos tempo de fixação foveal, enquanto palavras longas
 * e pausas sintáticas (pontuação) exigem maior retenção cognitiva.
 */
export function calculateWordWeight(word: string): number {
  if (!word || word.trim().length === 0) return 1.0;

  const raw = word.trim();
  // Remove pontuação das bordas para calcular o tamanho efetivo de letras da palavra
  const clean = raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
  const len = clean.length || raw.length;

  let weight = 1.0;

  // Escala adaptativa calibrada para leitura dinâmica em PT-BR
  if (len <= 2) {
    weight = 0.72; // ex: "o", "a", "em", "de", "e", "um"
  } else if (len <= 4) {
    weight = 0.86; // ex: "para", "com", "este", "mais"
  } else if (len <= 6) {
    weight = 1.00; // ex: "tempo", "ritmo", "livro", "treino"
  } else if (len <= 8) {
    weight = 1.18; // ex: "leitura", "cérebro", "atenção"
  } else if (len <= 10) {
    weight = 1.35; // ex: "velocidade", "capacidade", "exercício"
  } else if (len <= 13) {
    weight = 1.52; // ex: "compreensão", "produtividade"
  } else {
    // Palavras polissílabas muito longas (14+ caracteres)
    weight = 1.70; // ex: "desenvolvimento", "extraordinariamente", "responsabilidade"
  }

  // Pausa natural reflexiva para pontuação de término de sentença (. ! ? ...)
  if (/[.!?]$/.test(raw) || raw.endsWith('...')) {
    weight += 0.45;
  }
  // Pausa suave para pontuação intermediária (, ; : — -)
  else if (/[,;:\-—–]$/.test(raw)) {
    weight += 0.22;
  }

  // Números e valores exigem ligeiramente mais tempo de decodificação analítica
  if (/\d/.test(raw)) {
    weight += 0.20;
  }

  return weight;
}

/**
 * Calcula a duração em milissegundos de cada palavra de uma lista.
 * 
 * - No modo 'fixed': cada palavra recebe exatamente (60 / wpm) * 1000 ms.
 * - No modo 'adaptive': cada palavra recebe um tempo proporcional ao seu peso
 *   (comprimento + pontuação), normalizado pela média dos pesos do texto.
 *   Dessa forma, o tempo total do texto permanece idêntico à velocidade WPM alvo,
 *   porém com ritmo natural e humanizado (estilo ReadMaxx).
 */
export function calculateWordDurations(
  words: string[],
  wpm: number,
  mode: RsvpPacingMode = 'adaptive'
): number[] {
  if (!words || words.length === 0) return [];

  const safeWpm = Math.max(50, Math.min(1500, wpm || 300));
  const baseDuration = (60 / safeWpm) * 1000;

  if (mode === 'fixed') {
    const fixedMs = Math.round(baseDuration);
    return words.map(() => fixedMs);
  }

  // 1. Coleta os pesos brutos de cada palavra
  const weights = words.map(word => calculateWordWeight(word));
  const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
  const avgWeight = totalWeight > 0 ? totalWeight / weights.length : 1.0;

  // 2. Piso de segurança para legibilidade foveal em WPMs muito elevados
  const minFloorMs = Math.max(45, Math.round(baseDuration * 0.4));

  // 3. Distribuição normalizada dos tempos
  return weights.map(w => {
    const duration = Math.round(baseDuration * (w / avgWeight));
    return Math.max(minFloorMs, duration);
  });
}
