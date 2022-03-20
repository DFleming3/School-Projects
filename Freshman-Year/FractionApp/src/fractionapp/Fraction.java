package fractionapp;

public class Fraction {
        
    private long numerator;
    private long denominator;
            
    public Fraction() {
        
        numerator = 0;
        denominator = 1;
        
    }
    
    public Fraction(long n, long d) {
        
        numerator = n;
        denominator = d;
                       
    }
    
    public Fraction(long n) {
        
        numerator = n;
        
        denominator = 1;
        
    }
    
    public Fraction(Fraction other) {
        
        numerator = other.numerator;
        denominator = other.denominator;
        
    }
    
    public String toString() {
        
        return numerator + "/" + denominator;
        
    }
    
    public double toDouble() {
        
        double x = Double.valueOf(numerator);
        double y = Double.valueOf(denominator);
        
        double number = x / y;
        
    return number;
        
    }
    
    private static long gcf(long numerator, long denominator) {
        
        while (denominator != 0) {
            
            long otherd = numerator % denominator;
            numerator = denominator;
            denominator = otherd;
                    
        }      
        
    return numerator;
        
    }
    
    public void lowestTerms() {
        
        long common = gcf(numerator, denominator);
        
        numerator = numerator / common;
        
        denominator = denominator / common;
        
    }  
    
    public Fraction plusEq(Fraction other) {
                
        long LCD = denominator * other.denominator;
        
        long numeratorFract1 = numerator * other.denominator;
        long numeratorFract2 = other.numerator * denominator;
        
        long sumOfNumerators = numeratorFract1 + numeratorFract2;
        
        Fraction newFraction = new Fraction(sumOfNumerators, LCD);
        
        newFraction.lowestTerms();
        
    return newFraction;
        
    }
    
    public Fraction multEq(Fraction other) {
        
        long productN = numerator * other.numerator;
        long productD = denominator * other.denominator;
        
        Fraction newFraction = new Fraction(productN, productD);
                                
        newFraction.lowestTerms();
                
    return newFraction;
                       
    }
    
    long getNumerator() {
        
       return numerator;
        
    }
    
    long getDenominator() {
        
        return denominator;
        
    }
    
    void setNumerator(long newNumerator) {
        
        this.numerator = newNumerator;
        
    }
    
    void setDenominator(long newDenominator) {
        
        this.denominator = newDenominator;
           
    }
    
}


