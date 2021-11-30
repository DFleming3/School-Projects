package orderit;

import java.util.Scanner;
import java.util.Arrays;

public class OrderIt {
        
    public static void main(String[] args) {
        
        String word = " ";
        String [] myArray = new String[50];
        
        int numberOfItems = 0;
               
        Scanner myScanner = new Scanner(System.in);      
        
        while (! word.equals("quit")) {
            
            System.out.print("Enter a word: ");
            
            word = myScanner.next();
            word = word.toLowerCase();
            
            if (word.equals("quit")) {
                
                break;
                
            }
            else {
            
                myArray[numberOfItems] = word;
            
                numberOfItems += 1;
                                               
            }                    
                                    
        }
        
        Arrays.sort(myArray, 0, numberOfItems);
        
        for (int x = 0; x < numberOfItems; x++) {
            
            //Prints for each object in the array
        
            System.out.println(myArray[x]);
        
        }
                
    }
    
}
