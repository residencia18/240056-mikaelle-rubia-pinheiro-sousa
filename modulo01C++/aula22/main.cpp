#include <iostream>
#include <string>
#include <vector>
#include <fstream>

using namespace std;


class BancoDados{
    public:
        static bool salvarDados(vector <string> dados);
        static vector <string> recuperarDados();

};
bool BancoDados::salvarDados(vector <string> dados){
    ofstream arquivo_saida;

    arquivo_saida.open("teste.txt", ios_base::out);
    if(arquivo_saida.is_open()){
        arquivo_saida << "Escrevendo no arquivo" << endl;

        for(auto dado : dados){
            arquivo_saida << dado <<endl;
        }
        arquivo_saida.close();

    }else{
        return false;
    }
}

vector <string> recuperarDados(){
    ifstream arquivo_entrada;
    arquivo_entrada.open("teste.txt", ios_base::in);

    if(arquivo_entrada.is_open()){
        string linha;
        while(arquivo_entrada.eof() == false){
            getline(arquivo_entrada, linha);
            cout<< linha << endl;
        }
        arquivo_entrada.close();
    }else{
        cout << "Erro ao abrir arquivo!" << endl;
    }

}

int main(){
    vector <string> dados;
    if(BancoDados::salvarDados(dados)){
        BancoDados::recuperarDados();
    
    }else{
        cout << "Erro ao abrir arquivo!" << endl;
    }
    return 0;
}