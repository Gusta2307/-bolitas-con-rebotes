import pulp as pl
from functions import (
    P, Q, S, SS, R, RR,
    P_aux, Q_aux
)
from const import *

class Optimizer:
    def __init__(self, _sequence_times, _balls, _loop=False) -> None:
        self.times = _sequence_times
        self.balls = _balls
        self.loop = _loop
        
        self.prob = pl.LpProblem("Problem", pl.LpMinimize)

        self.X = pl.LpVariable.dicts("X", range(self.balls*len(self.times)), cat=pl.LpBinary)
        self.Y = pl.LpVariable.dicts("Y", range(self.balls*len(self.times)*len(self.times)), cat=pl.LpBinary)
        
        self.result = None
    
    def default_preconditions(self) -> None:
        for b in range(self.balls):
            for i in range(len(self.times)):
                for j in range(i + 1, len(self.times)):
                    self.prob += pl.LpConstraint(self.X[b*len(self.times) + i] + self.X[b*len(self.times) + j] - 1 - R(self.times[i], self.times[j], h, throw_type), sense=pl.LpConstraintLE, name=f"X{b}{i} X{b}{j} <= 1 R{b}{i}{j}")

                    self.prob += pl.LpConstraint(self.Y[b*len(self.times)**2 + i*len(self.times) + j] - Q(self.times[i], self.times[j], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} <= Q{b}{i}{j}")

                    for k in range(j + 1, len(self.times)):
                        self.prob += pl.LpConstraint(self.X[b*len(self.times) + i] + self.Y[b*len(self.times)**2 + j*len(self.times) + k] - 1 - RR(self.times[i], self.times[j], self.times[k], h, throw_type), sense=pl.LpConstraintLE, name=f"X{b}{i} Y{b}{j}{k} <= 1 RR{b}{i}{j}{k}")

                        self.prob += pl.LpConstraint(self.Y[b*len(self.times)**2 + i*len(self.times) + j] + self.X[b*len(self.times) + k] - 1 - S(self.times[i], self.times[j], self.times[k], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} X{b}{k} <= 1 S{b}{i}{j}{k}")

                        for m in range(k + 1, len(self.times)):
                            self.prob += pl.LpConstraint(self.Y[b*len(self.times)**2 + i*len(self.times) + j] + self.Y[b*len(self.times)**2 + k*len(self.times) + m] - 1 - SS(self.times[i], self.times[j], self.times[k], self.times[m], h, throw_type), sense=pl.LpConstraintLE, name=f"Y{b}{i}{j} Y{b}{k}{m} <= 1 S{b}{i}{j}{k}{m}")

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
        pass
    
    def solve(self) -> int:
        if self.loop:
            self.loop_preconditions()
        else:
            self.default_preconditions()
        self.result = self.prob.solve()
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
        raise NotImplemented()