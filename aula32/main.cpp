#include <iostream>
#include <vector>

using namespace std;

class Transacao {
    private:
        string data:
        double valor_transacao;
        string descricao;

    public:
        Transacao(string data, double valor_transacao, string descricao){
            this->data = data;
            this->valor_transacao = valor_transacao;
            this->descricao = descricao;
        }
        Transacao();

        string getData(){
            return data;
        }
        void setData(string data){
            this->data = data;
        }

        double getValor_transacao(){
            return valor_transacao;
        }
        void setValor_transacao(double valor_transacao){
            this->valor_transacao = valor_transacao;
        }

        string getDescricao(){
            return descricao;
        }
        void setDescricao(string descricao){
            this->descricao = descricao;
        }
};


class Conta {
    private: 
        string name;
        string numero_conta;
        double saldo;
        vector<Transacao*> transacoes;

    public:
        virtual ~Conta(string name, string numero_conta, double saldo) {
            this->name = name;
            this->numero_conta = numero_conta;
            this->saldo = saldo;
        };

        virtual void impressao_extrato() const {
            cout << " Extrato genérico" << endl;
        }

        string getName(){
            return name;
        }

        void setName(string name){
            this->name = name;
        }

        string getNumero_conta(){
            return numero_conta;
        }
        void setNumero_conta(string numero_conta){
            this->numero_conta = numero_conta;
        }

        double getSaldo(){
            return saldo;
        }
        void setSaldo(double saldo){
            this->saldo = saldo;
        }
    

};

class CorrentePoupanca: Conta{
    private: 
        string data_nascimento;

    public:
        CorrentePoupanca(string name, string numero_conta, double saldo, string data_nascimento): Conta(name, numero_conta, saldo){
            this->data_nascimento = data_nascimento;
        }
        string getData_nascimento(){
            return data_nascimento;
        }

        void setData_nascimento(string data_nascimento){
            this->data_nascimento = data_nascimento;
        }

        void impressao_extrato() const {
            cout << " Extrato Corrente" << endl;
            cout << getSaldo()<< endl;
        }
};