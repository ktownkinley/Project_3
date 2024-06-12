import statsmodels.api as sm

crime_counts = [12, 0, 39, 0, 0, 0, 0, 0, 0, 30, 0, 50, 27, 50, 117, 124, 225, 183, 192, 274, 254, 393, 433, 597, 446, 554, 445, 692, 493, 815, 471, 682, 788, 914, 530, 405, 595, 688, 765, 651, 923, 346, 364, 799, 941, 1026, 528, 680, 555, 830, 866, 636, 666, 432, 670, 769, 828, 773, 762, 821, 908, 930, 449, 456, 417, 503, 306, 323, 490, 452, 407, 510, 271, 283, 118, 151, 73, 60, 43, 29]

temperatures = [temp for temp in range(15,95)]


# Add intercept to the model
temp_constant = sm.add_constant(temperatures)

# Fit the Poisson regression model using sm.GLM
model = sm.GLM(crime_counts, temp_constant, family=sm.families.Poisson())
result = model.fit()


print(result.summary())

