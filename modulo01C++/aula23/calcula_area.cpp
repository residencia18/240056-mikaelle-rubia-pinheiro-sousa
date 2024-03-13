#include <iostream>

using namespace std;

class Forma{

    public:
    float calcula_area();

};

class Retangulo: Forma{
    public:
    float calcula_area(float x, float y){
        return x * y;
    }
};

class Circulo: Forma{
    public:

    float r;
    float calcula_area(float r){
        return 3.14 * (r * r);
    }
};
int main()
{

    Retangulo retangulo;
    cout << "Area de um retangulo:"<< retangulo.calcula_area(10, 20)<< endl;
   

    Circulo circulo;
    cout << "Area de um circulo:"<< circulo.calcula_area(10) << endl;
    return 0;
}
