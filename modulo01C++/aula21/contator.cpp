#include <iostream>
#include <string>


using namespace std;


class Contador{
    private:
        static int contador;

    public:
        Contador(){
            contador++;
        };

        static int getContador();

};

int Contador::contador =0;

int Contador::getContador(){
    return contador;
}

int main(){

    Contador cont1;
    Contador cont2;
    Contador cont3;
    cout << "total de instancias: "<< Contador::getContador() << endl;

    return 0;
}