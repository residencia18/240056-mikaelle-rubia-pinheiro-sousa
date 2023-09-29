#include <iostream>
#include <string>
#include <ctime>
#include <stdlib.h>
#include <regex>

using namespace std;

class DataClass{
    private:
        string data_completa;
        int dia;
        int mes;
        int ano;

    public:
        DataClass();

        DataClass(string _data_completa){
            data_completa = _data_completa;
        }
        string getData_completa(){
            return data_completa;
        }

        void setData_completa(string _data_completa){
            data_completa = _data_completa;
        }
        int getDia(){
            return dia;
        }
        void setDia(int _dia){
            dia = _dia;
        }

        int getMes(){
            return mes;
        }
        void setMes(int _mes){
            mes = _mes;
        }

        int getAno(){
            return ano;
        }
        void setAno(int _ano){
            ano = _ano;
        }

        bool valida_data(){
            string dta_, dia, mes, ano;
            dta_ = getData_completa();

            regex datePattern(R"(\d{2}/\d{2}/\d{4})");

            if(!regex_match(dta_, datePattern)){
                return false;
                
            }else{

                dia = dta_.substr(0,2);
                mes = dta_.substr(3,2);
                ano = dta_.substr(6,10);

                setDia(atol(dia.c_str()));
                setMes(atol(mes.c_str()));
                setAno(atol(ano.c_str()));

                if((getDia() >= 1 && getDia() <= 30 ) && (getMes() == 4||getMes() == 6 || getMes() ==9 || getMes() ==7 || getMes() ==11)){

                }
                else if((getDia() >= 1 && getDia() <= 31 ) && (getMes() == 1||getMes() == 3 || getMes() ==5 || getMes() ==7 || getMes() ==8 || getMes() ==10 || getMes() ==12)){

                }
                else if((getDia() >= 1 && getDia() <= 28 ) && (getMes() == 2)){

                }
                else if(getDia() >= 29 && getMes() == 2 && (getAno() % 400 == 0 || getAno() % 4 == 0 && getAno() % 100 !=0)){

                }else{
                    return false;
                }
            }
            return true;

        }
};


int main(){
    DataClass data_nova("01/10/1999");
    
    if (data_nova.valida_data()){
        cout << "Data valida" << endl;

    }else{
        cout << "Data invalida" << endl;

    }
    return 0;
}


