#include <iostream>

using namespace std;

class Desenhavel{
    public:
    virtual void desenhar() = 0;

};

class Retangulo: public Desenhavel{
    public:
        void desenhar() override{
            cout << "Desenhando um retangulo" << endl;
            
        }
};

class Circulo: public Desenhavel{
    public:
        void desenhar() override{
            cout << "Desenhando um circulo" << endl;
            
        }

};

class Triangulo: public Desenhavel{
    public:
        void desenhar() override{
            cout << "Desenhando um triangulo" << endl;
            
        }

};
int main()
{
    Retangulo retangulo;
    Circulo circulo;
    Triangulo triangulo;
    Desenhavel* desenhar1 = &retangulo; //
    Desenhavel* desenhar2 = &circulo; //
    Desenhavel* desenhar3 = &triangulo; //

    desenhar1->desenhar();
    desenhar2->desenhar();
    desenhar3->desenhar();
    
    return 0;
}
