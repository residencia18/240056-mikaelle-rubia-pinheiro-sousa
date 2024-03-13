#include <iostream>
#include <vector>

using namespace std;


template <typename T>class ListaGenerica{
    private:
        vector <T> lista;

    public:
    
    void add(const T& item){
        lista.push_back(item);
    }

    void listar()const{
        for(const T& item : lista){
            cout << item << endl;
        }
    }

    void remover(const T& item){
        for(auto it = lista.begin(); it != lista.end(); it++){
            if(*it == item){
                lista.erase(it);
            }
        }
    }

};

int main(){
    ListaGenerica<int> lista;
    lista.add(1);
    lista.add(3);
    lista.add(4);
    lista.add(9);
    cout<< "--------LISTA DE INT--------" << endl;
    lista.listar();

    lista.remover(3);

    cout<< "--------LISTA DE INT--------" << endl;
    lista.listar();

    
    ListaGenerica <char> listastr; 
    listastr.add('a');
    listastr.add('b');
    listastr.add('c');
    listastr.add('d');
    cout<< "--------LISTA DE CHAR--------" << endl;
    listastr.listar();

    listastr.remover('b');

    cout<< "--------LISTA DE CHAR--------" << endl;
    listastr.listar();


    ListaGenerica <double> lista_double; 
    lista_double.add(0.9);
    lista_double.add(9.5);
    lista_double.add(5);
    lista_double.add(4.5);
    cout<< "--------LISTA DE DOUBLE--------" << endl;
    lista_double.listar();

    lista_double.remover(9.5);


    cout<< "--------LISTA DE DOUBLE--------" << endl;
    lista_double.listar();

    return 0;
}