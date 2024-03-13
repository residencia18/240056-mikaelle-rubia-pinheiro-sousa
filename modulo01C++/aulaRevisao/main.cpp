#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Ponto {
private:
    float x, y;

public:
    Ponto(float _y, float _x);
    Ponto();
    float getX();
    void setX(float _x);
    float getY();
    void setY(float _y);
};

Ponto::Ponto() {
    y = 0.0;
    x = 0.0;
}

Ponto::Ponto(float _y, float _x) {
    y = _y;
    x = _x;
}

float Ponto::getX() {
    return x;
}

void Ponto::setX(float _x) {
    x = _x;
}

float Ponto::getY() {
    return y;
}

void Ponto::setY(float _y) {
    y = _y;
}

class Poligono {
public:
    vector<Ponto> pontos;

public:
    void add();
    void lista(vector<Ponto> pontos);

    
};

void Poligono::add() {
    float x, y;

    cout << "Digite o valor de X e Y: " << endl;
    cin >> x >> y;
    Ponto ponto(y, x);
    pontos.push_back(ponto); // Adicione o ponto ao vetor da classe
}

void lista(vector<Ponto> pontos){
    for (Ponto ponto : pontos) {
        cout << "Ponto - X: " << ponto.getX() << ", Y: " << ponto.getY() << endl;
        
    }
}


int main() {
    Poligono poligono;

    poligono.add();
    poligono.add();

    lista(poligono.pontos);

    return 0;
}
