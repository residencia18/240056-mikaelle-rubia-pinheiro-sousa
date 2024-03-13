#include <iostream>

using namespace std;

class Animal {
    private:
        string nome;
        int idade;

    public:
        string getNome(){
            return nome;
        }
        void setNome(string _nome){
            nome = _nome;
        }
        int getIdade(){
            return idade;
        }
        void setIdade(int _idade){
            idade = _idade;
        }

        void fazer_som();
};

class Cachorro: Animal {
    
    public:
    void fazer_som(){
        cout << "au au!!!" << endl;
    }
};

int main()
{
    Cachorro c;
    c.fazer_som();

    // Animal a;
    // a.fazer_som();

    return 0;
}
