package sorttime;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class SortTime {

    public static void main(String[] args) throws FileNotFoundException {

        File fname = new File("manywords100k.txt");
        
        Scanner myScanner = new Scanner(fname);
        Scanner otherScanner = new Scanner(System.in);
        
        System.out.println("Enter a number:");
        int n = otherScanner.nextInt();
        int numberOfItems = 0;
        
        String word = " ";
        
        String [] myArray = new String[n];
        
        long newTime;
                
        for (int i = 1; i <= n; i++) {
            
            word = myScanner.next();
            
            myArray[numberOfItems] = word.toLowerCase();
            
            numberOfItems += 1;
                        
        }
        
        long firstTime = System.currentTimeMillis();
        
        Sort(myArray, n);
        
        long secondTime = System.currentTimeMillis();
        
        for (int x = 0; x < numberOfItems; x++) {
            
            //Prints for each object in the array
        
            System.out.println(myArray[x]);
        
        }
        
        newTime = secondTime - firstTime;
        
        double time = newTime;
 
        time = time / 1000.0;
        
        System.out.printf("Time = %.3f %n", time);
                
    }
    
    static void Sort(String myArray[], int n) {
        
        for (int q = n - 1; q>=1; q--) {
            
            for (int p = 0; p<q; p++) {
                
                if (myArray[q].compareTo(myArray[p]) < 0) {
                    
                    String temp = myArray[q];
                    myArray[q] = myArray[p];
                    myArray[p] = temp;
                    
                }
                
            }
            
        }
        
    }
    
}
    