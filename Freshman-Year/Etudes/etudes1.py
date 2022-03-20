import sys
import string
import math
import random
from collections import defaultdict

# Average of a list of numbers
def avg(nums):
   a = sum(nums)/len(nums)
   return a

# Standard deviation of a list of numbers   
def dev(nums):
   n = 0
   for x in nums:
      d = x - avg(nums)
      n += d**(2) # Square
      s = (n/(len(nums)-1)) # Denominator
      e = s**(.5)
   return e

# Standard deviation of ONLY THE NEGATIVE nubmers in a list of numbers  
def devm(nums):
   y = dev([x for x in nums if x <= 0 ])
   return y
   
   

# Standard devation of the difference between successive numbers
def devd(nums):
   dd = 0
   list = []
   for i in (range(len(nums) - 1)):
      list.append(nums[i+1] - nums[i])
   return dev(list)



# Main program begins here.
#
# Generate three sets of random numbers.
#
random.seed(0)
rs = [random.randrange(101)-50 for i in range(10)]
random.seed(0)
rm = [random.randrange(101)-50 for i in range(1000)]
random.seed(0)
rl = [random.randrange(101)-50 for i in range(100000)]

while True:
    
    # Which test?
    func = input("Which function [a=avg d=dev dm=dev-of-negs dd=dev-of-diffs q=quit]: ").lower()
    if func == "q": break

    # Which size?
    siz = input("Which size [s m l]: ").lower()
    if siz == "q": break
    if siz == "l":
        data = rl
    elif siz == "m":
        data = rm
    else:
        data = rs
        
    # Test function
    if func == "a":
        f = avg
    elif func == "d":
        f = dev
    elif func == "dm":
        f = devm
    elif func == "dd":
        f = devd
        
    print("result: ", f(data))
