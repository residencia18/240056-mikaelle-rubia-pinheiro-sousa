package encrypt;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Encrypter {

	/**
	 * This method performs a encrypt (or decrypt) method
	 * @param inputFile
	 * @param outputFile
	 * @param password
	 * @throws IOException 
	 */
	public static void proccess(String inputFile, String outputFile, String password) throws IOException {
		FileInputStream in = new FileInputStream(inputFile);
		FileOutputStream out = new FileOutputStream(outputFile);
		int i=0;
		int fileIndex = 0;
		i = in.read();
		while (i!=-1) {
			byte b = (byte) i;
			int pos = fileIndex%password.length();
			byte s = (byte) password.charAt(pos);
			fileIndex++;
			byte c = (byte)  (s^b);
			out.write(c);
			i = in.read();
		}
		in.close();
		out.close();
	}
	
	

}
