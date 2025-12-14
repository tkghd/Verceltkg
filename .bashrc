# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
fi

# User specific environment
if ! [[ "$PATH" =~ "$HOME/.local/bin:$HOME/bin:" ]]
then
    PATH="$HOME/.local/bin:$HOME/bin:$PATH"
fi
export PATH

# Global Bank Aliases
alias gb='curl -s http://localhost:3001/api/health'
alias gb-url='echo "http://$(curl -s ifconfig.me)/global-bank"'
alias gb-logs='pm2 logs global-bank-api --lines 30'
alias gb-restart='pm2 restart global-bank-api'
export OPENAI_API_KEY=xxxx
export REMITTANCE_API_KEY=xxxx
export TREASURY_API_KEY=xxxx
export BASE_PATH=/home/tkg_h30_2018/tk_global_bank/builds/verceltkg-app
export BANK_API_KEY=xxxx
export REMITTANCE_API_KEY=xxxx
export TREASURY_API_KEY=xxxx
