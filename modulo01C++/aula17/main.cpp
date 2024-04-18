#include <iostream>
#include <string>


using namespace std;

class Celular{
    private:
        string marca;
        string modelo;
        string armazenamento;
        string processador;
        string sistemaOperacional;


    public:
        Celular(string _marca, string _modelo, string _armazenamento, string _processador, string _sistemaOperacional){
            marca = _marca;
            modelo = _modelo;
            armazenamento = _armazenamento;
            processador = _processador;
            sistemaOperacional = _sistemaOperacional;
        };

        Celular(){
            marca = "";
            modelo = "";
            armazenamento = "";
            processador = "";
            sistemaOperacional = "";
        }

        string getMarca(){
            return marca;
        }

        void setMarca(string _marca){
            marca = _marca;
        }

        string getModelo(){
            return modelo;
        }

        void setModelo(string _modelo){
            modelo = _modelo;
        }

        string getSistemaOperacional(){
            return sistemaOperacional;
        }

        void setSistemaOperacional(string _sistemaOperac){
            sistemaOperacional = _sistemaOperac;
        }

};


class Livro{

    private:
        string paginas;
        string editora;
        string ano;
        string genero;
        string autor;
        string titulo;


    public:
        Livro(){
            paginas = "";
            editora = "";
            ano = "";
            genero = "";
            autor = "";
            titulo = "";
        }

        Livro(string _paginas,string _editora,string _ano,string _genero,string _autor, string _titulo){
            paginas = _paginas;
            editora = _editora;
            ano = _ano;
            genero = _genero;
            autor = _autor;
            titulo = _titulo;
        }

        string getPaginas() { 
            return paginas;
        }

        void setPaginas(string _paginas) {
            paginas = _paginas;
        }

        string getEditora() {
            return editora;
        }

        void setEditora(string _editora) {
            editora =  _editora;
        }

        string getGenero() {
            return genero;
        }

        void setGenero(string _genero) {
            genero = _genero;
        }

        string getAno() {
            return ano;
        }

        void setAno(string _ano) {
            ano = _ano;
        }

        string getAutor() {
           return autor;     
        }   

        void setAutor(string _autor) {
            autor = _autor;
        } 

        string getTitulo() {
            return titulo;
        }

        void setTitulo(string _titulo) {
            titulo = _titulo;
        }

        void to_string() {
            cout << "Titulo: " << getTitulo() + "\nAutor: " << getAutor() << "\nGenero: "<< getGenero()  << "\nPaginas: "<< getPaginas() <<
                "\nEditora " << getEditora() << "\nAno " << getAno() << endl;
        }        
};

class Mamifero{

    private:
        string habitat;
        string especie;
        string raca;
        string peso;
        string nomeCientifico;

    public:
        Mamifero(string _habitat, string _especie, string _peso, string _nomeCientifico, string _raca){
            habitat = _habitat;
            especie = _especie;
            raca = _raca;
            peso = _peso;
            nomeCientifico = _nomeCientifico;
        };

        Mamifero(){
            habitat = "";
            especie = "";
            raca = "";
            peso = "";
            nomeCientifico = "";

       }; 

       string getHabitat(){
            return habitat;
       }

       void setHabitat(string _habitat){
            habitat = _habitat;
       }

       string getEspecie(){
            return habitat;
       }

       void setEspecie(string _especie){
            especie = _especie;
       }

       string getRaca(){
            return raca;
       }

       void setRaca(string _raca){
            raca = _raca;
       }

       string getPeso(){
            return peso;
       }

       void setPeso(string _peso){
            peso = _peso;  

       }

       string getNomeCientifico(){
            return nomeCientifico;

       }

       void setNomeCientifico(string _nomeCientifico){
            nomeCientifico = _nomeCientifico;
       }


};
int main(){

    Livro livro1("250", "editora tal","2022", "terror", "autora01","Tirulo01");
    livro1.to_string();

    Celular Celular1();
    return 0;
}
