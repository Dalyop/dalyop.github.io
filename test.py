# Algorithm
# 1. Input: A list of numbers
# 2. Initialize: Set variable 'total_sum' to 0
# 3. Iterate: Loop through each number in the list
# 4. Accumulate: Add each number to 'total_sum'
# 5. Output: The value of 'total_sum' which is the sum of all numbers in the list

# Pseudo Code
# Function sum_of_list(numbers)
#   Initialize total_sum to 0
#    For each num in numbsers
#       Add num to total_sum
#      Return total_sum

#  End Function

# Actual Code
def sum_of_list(numbers):
    total_sum = 0
    for num in numbers:
        total_sum += num
    return total_sum
numbers = [1,2,3,4,5,6,7,8,9]
print('The sum of the list is:', sum_of_list(numbers))