---
name: fastread-guidelines
description: Diretrizes de UX minimalista, ergonomia tipográfica e higiene de armazenamento e Supabase.
always_on: true
---

# DIRETRIZES DE UX, TIPOGRAFIA E ARQUITETURA DE ARMAZENAMENTO

Ao desenvolver, revisar ou refatorar funcionalidades nesta aplicação, siga rigorosamente os princípios abaixo:

## 1. UX Minimalista e Redução Drástica de Ruído Visual
- **Zero Textos Desnecessários**: Elimine microtutoriais, parágrafos explicativos prolixos, justificativas teóricas, disclaimers ou jargões conceituais nas telas de uso diário. O usuário prioriza a execução imediata e jornadas de baixo atrito.
- **Ação Direta em 1 Toque**: A tela principal deve sempre priorizar a ação chave mais imediata com clareza visual e ergonomia, sem exigir navegação por múltiplas abas intermediárias.

## 2. Ergonomia e Escala Tipográfica
- **Legibilidade para Leitura Ativa**: Todo conteúdo de leitura contínua ou exercício focado deve ter escala tipográfica ampla e confortável (evitar classes excessivamente reduzidas como `text-xs` ou `text-[10px]`).
- **Entrelinha Confortável**: Mantenha entrelinha relaxada (`line-height: 2.0` ou superior) e bom contraste para evitar fadiga ocular.

## 3. Higiene de Armazenamento Local e Supabase
- **Proteção do LocalStorage**: Nunca salve massas pesadas de dados (textos completos, catálogos extensos ou arquivos) diretamente no `localStorage`, evitando esgotamento da cota de 5 MB e degradação de performance.
- **Persistência Remota com Cache Volátil**: Dados volumosos devem ser carregados do banco de dados remoto (Supabase) e mantidos no cliente em memória volátil de execução (`in-memory cache`), com fallback embutido resiliente para operação offline.
- **Isolamento de Schemas/Tabelas**: Em bancos compartilhados entre múltiplos sistemas (como o projeto *projeta*), utilize schemas dedicados (ex: `appfr`) ou prefixos de tabelas específicos para garantir governança limpa de dados e isolamento das políticas de segurança (RLS).
