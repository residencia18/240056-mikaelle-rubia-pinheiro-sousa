package facade;

import java.io.IOException;

import encrypt.Encrypter;

public class Facade {
	
	public static void main(String[] args) {
		
		String inputFile = args[0];
		String outputFile = args[1];
		String password = args[2];
		
		try {
			Encrypter.proccess(inputFile, outputFile, password);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("Impossivel executar com estes parametros");
		} finally {
			System.out.println("Arquivo "+inputFile+ " processado com sucesso. Verifique "+outputFile);
		}
	}


}
