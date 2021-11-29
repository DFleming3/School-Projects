package fractionapp;

public class FractionApp {

    public static void main(String[] args) {
    
        // Create fraction objects and print them
        
        Fraction fract1 = new Fraction();
        Fraction fract2 = new Fraction(2, 3);
        Fraction fract3 = new Fraction(1, 6);
        Fraction fract5 = new Fraction(6, 8);
        Fraction newFract = new Fraction(fract3);
               
        System.out.println("Fraction 1: " + fract1.toString());
        System.out.println("Fraction 2: " + fract2.toString());
        System.out.println("Fraction 3: " + fract3.toString());
        System.out.println(newFract.toString() + " is a copy of " + fract3.toString());
        
        System.out.print(fract5.toString() + " can be simplified to ");
                           
        fract5.lowestTerms();
                        
        System.out.println(fract5);
                       
        Fraction fract4 = fract2.plusEq(fract3);
        
        System.out.println("The sum of " + fract2 + " and " + fract3 + " is " + fract2.plusEq(fract3));
        
        System.out.println(fract4.toString());
        System.out.println(fract4.toDouble());
        
        Fraction fract6 = fract2.multEq(fract3);
        
        System.out.println("The product of " + fract2 + " and " + fract3 + " is " + fract2.multEq(fract3));
        
        System.out.println(fract6.toString());
        System.out.println(fract6.toDouble());
        
        System.out.println();
        System.out.println("---------------------------------");
        System.out.println();
        
        // Attempt to calculate E
        
        Fraction prev = new Fraction(1, 1);
        
        for (int i = 1; i <= 15; i++) {
            
           Fraction oneOverI = new Fraction(1, i);
                       
           prev.multEq(oneOverI);
                               
                                                                           
           System.out.println("Fraction: " + prev.toString());
           
           System.out.println("Double: " + prev.toDouble());
           System.out.println(" ");   
                       
        }
                          
    }
    
    public static Fraction piFrac(int n) {
            
    Fraction term = new Fraction(6, 1);
    Fraction six = new Fraction(6, 1);
    int toplimit = 2*n+1;
    for (int i = toplimit; toplimit <= 30; toplimit = toplimit - 2) {
        
        Fraction invterm = new Fraction(term.getDenominator(), term.getNumerator());
        int x = (i*i);
        
        Fraction other = new Fraction(x, 1);
        
        term = other.multEq(invterm);
        term.plusEq(six);
        
        }
    
    Fraction one = new Fraction(1, 1);
    Fraction three = new Fraction(3, 1);
    
    return term = one.multEq(three);

    }

}