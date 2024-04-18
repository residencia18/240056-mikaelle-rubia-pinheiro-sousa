#include <iostream>
#include <string>
#include <ctime>
#include <stdlib.h>
#include <regex>

using namespace std;

struct Data{
    int dia;
    int mes;
    int ano;
};
void pedi_data(Data data);
int main(){
    Data data;
    pedi_data(data);
    return 0;
}

void pedi_data(Data data){
    string dta_, dia, mes, ano;
    cout << "Digite a data(dd/mm/yyyy)" << endl;
    cin >> dta_;

    regex datePattern(R"(\d{2}/\d{2}/\d{4})");

    if(!regex_match(dta_, datePattern)){
        cout << "formato invalido" << endl;
    }else{

        dia = dta_.substr(0,2);
        mes = dta_.substr(3,2);
        ano = dta_.substr(6,10);

        data.dia = atol(dia.c_str());
        data.mes = atoi(mes.c_str());
        data.ano = atoi(ano.c_str());

        if((data.dia >= 1 && data.dia <= 30 ) && (data.mes == 4||data.mes == 6 || data.mes ==9 || data.mes ==7 || data.mes ==11)){

        }
        else if((data.dia >= 1 && data.dia <= 31 ) && (data.mes == 1||data.mes == 3 || data.mes ==5 || data.mes ==7 || data.mes ==8 || data.mes ==10 || data.mes ==12)){

        }
        else if((data.dia >= 1 && data.dia <= 28 ) && (data.mes == 2)){

        }
        else if(data.dia >= 29 && data.mes == 2 && (data.ano % 400 == 0 || data.ano % 4 == 0 && data.ano % 100 !=0)){

        }else{
            cout << "Data invalida" << endl;

        }


    }
}
