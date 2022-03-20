package jlab1;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class GuiCalc implements ActionListener {
    
    private JFrame frame;
    private JTextField firstNumber;
    private JTextField secondNumber;
    private JLabel rslt;
    private JLabel lblFirst;
    private JLabel lblSecond;
    private JButton computeButton;
    
    // Declare All Swing Components
    
    private String strFirstNumber = "0";
    private String strSecondNumber = "0";
    private String result = "0";
    
    // Declare Variables
    
    public GuiCalc() {
                
        GridLayout grid = new GridLayout(4, 2);
        
        // Create a GridLayout for the application with 4 rows and 2 columns
        
        frame = new JFrame();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(grid);
        
        // Create the frame for the application
        
        lblFirst = new JLabel("First Number: ");
        frame.add(lblFirst);
        
        // Set the first number label to prompt for the first number and add it to the frame
        
        firstNumber = new JTextField("", 5);
        frame.add(firstNumber);
        
        // Set the first number text field to blank and add it to the frame
                
        lblSecond = new JLabel("Second Number: ");
        frame.add(lblSecond);
        
        // Set the second number label to prompt for the second number and add it to the frame
                
        secondNumber = new JTextField("", 5);
        frame.add(secondNumber);
        
        // Set the second number text field to blank and add it to the frame
        
        rslt = new JLabel(strFirstNumber + " * " + strSecondNumber + " = " + result);
        frame.add(rslt);
        
        // Set the result label to be formatted to a multiplication equation and add it to the frame
        
        computeButton = new JButton("Compute");
        frame.add(computeButton);
        computeButton.addActionListener(this);
        
        // Create the compute button, add it to the frame, and add an action listener to it
        
        frame.pack();
        frame.setVisible(true);
       
        // Finish creating the frame

    }

    public void actionPerformed(ActionEvent e) {

        String strFirstNumber = this.firstNumber.getText();
        String strSecondNumber = this.secondNumber.getText();
        int firstNumber = Integer.parseInt(strFirstNumber);
        int secondNumber = Integer.parseInt(strSecondNumber);
        int result = firstNumber * secondNumber;
        rslt.setText(firstNumber + " * " + secondNumber + " = " + result);
        
        // Code that makes the compute button properly compute simple multiplication equations
        
    }
    
}
