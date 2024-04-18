#include <iostream>

using namespace std;

class ItemBiblioteca{
    private:
        string titulo;
        string autor;
        int numero_copias;
    public:
        ItemBiblioteca(string _titulo, string _autor, int _numero_copias){
            titulo = _titulo;
            autor = _autor;
            numero_copias = _numero_copias;
        }
        string getTitulo(){
            return titulo;
        }
        void setTitulo(string _titulo){
            titulo = _titulo;
        }
        string getAutor(){
            return autor;
        }
        void setAutor(string _autor){
            autor = _autor;
        }
        int getNumero_copias(){
            return numero_copias;
        }
        void setNumero_copias(int _numero_copias){
            numero_copias = _numero_copias;
        }
    

};

class Livro: ItemBiblioteca{
    private:
        int numero_paginas;
    public:  
        Livro(string _titulo, string _autor, int _numero_copias, int _numero_paginas):ItemBiblioteca( _titulo, _autor, _numero_copias){
            numero_paginas = _numero_paginas;

        }
            
        
        int getNumero_paginas(){
            return numero_paginas;
        }
        void setNumero_paginas(int _numero_paginas){
            numero_paginas = _numero_paginas;

        }
        void to_string(){
            cout << "Numero de paginas:"<<numero_paginas<< endl;
            cout << "Autor:"<<ItemBiblioteca::getAutor()<<endl;
            cout << "Titulo:"<<ItemBiblioteca::getTitulo()<<endl;
            cout << "Numero de copias:"<<ItemBiblioteca::getNumero_copias()<<endl;
        
        }

};
class DVD: ItemBiblioteca{
    private:
        double duracao;
    public:    
        // DVD(string _duracao):ItemBiblioteca( _titulo, _autor, _numero_copias){
        //     duracao = _duracao;
        // }

};

int main()
{

    Livro livro("titulo tal", "autor tal", 500, 200);

    livro.to_string();
    return 0;
}
