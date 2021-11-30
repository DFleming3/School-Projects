#include "stdio.h"
#define e 3                            // e = 3
#define g (e/e)                        // g = 1
#define h ((g+e)/2)                    // h = 2
#define f (e-g-h)                      // f = 0
#define j (e*e-g)                      // j = 8
#define k (j-h)                        // k = 6
#define l(x) tab2[x]/h                 // l = 
#define m(n,a) ((n&(a))==(a))          // m = 

long tab1[]={ 989L,5L,26L,0L,88319L,123L,0L,9367L };
int tab2[]={ 4,6,10,14,22,26,34,38,46,58,62,74,82,86 };

int main(int m1            /* Number of Arguments (argc = Argument Count) */, char *s /* s = Pointer to an array of pointers */) {
    int a,b,c,d,o[k];      // k = 8-2
    long n=(long)s;        // Convert s to a long n
    if (m1==1               /* Program was run without any arguments */){ 
       char b[2*j+f-g];    // b = 15 
       main(l(h+e)+h+e,b); // 26/2+5 = 18
       printf(b);          // Print b
    }
    else switch(m1-=h){
        case f:
            a=(b=(c=(d=g)<<g)<<g)<<g;
            return(m(n,a|c)|m(n,b)|m(n,a|d)|m(n,c|d));
        case h:
            for (a=f; a<j; ++a)                      // For a = 0; a < 8; ++a | Set a to 0, increment it while it is less then 8
               if (tab1[a]&&!(tab1[a]%((long)l(n)))) // Constantly test if a is in tab list 1 & not a being a long l in tab list 1
                  return(a);                         // Return a
        case g:
            if (n<h)                                 // If n is less then 2
               return(g);                            // Return 1
            if (n<j) {                               // If n is less then 8
               n-=g;                                 // Set n to 0
               c='D';                                // Set c to D
               o[f]=h;                               // The 0th argunemnt of o is equal to 2
               o[g]=f;                               // The 1st argument of o is equal to 0
            }
            else {
               c='\r'-'\b';                          // Set c to 
               n-=j-g;                               // Set n to 6
               o[f]=o[g]=g;                          // Set the 0th argument of o to the 1st argument of o to 1
            }
            if ((b=n)>=e)                            // If 15 = n is greater then or equal to 3
               for (b=g<<g; b<n; ++b)                // Set b equal to 1, b is less then n, Increment b
                  o[b]=o[b-h]+o[b-g]+c;              // Set the bth argument of o to b - 2 of o
            return(o[b-g]%n+k-h);
        default:
            if (m1-=e)
               main(m1-g+e+h,s+g); 
            else *(s+g)=f;
            for (*s=a=f; a<e;) *s=(*s<<e)|main(h+a++,(char *)m1);
        }
}

