import matplotlib.pyplot as plt
import numpy as np

font = {'size'   : 15}

plt.rc('font', **font)


def print_sol(sol, max, name):
    colors = ['-b', '-g', '-r', '-c', '-m', '-y', '-k', '-w']
    x_axis = [0]
    # plt.figure(figsize=(8, 6))
    for i in range(len(sol)):
        x = [0]
        y = [i+1]
        for d in sol[i]:
            ts, tf, ti = d[len(d) - 3:]
            x.append(ts)
            y.append(i+1)
            
            x.append(ti[0])
            x_axis.append(ti[0])
            y.append(0)

            if len(ti) > 1:
                plt.plot(x, y, colors[i])

                x1 = np.linspace(ti[0], ti[1], (i+1)*30)
                y1 = -8*(i+1)*(x1 - ti[0])*(x1 - ti[1])
                plt.plot(x1, y1, colors[i])

                x = [ti[1]]
                x_axis.append(ti[1])
                y = [0]
            
            x.append(tf)
            y.append(i+1)
        x.append(max)
        y.append(i+1)

        plt.plot(x, y, colors[i], label='Pelota %d' % (i+1))

    plt.title(name)
    plt.xlabel('Tiempo')
    plt.ylabel("Pelotas")
    plt.xlim(0,max)
    plt.ylim(0, len(sol) + 1)
    plt.xticks(x_axis, x_axis)
    plt.yticks(range(len(sol) + 1))
    plt.legend(loc='upper right')
    plt.show()



# # Regueton Reinaldo
# sol = [[[6.7047934749852764, 1, 2, 0, 4.403955520203333, 6.038243355952658, [4.57433107, 5.80498866]]], [[5.467519199250946, 1, 1, 0, 1.1858387357420896, 1.6994756189299156, [1.41641723]], [6.7047934749852764, 1, 2, 0, 2.4534793302033324, 4.087767165952657, [2.62385488, 3.85451247]]], [[5.467519199250946, 1, 1, 0, 2.6951357957420896, 3.2087726789299156, [2.92571429]], [5.467519199250946, 1, 1, 0, 4.0883330657420895, 4.6019699489299155, [4.31891156]], [5.467519199250946, 1, 1, 0, 5.0867911157420895, 5.6004279989299155, [5.31736961]]], [[6.451782395317778, 1, 2, 0, 0.3545821040398378, 1.9682665033031097, [0.53405896, 1.71827664]], [5.467519199250946, 1, 1, 0, 4.761711755742089, 5.275348638929915, [4.99229025]]], [[6.451782449799167, 1, 2, 0, 0.8189811961239685, 2.4326655993267146, [0.99845805, 2.18267574]], [5.467519199250946, 1, 1, 0, 3.1595348857420893, 3.6731717689299153, [3.39011338]]]]
# max = 7
# name = "Regueton Reinaldo"


# Rpij
sol = [[[0,0,0,0, 0.8, 1.2, [1]], [0,0,0,0, 1.8, 2.2, [2]]]]
max = 3
name = "Rpij"

# Gpijk
sol = [[[0,0,0,0, 0.8, 1.2, [1]], [0,0,0,0, 1.8, 3, [2, 2.8]]]]
max = 4
name = "Gpijk"

# Spijk
sol = [[[0,0,0,0, 0.8, 2, [1, 1.8]], [0,0,0,0, 2.8, 3.2, [3]]]]
max = 4
name = "Spijk"

# Fpijkm
# sol = [[[0,0,0,0, 0.8, 2, [1, 1.8]], [0,0,0,0, 2.8, 4, [3, 3.8]]]]
# max = 5
# name = "Fpijkm"

# Qpij
sol = [[[0,0,0,0, 0.8, 2, [1, 1.8]]]]
max = 3
name = "Qpij"

print_sol(sol, max, name)