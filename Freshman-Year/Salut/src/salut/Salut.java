package salut;

public class Salut {

    public static void main(String[] args) {
        
    int i, j;
        
    System.out.println("Salut Mundi");

        for (j=0; j<11; j++) {
            
            for (i=0; i<j; i++) {
		
                System.out.print(" ");
			
            }
            
            for (i=j; i<11; i++) {
		
                System.out.print("+");
            
            }
		
            System.out.println();
	
        }              
    }    
}
