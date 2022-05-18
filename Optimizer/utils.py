
# Get possible interval for loop problem
def get_interval(i,j,length):
    result = []
    if i < j:
        result += list(range(0,i)) + list(range(j + 1, length))
    else:
        result += list(range(j+1,i))
    return result


def get_positions(len, i, j, k=None, m=None):
    result = {
        'i': i,
        'j': j,
        'k': k,
        'm': m
    }
    
    if j < i:
        result['j'] = j + len
        
    if k != None and  k < j:
        result['k'] = k + len
        
    if m != None and m > k:
        result['m'] = m + len
        
    return result