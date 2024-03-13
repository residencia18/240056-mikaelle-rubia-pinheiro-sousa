#include <iostream>
#include <string>


using namespace std;

class MeuInt{

    private:
        int numero;

    public:
        MeuInt(){
            numero = 0;
        }

        MeuInt(int _numero){
            numero = _numero;
        }
        int getNumero(){
            return numero;
        }

        void setNumero(int _numero){
            numero = _numero;
        }

        int operator+(MeuInt n){
            return (numero + n.numero)+1;
        }

        int operator=(int n){
            numero = n;
            return numero;
        }
        int operator=(MeuInt n){
            return n.numero;
        }
};


int main(){
    MeuInt n, y;

    n = 5;
    y =2;

    n = n + y;
    cout << n.getNumero() << endl;

    n = y + 10;
    cout << n.getNumero() << endl;
    return 0;
}


