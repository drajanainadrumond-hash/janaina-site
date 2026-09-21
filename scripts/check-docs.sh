#!/usr/bin/env bash
# Guarda da documentação — criado em 10/09/2026, depois de meia sessão perdida por
# trabalhar a partir de um roadmap aposentado.
#
#   npm run check:docs
#
# A regra do projeto: TRÊS lugares e UMA fila.
#   vault   Clientes/Janaina/livro-guia-v4/     a pesquisa atualizada (vivo)
#   livro   livro-guia-v4/GUIA_MESTRE.md        acompanhamento da Dra.
#   fila    janaina-site/doc/ROADMAP-V4.md      o único arquivo com "- [ ]"

set -uo pipefail
BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"   # .../Clientes/Janaina
V="$BASE/livro-guia-v4"; D="$BASE/janaina-site/doc"
falhas=0
erro() { echo "  ❌ $1"; falhas=$((falhas+1)); }
ok()   { echo "  ✅ $1"; }

echo "1) os três lugares existem"
[ -d "$V" ]                && ok "vault: livro-guia-v4/"    || erro "vault não encontrado"
[ -f "$V/GUIA_MESTRE.md" ] && ok "livro: GUIA_MESTRE.md"    || erro "GUIA_MESTRE.md sumiu"
[ -f "$D/ROADMAP-V4.md" ]  && ok "fila:  doc/ROADMAP-V4.md" || erro "ROADMAP-V4.md sumiu"

echo "2) só o roadmap tem caixa de tarefa"
intrusos=$(grep -rl "^[[:space:]]*- \[[ xX]\]" --include="*.md" "$V" "$D" 2>/dev/null \
  | grep -v "_historico/" | grep -v "ROADMAP-V4.md" || true)
if [ -z "$intrusos" ]; then ok "nenhuma fila paralela"
else erro "arquivo com '- [ ]' fora do roadmap:"; echo "$intrusos" | sed 's|^|       |'; fi

echo "3) nada ativo aponta para lugar aposentado"
# Citar em prosa o que virou histórico é legítimo. O que quebra é apontar como CAMINHO DE ARQUIVO,
# porque aí alguém abre e trabalha a partir dele — foi exatamente o que aconteceu em 10/09.
# `03-Pesquisas/` fica de fora com o `_historico/`: são retratos datados, prova do que se
# sabia na data (D53), e citam os arquivos de então de propósito. Linha de TABELA (começa com
# "|") também sai: ali o arquivo aparece como fonte consultada, não como "vá trabalhar aqui" —
# que é o único caso que faz perder uma sessão.
# 20/09: o padrão pegava só "ROADMAP-MASTER.md" e passou 21 wikilinks vivos para o
# "ROADMAP MESTRE (fila única)" (que está em _historico/) em 16 notas do cofre, mais dois
# ponteiros para o RETOMADA.md, que não existe desde a D52 — um deles no TOPO da própria fila.
mortos=$(grep -rn "ROADMAP-MASTER\.md\|Janaina-Cerebro/\|ROADMAP MESTRE\|RETOMADA\.md\|RUMO-AOS-100\|PLANO-TRACKING\|CHECKUP-360" --include="*.md" "$V" "$D" 2>/dev/null \
  | grep -v "_historico/" | grep -v "03-Pesquisas/" | grep -v "git log" \
  | grep -v "MUDOU DE LUGAR" | grep -v "Comece Aqui.md" | grep -v "morava dentro" \
  | grep -v "Aposentados em" | grep -v "check-docs" \
  | grep -vE ":[0-9]+:\|" \
  | grep -viE "aposentad|n[ãa]o existe|foi arquivad|fonte:|superado" || true)
if [ -z "$mortos" ]; then ok "sem ponteiro para o que morreu"
else erro "ponteiro vivo para lugar aposentado:"; echo "$mortos" | head -8 | sed 's|^|       |'; fi

echo "4) o preço é R\$ 500 onde ele é canônico (D41)"
# Prosa que fala do erro ("o valor é R$ 500, não R$ 400") é registro e deve continuar existindo.
# O que não pode é o número errado nas fontes que DECLARAM o preço.
ruim=""
while IFS= read -r f; do
  [ -f "$f" ] || { erro "fonte canônica ausente: $(basename "$f")"; continue; }
  hit=$(grep -niE "(pre[çc]o|valor da consulta|consulta particular)[^|]*R\\\$ *(400|450|398)" "$f" \
        | grep -ivE "ticket|desconto|recebido|nunca foi|caiu|derrubad|não repetir|D41|circulou|dizia" || true)
  [ -n "$hit" ] && ruim="$ruim
  $(basename "$f"): $hit"
done <<EOF
$V/04-Cofre/01-Quem-e-a-Janaina/BLOCO 0 — Fatos Canônicos.md
$V/04-Cofre/01-Quem-e-a-Janaina/Fonte da Verdade — Dados Oficiais.md
$V/GUIA_MESTRE.md
$BASE/janaina-site/src/lib/constants.ts
EOF
if [ -z "$ruim" ]; then ok "R\$ 500 nas 4 fontes canônicas"
else erro "preço errado em fonte canônica:"; echo "$ruim" | sed 's|^|     |'; fi

echo "5) o histórico não parece fila"
h=$(grep -rl "^[[:space:]]*- \[[ xX]\]" --include="*.md" "$V/_historico" 2>/dev/null || true)
if [ -z "$h" ]; then ok "caixas do histórico neutralizadas"
else erro "histórico com caixa viva:"; echo "$h" | sed 's|^|       |'; fi

echo
if [ "$falhas" -eq 0 ]; then echo "✅ documentação íntegra — 3 lugares, 1 fila"; exit 0
else echo "❌ $falhas problema(s). A regra está em livro-guia-v4/00-Mapa/00 - Comece Aqui.md"; exit 1; fi
