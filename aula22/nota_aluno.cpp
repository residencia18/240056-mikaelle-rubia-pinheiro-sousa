#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>

using namespace std;

class Aluno{
    private:
        string nome;
        string email;
        float nota1;
        float nota2;

    public:
        Aluno(){

        }

        Aluno(string _nome, string _email, double _nota1, double _nota2){
            nome = _nome;
            email = _email;
            nota1 = _nota1;
            nota2 = _nota2;

        }

        string getNome(){
            return nome;
        }   

        void setNome(string _nome){
            nome = _nome;
        }

        string getEmail(){
            return email;
        } 

        void setEmail(string _email){
            email = _email;
        }

        double getNota1(){
            return nota1;
        }

        void setNota1(double _nota1){
            nota1 = _nota1;
        }


        double getNota2(){
            return nota2;
        }

        void setNota2(double _nota2){
            nota2 = _nota2;
        }

        static void add_alunos(vector<Aluno> &alunos);
        static void altera_aluno(vector<Aluno> &alunos);
        static bool remover_aluno(vector<Aluno> &aluno);
};

void Aluno::add_alunos(vector<Aluno> &alunos){
    Aluno novo_aluno;
    string add_nome, add_email;
    double add_nota1, add_nota2;

    cout << "digite o nome" << endl;
    cin >> add_nome;

    cout << "digite o email" << endl;
    cin >> add_email;

    cout << "digite o nota1" << endl;
    cin >> add_nota1;

    cout << "digite o nota2" << endl;
    cin >> add_nota2;

    novo_aluno.setNome(add_nome);
    novo_aluno.setEmail(add_email);
    novo_aluno.setNota1(add_nota1);
    novo_aluno.setNota2(add_nota2);

    alunos.push_back(novo_aluno);
};

void Aluno::altera_aluno(vector<Aluno> &aluno){
    string nome;

    cout << "Digite o nome do aluno que deseja atualizar os dados" << endl;
    cin >> nome;

    for(int i = 0; i < aluno.size(); i++){
        if(aluno[i].nome == nome){
        cout << "digite o nome atualizado " << endl;
        cin >> aluno[i].nome;

        cout << "digite o email atualizado" << endl;
        cin >> aluno[i].email;

        cout << "digite o nota1" << endl;
        cin >> aluno[i].nota1;

        cout << "digite o nota2" << endl;
        cin >> aluno[i].nota2;
        }
    }
};

bool Aluno::remover_aluno(vector<Aluno> &aluno)
{
    string nome_;
    int opcao;

    cout << "Digite o nome do aluno que deseja remover" << endl;
    cin >> nome_;

    for (int i = 0; i < aluno.size(); i++){
        if (aluno[i].nome == nome_){
            cout << "======================================\n\n";
            cout << "Deseja realmente remover o roteiro?\n";
            cout << "1 - Sim\n";
            cout << "2 - Nao\n";
            cout << "OBS: Digite 1 ou 2, caso contrario sera considerado como Nao!\n";
            cin >> opcao;

            if (opcao == 1)
            {
                aluno.erase(aluno.begin() + i);
                return true;
            }
        }
    }
    return false;
}
class BancoDeDados{
    public:
        static bool saveDados(vector <Aluno> alunos);
        static vector<Aluno> recuperarDados();
};

bool BancoDeDados::saveDados(vector <Aluno> alunos){
    ofstream arquivo("dados.txt"); 
    if(arquivo.is_open()){
        for(int i = 0; i < alunos.size(); i++){
            arquivo << alunos[i].getNome() << ", " << alunos[i].getEmail() << ", " 
            << alunos[i].getNota1() << ", " << alunos[i].getNota2() << endl;
        }
    }
    arquivo.close();
    return true;
}

vector<Aluno> BancoDeDados::recuperarDados(){
    vector <Aluno> alunos;
    ifstream arquivo("dados.txt");
    if(arquivo.is_open()){
        string linha;
        while(getline(arquivo, linha)){

            istringstream ss(linha);
            string nome, email;
            double nota1, nota2;
            getline(ss, nome, ',');
            getline(ss, email, ',');
            ss >> nota1;
            ss.ignore();   // Ignora a vírgula
            ss >> nota2;

            alunos.push_back(Aluno(nome, email, nota1, nota2));
        }
     arquivo.close();
    }
    
    return alunos;
}



int main() {
    vector <Aluno> alunos;

    char resposta;

    // Aluno novo_aluno("Joao", "joao@email", 10, 10);
    // Aluno novo_aluno1("teste", "teste@email", 9, 7);
    // Aluno novo_aluno2("test1", "teste@email", 4.0, 7.6);
    // Aluno novo_aluno3("test2", "teste@email", 2.9, 9);

    // alunos.push_back(novo_aluno);
    // alunos.push_back(novo_aluno1);
    // alunos.push_back(novo_aluno2);
    // alunos.push_back(novo_aluno3);


    do{
        Aluno::add_alunos(alunos);

        cout << "deseja adicionar outro aluno?" << endl;
        cin >> resposta;

    }while(resposta == 's');
    

    BancoDeDados::saveDados(alunos);

    alunos = BancoDeDados::recuperarDados();
    cout << "Alunos: " << endl;
    for(Aluno aluno : alunos){
        cout << aluno.getNome() << ", " << aluno.getEmail() << ", " 
            << aluno.getNota1() << ", " << aluno.getNota2() << endl;
    }


    do{
        cout << "------------------------------------" << endl;

        Aluno::altera_aluno(alunos);

        BancoDeDados::saveDados(alunos);
        cout << "Dados atualizados" << endl;
        cout << "------------------------------------" << endl;

        cout << "Alunos atualizado " << endl;
        for(Aluno aluno : alunos){
            cout << aluno.getNome() << ", " << aluno.getEmail() << ", " 
                << aluno.getNota1() << ", " << aluno.getNota2() << endl;
        }

        cout << "deseja alterar os dados de outro aluno?" << endl;
        cin >> resposta;

    }while(resposta == 's');


    do{

        Aluno::remover_aluno(alunos);

        BancoDeDados::saveDados(alunos);
        cout << "Dados atualizados" << endl;
        cout << "------------------------------------" << endl;

        cout << "Alunos atualizado " << endl;
        for(Aluno aluno : alunos){
            cout << aluno.getNome() << ", " << aluno.getEmail() << ", " 
                << aluno.getNota1() << ", " << aluno.getNota2() << endl;
        }

        cout << "deseja remover outro aluno?" << endl;
        cin >> resposta;

    }while(resposta == 's');

    

    return 0;
}



