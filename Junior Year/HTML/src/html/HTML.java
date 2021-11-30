package html;

public class HTML {

    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_RESET = "\u001B[0m";
    
    public static void main(String[] args) {
     
        printNationalAnthem();
        
    }
    
   public static void printNationalAnthem() {
       
       String string1 = (ANSI_RED + "O say can you see, by the dawn's early light" + ANSI_RESET);
       String string2 = (ANSI_BLUE + "What so proudly we hailed at the twilight's last gleaming" + ANSI_RESET);
       String string3 = (ANSI_RED + "Whose broad stripes and bright stars through the perilous fight" + ANSI_RESET);
       String string4 = (ANSI_BLUE + "O'er the ramparts we watched, were so gallantly streaming?" + ANSI_RESET);
       String string5 = (ANSI_RED + "And the rockets' red glare, the bombs bursting in air" + ANSI_RESET);
       String string6 = (ANSI_BLUE + "Gave proof through the night that our flag was still there" + ANSI_RESET);
       String string7 = (ANSI_RED + "O say does that star-spangled banner yet wave" + ANSI_RESET);
       String string8 = (ANSI_BLUE + "O'er the land of the free and the home of the brave?" + ANSI_RESET);
       
       System.out.println(string1 + "\n" + string2 + "\n" + string3 + "\n" + string4 + "\n" + string5 + "\n" + string6 + "\n" + string7 + "\n" + string8);
              
   }
    
}
