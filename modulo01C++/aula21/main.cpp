#include <iostream>
#include <string>


using namespace std;


class Calculadora{
    public:
        static float Adicao(float valor1, float valor2);

        static float Subtracao(float valor1, float valor2);

        static float multi(float valor1, float valor2);

        static float divisao(float valor1, float valor2);

};

float Calculadora::Adicao(float valor1, float valor2){
        return (valor1 + valor2);
};

float Calculadora::Subtracao(float valor1, float valor2){
                return (valor1 - valor2);
        };
float Calculadora::multi(float valor1, float valor2){
                return (valor1 * valor2);
        };
float Calculadora::divisao(float valor1, float valor2){
                return (valor1 / valor2);
};
int main(){
    float valor1, valor2;
    char operador;

// valores para teste
//     valor1 = 20.0;
//     valor2 = 5.0;
//     operador = '*';

    cout << "digite o valor1" << endl;
    cin >> valor1;

    cout << "digite o valor2" << endl;
    cin >> valor2;

    cout << "digite o operador('+', '-', '*', '/')" << endl;
    cin>> operador;


    if(valor2 == 0.0){
        cout<< "valor invalido";
        
    }    
    else if(operador == '+'){
        cout << "Resultado " << Calculadora::Adicao(valor1, valor2)<< endl;
    }
    else if(operador == '-'){
        cout << "Resultado " << Calculadora::Subtracao(valor1, valor2)<< endl;
        
    }
    else if(operador == '*'){
       cout << "Resultado " <<  Calculadora::multi(valor1, valor2)<< endl;
        
    }
    else if(operador == '/'){
        cout << "Resultado " << Calculadora::divisao(valor1, valor2) << endl;

        
    }


    return 0;
}