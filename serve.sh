#!/bin/bash

# Always serve this project, even when the script is started from another directory.
PROJECT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRIVACY_POLICY_URL="http://localhost:8000/privacy-policy.html"

cd "$PROJECT_DIRECTORY" || exit 1

echo
echo "============================================================"
echo " TimePro — Política de Privacidade"
echo "============================================================"
echo
echo "Servidor local iniciado. Para visualizar a página atualizada:"
echo
echo "1. Mantenha esta janela do Terminal aberta."
echo "2. Abra este endereço no navegador:"
echo
echo "   $PRIVACY_POLICY_URL"
echo
echo "3. Não abra index.html ou privacy-policy.html com duplo clique."
echo "   O endereço file:// bloqueia o carregamento das traduções e"
echo "   faz a página exibir 'Error loading content'."
echo
echo "4. Para encerrar o servidor, volte ao Terminal e pressione Ctrl+C."
echo
echo "Se uma alteração não aparecer, atualize com Cmd+Shift+R."
echo "============================================================"
echo

python3 -m http.server 8000
