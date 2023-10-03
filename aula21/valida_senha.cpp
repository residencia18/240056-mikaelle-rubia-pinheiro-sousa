#include <iostream>
#include <string>
#include <regex>

using namespace std;


class Senha{
    public:
    static bool valida_senha(string senha);

};

bool Senha::valida_senha(string senha){
    bool numero = false, maius = false, minus = false;
    if(senha.length() < 8){
        return false;
    }
    for(auto ch: senha){
        if(isupper(ch) ){
          maius = true;
        }
    }
    if(!maius){
        return false;
    }

    for(auto ch: senha){
        if(islower(ch)){
          minus = true;
        }
    }
    for(auto ch: senha){
        if(isdigit(ch)){
          numero = true;
        }
    }

    if(minus && numero){
        return true;
    }
    return false;  
};
int main(){

    string senha;

    cout << "Digite sua senha" << endl;
    cin >> senha; 

    if(Senha::valida_senha(senha)){
        cout << "valida" << endl;
    }else{
        cout << "invalida" << endl;

    }    

    return 0;
}