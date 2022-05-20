from optimizer import Optimizer

# op = Optimizer(sequence_times=[0.11609977, 0.39473923, 0.99845805, 1.46285714, 1.90403628], balls=4, loop=True)

op = Optimizer(sequence_times=[0.23219955, 0.60371882, 1.16099773, 1.55573696, 1.83437642, 2.39165533], balls=3, loop=True)

print(op.solve())

print(op.get_solution())

##################################################################################################################################################
