import pulp as pl
import numpy as np
from functions import (
    P, Q, S, SS, R, RR,
    P_aux, Q_aux
)
from const import *
from utils import (
    get_interval,
    get_positions,
    check_init
)

class Optimizer:
    def __init__(self, sequence_times, balls, loop=False) -> None:
        self.times = sequence_times
        self.__original_length = len(sequence_times) - 1
        self.balls = balls
        self.loop = loop
        self.d = None
        
        if self.loop:
            a = 0; b = 1
            while b < self.__original_length:
                self.times.append(self.times[-1] + (self.times[b] - self.times[a]))
                a += 1
                b += 1
        
        self.prob = None #pl.LpProblem("Problem", pl.LpMinimize)

        self.X = None #pl.LpVariable.dicts("X", range(self.balls*len(self.times)), cat=pl.LpBinary)
        self.Y = None #pl.LpVariable.dicts("Y", range(self.balls*len(self.times)*len(self.times)), cat=pl.LpBinary)
        
        self.result = None
    
    def default_preconditions(self) -> None:
        for b in range(self.balls):
            for i in range(len(self.times)):
                # prob += pl.LpConstraint(X[b*len(times) + i] - P(times[i], h, throw_type), sense=pl.LpConstraintLE, name=f"X{b}{i} <= P{b}{i}")
                # prob += X[b*len(times) + i] <= P(times[i], h, throw_type)
                for j in range(i + 1, len(self.times)):
                    self.prob += pl.LpConstraint(self.X[b*len(self.times) + i] + self.X[b*len(self.times) + j] - 1 - R(self.times[i], self.times[j], h, throw_type), sense=pl.LpConstraintLE, name=f"X{b}{i} X{b}{j} <= 1 R{b}{i}{j}")
                    # prob += X[b*len(times) + i] + X[b*len(times) + j] <= 1 + R(times[i], times[j], h, throw_type)

                    self.prob += pl.LpConstraint(self.Y[b*len(self.times)**2 + i*len(self.times) + j] - Q(self.times[i], self.times[j], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} <= Q{b}{i}{j}")
                    # prob += Y[b*len(times)**2 + i*len(times) + j] <= Q(times[i], times[j], h, throw_type)

                    for k in range(j + 1, len(self.times)):
                        self.prob += pl.LpConstraint(self.X[b*len(self.times) + i] + self.Y[b*len(self.times)**2 + j*len(self.times) + k] - 1 - RR(self.times[i], self.times[j], self.times[k], h, throw_type), sense=pl.LpConstraintLE, name=f"X{b}{i} Y{b}{j}{k} <= 1 RR{b}{i}{j}{k}")
                        # prob += X[b*len(times) + i] + Y[b*len(times)**2 + j*len(times) + k] <= 1 + RR(times[i], times[j], times[k], h, throw_type)

                        self.prob += pl.LpConstraint(self.Y[b*len(self.times)**2 + i*len(self.times) + j] + self.X[b*len(self.times) + k] - 1 - S(self.times[i], self.times[j], self.times[k], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} X{b}{k} <= 1 S{b}{i}{j}{k}")
                        # prob += Y[b*len(times)**2 + i*len(times) + j] + X[b*len(times) + k] <= 1 + S(times[i], times[j], times[k], h, throw_type)

                        for m in range(k + 1, len(self.times)):
                            self.prob += pl.LpConstraint(self.Y[b*len(self.times)**2 + i*len(self.times) + j] + self.Y[b*len(self.times)**2 + k*len(self.times) + m] - 1 - SS(self.times[i], self.times[j], self.times[k], self.times[m], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} Y{b}{k}{m} <= 1 S{b}{i}{j}{k}{m}")
                            # prob += Y[b*len(times)**2 + i*len(times) + j] + Y[b*len(times)**2 + k*len(times) + m] <= 1 + SS(times[i], times[j], times[k], times[m], h, throw_type)

                    sum_Xk = []
                    sum_Ykm = []
                    sum_YdK = []
                    for k in range(i + 1, j):
                        sum_Xk.append(self.X[b*len(self.times) + k])
                        
                        for m in range(k + 1, len(self.times)):
                            sum_Ykm.append(self.Y[b*len(self.times)**2 + k*len(self.times) + m])
                            
                        for d in range(k):
                            sum_YdK.append(self.Y[b*len(self.times)**2 + d*len(self.times) + k])

                    self.prob += pl.LpConstraint(sum(sum_Xk) + sum(sum_Ykm) + sum(sum_YdK) - (1 - self.Y[b*len(self.times)**2 + i*len(self.times) + j])*len(self.times), sense=pl.LpConstraintLE)

        for i in range(len(self.times)):
            sum_ti = []
            for b in range(self.balls):
                sum_ti.append(self.X[b*len(self.times) + i])

            for j in range(i + 1, len(self.times)):
                for b in range(self.balls):
                    sum_ti.append(self.Y[b*len(self.times)**2 + i*len(self.times) + j])

            for k in range(0, i):
                for b in range(self.balls):
                    sum_ti.append(self.Y[b*len(self.times)**2 + k*len(self.times) + i])

            self.prob += pl.LpConstraint(sum(sum_ti) - 1, sense=pl.LpConstraintEQ, name=f"Sum t{i}")

    
    def loop_preconditions(self) -> None:
        for b in  range(self.balls):
            for i in  range(self.__original_length):
                for j in range(self.__original_length):
                    if i != j:
                        position = get_positions(len=self.__original_length, i=i, j=j)
                        
                        self.prob += pl.LpConstraint(self.X[b*self.__original_length + i] + self.X[b*self.__original_length + j] - 1 - R(self.times[position['i']], self.times[position['j']], h, throw_type), sense=pl.LpConstraintLE, name=f"X{b}{i} X{b}{j} <= 1 R{b}{i}{j}")
                        self.prob += pl.LpConstraint(self.Y[b*self.__original_length**2 + i*self.__original_length + j] - Q(self.times[position['i']], self.times[position['j']], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} <= Q{b}{i}{j}")

                        inter1 = get_interval(i, j, self.__original_length) 
                        for k in inter1:
                            if k != j:
                                position = get_positions(len=self.__original_length, i=i, j=j, k=k)
                                self.prob += pl.LpConstraint(self.X[b*self.__original_length + i] + self.Y[b*self.__original_length**2 + j*self.__original_length + k] - 1 - RR(self.times[position['i']], self.times[position['j']], self.times[position['k']], h, throw_type), sense=pl.LpConstraintLE, name=f"X{b}{i} Y{b}{j}{k} <= 1 RR{b}{i}{j}{k}")

                                self.prob += pl.LpConstraint(self.Y[b*self.__original_length**2 + i*self.__original_length + j] + self.X[b*self.__original_length + k] - 1 - S(self.times[position['i']], self.times[position['j']], self.times[position['k']], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} X{b}{k} <= 1 S{b}{i}{j}{k}")
                                
                                
                                inter2 = get_interval(i, k, self.__original_length) 
                                for m in inter2:
                                    if k != m:
                                        position = get_positions(len=self.__original_length - 1, i=i, j=j, k=k, m=m)
                                        self.prob += pl.LpConstraint(self.Y[b*self.__original_length**2 + i*self.__original_length + j] + self.Y[b*self.__original_length**2 + k*self.__original_length + m] - 1 - SS(self.times[position['i']], self.times[position['j']], self.times[position['k']], self.times[position['m']], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} Y{b}{k}{m} <= 1 S{b}{i}{j}{k}{m}")
                            
                                    
        for i in range(self.__original_length):
            sum_ti = []
            for b in range(self.balls):
                sum_ti.append(self.X[b*self.__original_length + i])

            for j in range(self.__original_length):
                for b in range(self.balls):
                    if i != j and check_init(i, j, end=self.__original_length - 1):
                        sum_ti.append(self.Y[b*self.__original_length**2 + i*self.__original_length + j])

            for k in range(self.__original_length):
                for b in range(self.balls):
                    if k != i and check_init(i, k, end=self.__original_length - 1):
                        sum_ti.append(self.Y[b*self.__original_length**2 + k*self.__original_length + i])

            self.prob += pl.LpConstraint(sum(sum_ti) - 1, sense=pl.LpConstraintEQ, name=f"Sum t{i}")

    def solve(self) -> int:
        
        if self.loop:
            self.prob = pl.LpProblem("Problem", pl.LpMinimize)

            self.X = pl.LpVariable.dicts("X", range(self.balls*self.__original_length), cat=pl.LpBinary)
            self.Y = pl.LpVariable.dicts("Y", range(self.balls*self.__original_length*self.__original_length), cat=pl.LpBinary)
            
            self.loop_preconditions()
            
            self.result = self.prob.solve()
            
            np.set_printoptions(threshold=np.inf)
            print(np.array([self.X[i].varValue for i in range(self.balls*self.__original_length)]).reshape((self.balls, self.__original_length)).astype('int'))
            print(np.array([self.Y[i].varValue for i in range(self.balls*self.__original_length*self.__original_length)]).reshape((self.balls, self.__original_length, self.__original_length)))
        else:
            self.prob = pl.LpProblem("Problem", pl.LpMinimize)

            self.X = pl.LpVariable.dicts("X", range(self.balls*len(self.times)), cat=pl.LpBinary)
            self.Y = pl.LpVariable.dicts("Y", range(self.balls*len(self.times)*len(self.times)), cat=pl.LpBinary)
            
            self.default_preconditions()
            
            self.result = self.prob.solve()
        
            print(np.array([self.X[i].varValue for i in range(self.balls*len(self.times))]).reshape((self.balls, len(self.times))).astype('int'))
            print(np.array([self.Y[i].varValue for i in range(self.balls*len(self.times)*len(self.times))]).reshape((self.balls, len(self.times), len(self.times))))
        
        # print(self.prob)
        return self.result
        
    def get_solution(self):
        if self.result:
            if self.loop:
                return self.__get_loop_solutions()
            else:
                return self.__get_default_solutions()
        
        raise Exception('Something went wrong! :/')
    
    
    def __get_default_solutions(self):
        list_throw_balls = [[] for _ in range(self.balls)]
        list_total_times_balls = [0 for _ in range(self.balls)]


        for b in range(self.balls):
            for i in range(len(self.times)):
                if self.X[b*len(self.times) + i].varValue == 1:
                    list_throw_balls[b].append(P_aux(self.times[i], h, throw_ball=throw_type, current_time=list_total_times_balls[b]))
                    list_total_times_balls[b] += list_throw_balls[b][-1][-1]

                for j in range(i+1,len(self.times)):
                    if self.Y[b*len(self.times)**2 + i*len(self.times) + j].varValue == 1:
                        list_throw_balls[b].append(Q_aux(self.times[i], self.times[j], h, throw_type, current_time=list_total_times_balls[b]))
                        list_total_times_balls[b] += list_throw_balls[b][-1][-1]

            list_throw_balls[b].sort(key=lambda x: x[4])
            
        return list_throw_balls
    
    def __get_loop_solutions(self):
        list_throw_balls = [[] for _ in range(self.balls)]
        list_total_times_balls = [0 for _ in range(self.balls)]

        for b in range(self.balls):
            for i in range(self.__original_length):
                if self.X[b*self.__original_length + i].varValue == 1:
                    list_throw_balls[b].append(P_aux(self.times[i], h, throw_ball=throw_type, current_time=list_total_times_balls[b]))
                    list_total_times_balls[b] += list_throw_balls[b][-1][-1]

                for j in range(self.__original_length):
                        if self.Y[b*self.__original_length**2 + i*self.__original_length + j].varValue == 1:
                            position = get_positions(len=self.__original_length, i=i, j=j)
                            print(self.times)
                            print(i, j, position['i'], position['j'])
                            list_throw_balls[b].append(Q_aux(self.times[position['i']], self.times[position['j']], h, throw_type, current_time=list_total_times_balls[b]))
                            list_total_times_balls[b] += list_throw_balls[b][-1][-1]

            list_throw_balls[b].sort(key=lambda x: x[4])

        return list_throw_balls